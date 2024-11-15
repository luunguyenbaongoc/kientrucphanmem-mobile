import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ActivityIndicator, IconButton, Searchbar } from "react-native-paper";
import { Link, router } from "expo-router";
import { useQuery } from "react-query";
import { friendAPI } from "@/api/friend.api";

const RenderItem = ({ userId, name, item, onCallPress }: ItemInfo) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          router.push({
            pathname: "/(chatbox)",
            params: { userId, name },
          });
        }}
      >
        <Image
          source={{
            uri: item?.to_user_profile?.profile[0]?.avatar?.startsWith("http") ? 
              item?.to_user_profile?.profile[0]?.avatar : 
              `data:image/png;base64, ${item?.to_user_profile?.profile[0]?.avatar}`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.itemText}>{name}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => onCallPress("audio")}>
          <IconButton
            icon="phone"
            size={20}
            iconColor="blue"
            onPress={() => {}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onCallPress("video")}>
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
};

const FriendListScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleCallPress = (type: string) => {
    console.log(`Making ${type} call`);
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["findFriendsByText", searchQuery],
    queryFn: () => friendAPI.findByText({ text: searchQuery }),
    enabled: true,
    select: (rs) => {
      return rs.data;
    },
  });

  const handleSearchFriend = (text: string) => {
    setSearchQuery(text);
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolContainer}>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={handleSearchFriend}
          value={searchQuery}
          // style={styles.searchBar}
        />
      </View>
      <Link href="/(chatbox)/friend-request/" style={styles.link}>
        Lời mời kết bạn
      </Link>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              name={item.to_user_profile.profile[0].fullname}
              userId={item.id}
              onCallPress={handleCallPress}
            />
          )}
        />
      )}
    </View>
  );
};

interface ItemInfo {
  userId: string;
  name: string;
  item?: any;
  onCallPress: (name: string) => void;
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    color: "black",
  },
  toolContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  container: {
    // paddingTop: 20
  },
});

export default FriendListScreen;
