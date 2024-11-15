import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { friendAPI } from "@/api/friend.api";
import { useToast } from "react-native-paper-toast";

const RenderItem = ({ name, item }: ItemInfo) => {
  const avatar: string = item?.to_user_profile?.profile[0]?.avatar;
  const toaster = useToast();
  const declineRequest = useMutation(friendAPI.declineRequest, {
    onSuccess: (response) => {
      if (response.data) {
        toaster.show({
          message: "Thao tác thành công",
          duration: 2000,
          type: "success",
        });
        queryClient.invalidateQueries(["getFriendRequestsSent"]);
      }
    },
    onError: (error: any) => {
      toaster.show({
        message: error.response.data.message,
        duration: 2000,
        type: "error",
      });
    },
  });
  const queryClient = useQueryClient();

  const handleDeclineRequest = () => {
    declineRequest.mutate(item.id);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.iconContainer}>
        <Image
          source={{
            uri: avatar?.startsWith("http") ? avatar : `data:image/png;base64, ${avatar}`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.itemText}>{name}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleDeclineRequest}>
          <IconButton
            icon="delete"
            size={20}
            iconColor="red"
            onPress={handleDeclineRequest}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FriendRequestSent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getFriendRequestsSent"],
    queryFn: () => friendAPI.getFriendRequestsSent(),
    select: (rs) => {
      return rs.data;
    },
  });

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <RenderItem
                item={item}
                name={item?.to_user_profile?.profile[0]?.fullname}
              />
            </View>
          )}
        />
      )}
    </>
  );
};

interface ItemInfo {
  name: string;
  item?: any;
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
});

export default FriendRequestSent;
