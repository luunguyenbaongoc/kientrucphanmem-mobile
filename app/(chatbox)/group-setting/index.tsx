import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GROUP_SETTING_ITEMS } from "@/utils/constants/GroupSettingRoutes";
import { IconButton } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";


const RenderItem = ({ groupId, groupName, item }: ItemInfo) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => {
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
      <Text style={{ ...styles.itemText, color: item.textColor}}>{item.action}</Text>
    </TouchableOpacity>
  </View>
);

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
    icon?: any;
    action: string;
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
