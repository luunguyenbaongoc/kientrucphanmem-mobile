import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ChatBoxProps {
  onSetting?: () => void;
};

export const ChatBox = ({ onSetting }: ChatBoxProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onSend = useCallback((newMessages: any = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const newMessage = {
        _id: Date.now(),
        text: '',
        createdAt: new Date(),
        user: { _id: 1, name: 'Bạn' },
        image: imageUri,
      };
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
    }
  };

  const attachFile = async () => {
    alert('Attach file clicked!'); // File picker logic here
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hội thoại</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="video-call" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="phone" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => {
              if (onSetting) onSetting();
            }}>
            <Icon name="settings" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        renderActions={() => (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Icon name="emoji-emotions" size={28} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <Icon name="image" size={28} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={attachFile}>
              <Icon name="attach-file" size={28} color="#888" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Emoji Picker */}
      {/* {showEmojiPicker && (
        <View style={styles.emojiPickerContainer}>
          <EmojiPicker
            onEmojiSelected={(emoji) => {
              const textMessage = {
                _id: Date.now(),
                text: emoji,
                createdAt: new Date(),
                user: { _id: 1 },
              };
              setMessages((prevMessages) => GiftedChat.append(prevMessages, [textMessage]));
              setShowEmojiPicker(false);
            }}
            onClose={() => setShowEmojiPicker(false)}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    padding: 10,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#7e3ff2',
    borderRadius: 50,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  actionButton: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
  },
  emojiPickerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
});
