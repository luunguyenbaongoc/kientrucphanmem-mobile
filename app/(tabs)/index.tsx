import { DropDownMenu } from '@/components/Menu';
import { router, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const data = [
  { id: '1', name: 'John Doe', avatar: 'https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg' },
  { id: '2', name: 'Jane Smith', avatar: 'https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg' },
  { id: '3', name: 'Alice Johnson', avatar: 'https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg' },
];

const TOOL_MENU_ITEMS = [
  { 
    title: 'Tạo nhóm', 
    onPress: () => {
      router.navigate('/(chatbox)/create-group');
    }
  },
  { 
    title: 'Thêm bạn', 
    onPress: () => {
      router.navigate('/(chatbox)/add-friend');
    }
  },
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
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchFriend = (text: string) => {
    // TODO: Implement search logic
    console.log('Search:', text);
    // Replace with actual search logic when ready
    setSearchQuery(text);
  };

  useEffect(() => {
    // Add any cleanup logic here, such as subscriptions or timers
    // Request getting friend list -> data.
  })

  return (
    <View>
      <View style={styles.toolContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchFriend}
          value={searchQuery}
          style={styles.searchBar}
        />
        <DropDownMenu items={TOOL_MENU_ITEMS}/>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            avatar={item.avatar}
            onPress={() => {
              router.push({
                pathname: "/(chatbox)",
                params: { userId: item.id, name: item.name },
              });
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    marginRight: 10,
  },
  toolContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
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
