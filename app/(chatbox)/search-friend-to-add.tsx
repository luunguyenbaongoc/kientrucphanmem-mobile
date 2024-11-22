import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Chip } from "react-native-paper";

const friendsList = [
  { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Bob Brown", avatar: "https://i.pravatar.cc/150?img=4" },
];

interface Friend {
  id: number;
  name: string;
  avatar: string;
}

const EditableComboBox = () => {
  const [query, setQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

  const handleSelectFriend = (friend: Friend) => {
    if (!selectedFriends.find((f) => f.id === friend.id)) {
      setSelectedFriends([...selectedFriends, friend]);
    }
    setQuery(""); // Clear query after selection
  };

  const handleRemoveFriend = (id: number) => {
    setSelectedFriends(selectedFriends.filter((friend: Friend) => friend.id !== id));
  };

  const filteredFriends = friendsList.filter((friend: Friend) =>
    friend.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Selected Friends */}
      <View style={styles.selectedFriendsContainer}>
        {selectedFriends.map((friend: Friend) => (
          <Chip
            key={friend.id}
            onClose={() => handleRemoveFriend(friend.id)}
            style={styles.chip}
          >
            {friend.name}
          </Chip>
        ))}
      </View>

      {/* Searchable Dropdown */}
      <TextInput
        style={styles.input}
        placeholder="Search for a friend"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      {query.length > 0 && (
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleSelectFriend(item)}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdownList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  selectedFriendsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  chip: {
    margin: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  dropdownList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
  },
});

export default EditableComboBox;
