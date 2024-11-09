import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useQuery } from 'react-query';
import { FriendResponse } from '@/types/api/response';
import { friendAPI } from '@/api/friend.api';


const RenderItem = ({ userId, name, onCallPress }: ItemInfo) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.iconContainer} onPress={() => {
        router.push({
          pathname: "/(chatbox)",
          params: { userId, name},
        });
      }}>
      <Image source={{ uri: "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg" }} style={styles.avatar} />
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => onCallPress('audio')}>
        <IconButton
          icon="phone"
          size={20}
          iconColor="blue"
          onPress={() => {}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onCallPress('video')}>
        <IconButton
          icon="video"
          size={20}
          iconColor="blue"
          onPress={() => {}}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const FriendListScreen = () => {
  const [friends, setFriends] = React.useState<FriendResponse[]>([]);
  const handleCallPress = (type: string) => {
    console.log(`Making ${type} call`);
  };

  useQuery(
    ['getFriends'], 
    () => friendAPI.getFriends(),
    {
      onSuccess: async (response) => {
        const currentFriends: FriendResponse[] = response.data;
        setFriends(currentFriends);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );

  return (
    <View>
      <Link
        href="/(chatbox)/friend-request/"
        style={styles.link}
      >
        Lời mời kết bạn
      </Link>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderItem name={item.to_user} userId={item.id} onCallPress={handleCallPress} />
        )}
      />
    </View>
  );
};

interface ItemInfo {
  userId: string;
  name: string;
  onCallPress: (name: string) => void;
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 5,
  },
  link: {
    padding: 10,
    justifyContent: 'center',
    color: 'black'
  }
});

export default FriendListScreen;