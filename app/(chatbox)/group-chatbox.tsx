import ChatBoxComponent from "@/components/ChatBox";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";

const GroupChatBoxScreen = () => {
  const { groupName, groupId } = useLocalSearchParams<{
    groupName: string;
    groupId: string;
  }>();
  return (
    <ChatBoxComponent
      name={groupName}
      onSetting={() => {
        router.push({
          pathname: "/group-setting",
          params: { groupName, groupId },
        });
      }}
    />
  );
};

export default GroupChatBoxScreen;
