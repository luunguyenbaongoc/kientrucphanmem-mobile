import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { IconButton, MD3Colors } from 'react-native-paper';
import { Chatbox } from '@/components/ChatBox';

const GroupChatBoxScreen = () => {
  const { groupName } = useLocalSearchParams();

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
