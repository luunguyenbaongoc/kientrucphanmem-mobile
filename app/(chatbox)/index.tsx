import { Chatbox } from '@/components/ChatBox';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const UserChatBoxScreen = () => {
  const { userId, name } = useLocalSearchParams();
  const [avatar, setAvatar] = React.useState('');

  useEffect(() => {
    // Fetch user avatar from server based on userId
    // const avatar = await fetchUserAvatar(userId);
    // Set avatar in state or props
    const url = "https://avatar.iran.liara.run/public/boy?username=Ash"
    setAvatar(url);
  })

  return (
    <View style={styles.detailContainer}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.detailText}>{name}</Text>
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

export default UserChatBoxScreen;
