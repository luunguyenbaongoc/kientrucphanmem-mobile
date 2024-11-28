import { SimpleMenu } from '@/components/Menu';
import React from 'react';
import { 
  FlatList, 
  Image, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { router } from 'expo-router';
import { MESSAGE_MENU_ITEMS } from '@/utils/constants/message-menu-items';

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
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchMessage = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View>
      <View style={styles.barContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchMessage}
          value={searchQuery}
          style={styles.searchBar}
        />
        <SimpleMenu items={MESSAGE_MENU_ITEMS}/>
      </View>
      <FlatList
        scrollEnabled={true}
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
  barContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 12,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
