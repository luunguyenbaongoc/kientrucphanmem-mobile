import { ChatBox } from '@/components/ChatBox';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const GroupChatBoxScreen = () => {
  const { groupName, groupId } = useLocalSearchParams();
  return (
    <ChatBox />
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  phoneCall: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  detailChatBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  detailText: {
    fontSize: 22,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default GroupChatBoxScreen;
