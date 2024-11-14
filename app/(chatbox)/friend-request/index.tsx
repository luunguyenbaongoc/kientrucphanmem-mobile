import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import { router } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { friendAPI } from "@/api/friend.api";
import { FriendRequestResponse } from "@/types/api/response/friend-request.response";
import { useToast } from "react-native-paper-toast";

const RenderItem = ({ userId, name, item, onCallPress }: ItemInfo) => {
  const toaster = useToast();
  const queryClient = useQueryClient();
  const declineRequest = useMutation(friendAPI.declineRequest, {
    onSuccess: (response) => {
      if (response.data) {
        toaster.show({
          message: "Thao tác thành công",
          duration: 2000,
          type: "success",
        });
        queryClient.invalidateQueries(["getFriendRequestsReceived"]);
      }
    },
    onError: (error: any) => {
      toaster.show({
        message: error.response.data.message,
        duration: 2000,
        type: "error",
      });
      queryClient.invalidateQueries(["getFriendRequestsReceived"]);
    },
  });
  const acceptRequest = useMutation(friendAPI.acceptRequest, {
    onSuccess: (response) => {
      if (response.data) {
        toaster.show({
          message: "Thao tác thành công",
          duration: 2000,
          type: "success",
        });
        queryClient.invalidateQueries(["getFriendRequestsReceived"]);
      }
    },
    onError: (error: any) => {
      toaster.show({
        message: error.response.data.message,
        duration: 2000,
        type: "error",
      });
      queryClient.invalidateQueries(["getFriendRequestsReceived"]);
    },
  });

  const handleDeclineRequest = () => {
    declineRequest.mutate(item.id);
  };
  
  const handleAcceptRequest =() => {
    acceptRequest.mutate(item.id);
  }

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        // onPress={() => {
        //   router.push({
        //     pathname: "/(chatbox)",
        //     params: { userId, name },
        //   });
        // }}
      >
        <Image
          source={{
            uri: `data:image/png;base64, ${item?.from_user_profile?.profile[0]?.avatar}`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.itemText}>{name}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleAcceptRequest}>
          <IconButton
            icon="check"
            size={20}
            iconColor="blue"
            onPress={handleAcceptRequest}
          />
        </TouchableOpacity>
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

const FriendRequestReceived = () => {
  const handleCallPress = (type: string) => {
    console.log(`Making ${type} call`);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getFriendRequestsReceived"],
    queryFn: () => friendAPI.getFriendRequestsReceived(),
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
                name={item?.from_user_profile?.profile[0]?.fullname}
                userId={item.id}
                onCallPress={handleCallPress}
              />
              {/* <Button>Đồng ý</Button> */}
            </View>
          )}
        />
      )}
    </>
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
});

export default FriendRequestReceived;
