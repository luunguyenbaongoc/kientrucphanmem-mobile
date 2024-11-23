import { Chatbox } from '@/components/ChatBox';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const GroupChatBoxScreen = () => {
  const { groupName, groupId } = useLocalSearchParams();
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>{groupName}</Text>
      <View style={styles.phoneCall}>
        <IconButton
          icon="phone"
          size={30}
          iconColor="blue"
          onPress={() => {}}
        />
        <IconButton
          icon="video"
          size={30}
          iconColor="blue"
          onPress={() => {}}
        />
        <IconButton
          icon="cog"
          size={30}
          iconColor="blue"
          onPress={() => {
            router.push({
              pathname: '/group-setting',
              params: { groupName, groupId }
            })
          }}
        />
      </View>
      <SafeAreaView style={styles.detailContainer}>
        <Chatbox />
      </SafeAreaView>
    </View>
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
