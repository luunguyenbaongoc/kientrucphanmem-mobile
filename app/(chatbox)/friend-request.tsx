import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, IconButton } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useQuery } from 'react-query';
import { FriendResponse } from '@/types/api/response';
import { friendAPI } from '@/api/friend.api';
import { FriendRequestResponse } from '@/types/api/response/friend-request.response';

const Tab = createMaterialTopTabNavigator();

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

const FriendRequestListTab = () => {
  const [friendRequests, setFriendRequests] = React.useState<FriendRequestResponse[]>([]);
  const handleCallPress = (type: string) => {
    console.log(`Making ${type} call`);
  };

  useQuery(
    ['getFriendRequestsReceived'], 
    () => friendAPI.getFriendRequestsReceived(),
    {
      onSuccess: async (response) => {
        const friendRequests: FriendRequestResponse[] = response.data;
        setFriendRequests(friendRequests);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );

  return (
    <FlatList
      data={friendRequests}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <RenderItem name={item.from_user} userId={item.id} onCallPress={handleCallPress} />
          <Button>Đồng ý</Button>
        </View>
      )}
    />
  );
};

export default function FriendRequestScreen() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Đã nhận" component={FriendRequestListTab} />
        <Tab.Screen name="Đã gửi" component={FriendRequestListTab} />
      </Tab.Navigator>
  );
}

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
  }
});
