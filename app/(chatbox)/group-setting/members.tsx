import { groupMemberAPI } from "@/api";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import { useMutation, useQuery } from "react-query";

const RenderItem = ({ item, onRemoveUser }: any) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          router.push({
            pathname: "/(chatbox)",
            params: { userId: item.user_id, name: item.user.profile[0].fullname },
          });
        }}
      >
        <Image
          source={
            item.user.profile[0].avatar
              ? `data:image/png;base64, ${item.user.profile[0].avatar}`: item.user.profile[0].avatar
            }
          style={styles.avatar}
        />
        <Text style={styles.itemText}>{item.user.profile[0].fullname}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => null }>
          <IconButton
            icon="phone"
            size={20}
            iconColor="blue"
            onPress={() => {}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null }>
          <IconButton
            icon="video"
            size={20}
            iconColor="blue"
            onPress={() => {}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null }>
          <IconButton
            icon="delete"
            size={20}
            iconColor="red"
            onPress={() => {
              onRemoveUser(item.user_id);
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MembersScreen = () => {
  const toaster = useToast();
  const { groupId } = useLocalSearchParams() as { groupId: string };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["getGroupMembers", groupId],
    queryFn: () => groupMemberAPI.getGroupMembers(groupId),
    enabled: true,
    select: (rs) => {
      return rs.data.users;
    },
  });

  const removeGroupMember = useMutation(groupMemberAPI.removeGroupMember, {
    onSuccess: (response) => {
      const success: boolean = response.data;
      if (success) {
        toaster.show({
          message: 'Xoá thành viên thành công',
          duration: 2000,
          type: "success",
        });
        refetch();
      }
    },
    onError: (error: any) => {
      toaster.show({
        message: error.message,
        duration: 2000,
        type: "error",
      });
    },
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              onRemoveUser={(userId: string) => {
                removeGroupMember.mutate({ user_ids: [ userId ], group_id: groupId });
              }}
            />
          )}
        />
      )}
    </View>
  );
};

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

export default MembersScreen;
