import { groupMemberAPI } from "@/api";
import { GROUP_SETTING_ITEMS } from "@/utils/constants/group-setting-routes";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import { useMutation, useQueryClient } from "react-query";

const RenderItem = ({ groupId, groupName, item }: ItemInfo) => {
  const toaster = useToast();
  const queryClient = useQueryClient();
  const leaveGroup = useMutation(groupMemberAPI.leaveGroup, {
    onSuccess: (response) => {
      if (response.data) {
        toaster.show({
          message: "Thao tác thành công",
          duration: 1000,
          type: "success",
        });
        queryClient.invalidateQueries(['getGroupsByUser']);
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
  const GROUP_SETTING_ITEM_API_MAP = new Map<string, any> ([
    ['leave-group', leaveGroup]
  ]);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          const action = GROUP_SETTING_ITEM_API_MAP.get(item.id);
          debugger;
          if (action) {
            action.mutate(groupId);
          }
          router.push({
            pathname: item.route,
            params: { groupName, groupId },
          });
        }}>
        <IconButton
          icon={item.icon}
          size={30}
          iconColor="gray"
        />
        <Text style={{ ...styles.itemText, color: item.textColor}}>{item.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const GroupSettingScreen = () => {
  const { groupName, groupId } = useLocalSearchParams() as { groupName: string, groupId: string };
  return (
    <View 
      style={styles.container}>
      <FlatList
          data={GROUP_SETTING_ITEMS}
          renderItem={({ item }: { item: any }) => (
            <RenderItem
              groupId={groupId}
              groupName={groupName}
              item={item}
            />
          )}
        />
    </View>);
}

interface ItemInfo {
  groupId: string;
  groupName: string;
  item: {
    id: any,
    icon?: any;
    text: string;
    route: any;
    textColor?: string;
  }
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
  container: {},
  toolContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default GroupSettingScreen;
