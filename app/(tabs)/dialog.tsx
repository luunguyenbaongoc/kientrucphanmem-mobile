import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Chatbox from '@/components/ChatBox'; // Adjust the import path to your setup

const DialogSreen = () => {
  const { userId, name } = useLocalSearchParams();

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>User ID: {userId}</Text>
      <Text style={styles.detailText}>Name: {name}</Text>
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
});

export default DialogSreen;
