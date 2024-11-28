// import * as DocumentPicker from 'expo-document-picker';
import { useChat } from "@/contexts/ChatContext";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmojiSelector from "react-native-emoji-selector";
import { Bubble, GiftedChat, IMessage } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "react-query";
import { chatAPI } from "@/api/chat.api";

interface ChatBoxProps {
  name?: string;
  chatboxId?: string;
  onSetting?: () => void;
}

const ChatBoxComponent = ({ name, onSetting }: ChatBoxProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { chatProfile, chatboxId, toUserId, toGroupId } = useChat();
  const { userId } = useAuth();

  // const onSend = useCallback((newMessages: any = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, newMessages)
  //   );
  // }, []);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["ChatDetail", toUserId, toGroupId, chatboxId],
    queryFn: () =>
      chatAPI.chatDetail({
        chat_box_id: chatboxId,
        to_group: toGroupId,
        to_user: toUserId,
      }),
    select: (rs) => {
      return rs.data;
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
    // return () => {
    //   iMessages = [];
    // }
  }, []);

  const iMessages = useMemo(() => {
    if (data) {
      const iMessages: IMessage[] = [];
      for (let i = data.length - 1; i >= 0; i--) {
        const item = data[i];
        const iMessage: IMessage = {
          _id: item.id,
          text: item.chat_log.content,
          createdAt: item.chat_log.created_date,
          user: {
            _id: item.chat_log.owner_id,
          },
        };
        iMessages.push(iMessage);
      }
      return iMessages;
    }
  }, [data]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
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
        text: "",
        createdAt: new Date(),
        user: { _id: 1, name: "Bạn" },
        image: imageUri,
      };
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [newMessage])
      );
    }
  };

  const attachFile = async () => {
    try {
      // const result: any = await DocumentPicker.getDocumentAsync({
      //   type: '*/*', // You can specify MIME types like "image/*", "application/pdf", etc.
      // });
      // if (result.type === 'success') {
      //   console.log('Selected File:', result);
      // } else {
      //   console.log('User canceled file picker');
      // }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleTextEmoji = (emoji: string) => {
    const textMessage = {
      _id: Date.now(),
      text: emoji,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, [textMessage])
    );
    setShowEmojiPicker(false);
  };

  const handleInputText = (text: string) => {
    setInputMessage(text);
  };

  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === userId) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#8bbbf7",
                marginRight: 12,
                marginVertical: 12,
              },
            }}
            textStyle={{
              right: {
                color: "black",
              },
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                marginLeft: 12,
                marginVertical: 12,
              },
            }}
            textStyle={{
              left: {
                color: "black",
              },
            }}
          />
        </View>
      );
    }
  };

  const submitHandler = () => {
    //TODO: call api to send message
    // const message = {
    //   _id: Math.random().toString(36).toString(7),
    //   text: inputMessage,
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: userId,
    //   },
    // };
    // setMessages((previousMessage) =>
    //   GiftedChat.append(previousMessage, [message])
    // );
    // setInputMessage("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: "#fff",
          borderBottomColor: "gray",
          borderBottomWidth: 0.2,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={{ marginRight: 18 }}
          >
            <FontAwesome name="arrow-left" size={22} color={"gray"} />
          </TouchableOpacity>
          <View>
            <Image
              source={{
                uri: `data:image/png;base64, ${chatProfile.avatar}`,
              }}
              style={styles.avatar}
            />
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.headerText}>{name}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              if (onSetting) onSetting();
            }}
          >
            <Icon name="settings" size={24} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        messages={iMessages}
        renderInputToolbar={() => {
          return null;
        }}
        user={{ _id: userId }}
        minInputToolbarHeight={0}
        renderMessage={(props) => renderMessage(props)}
      ></GiftedChat>

      <View style={styles.inputContainer}>
        <View style={styles.inputMessageContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn"
            placeholderTextColor="black"
            value={inputMessage}
            onChangeText={handleInputText}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={submitHandler} style={styles.sendButton}>
              <FontAwesome name="send" size={22} color={"gray"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5,
  },
  backButton: {
    height: 24,
    width: 24,
    tintColor: "black",
  },
  avatar: {
    height: 49,
    width: 49,
    borderRadius: 999,
  },
  headerText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  actionButton: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 2,
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  inputMessageContainer: {
    height: 54,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    borderColor: "rgba(128,128,128,.4)",
    borderWidth: 1,
  },
  input: {
    color: "black",
    flex: 1,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 999,
    marginHorizontal: 6,
  },
});

export default memo(ChatBoxComponent);
