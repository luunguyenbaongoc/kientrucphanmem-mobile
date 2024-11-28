import { ChatBox } from '@/components/ChatBox';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

const GroupChatBoxScreen = () => {
  const { groupName, groupId } = useLocalSearchParams();
  return (
    <ChatBox
      onSetting={() => {
        router.push({
          pathname: '/group-setting',
          params: { groupName, groupId }
        })
      }}
    />
  );
};

export default GroupChatBoxScreen;
