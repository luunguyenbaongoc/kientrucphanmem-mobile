import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const data = [
  { id: '1', name: 'John Doe', avatar: 'https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg' },
  { id: '2', name: 'Jane Smith', avatar: 'https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg' },
  { id: '3', name: 'Alice Johnson', avatar: 'https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg' },
];

interface ListItemProps {
  name: string;
  avatar: string;
  onPress: () => void;
};

const ListItem = ({ name, avatar, onPress }: ListItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.itemContainer}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  </TouchableOpacity>
);

const FriendListSreen = () => {
  const router = useRouter();

  useEffect(() => {
    // Add any cleanup logic here, such as subscriptions or timers
    // Request getting friend list -> data.
  })

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListItem
          name={item.name}
          avatar={item.avatar}
          onPress={() => {
            router.push({
              pathname: "./dialog",
              params: { userId: item.id, name: item.name },
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 22,
  },
});

export default FriendListSreen;
