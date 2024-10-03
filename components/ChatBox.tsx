import React, { useState, useCallback } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

export function Chatbox() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hãy gửi lời chào tới bạn bè!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Quản trị viên',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
    ]);
  }, []);

  // Handle sending messages
  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 2
      }}
      placeholder="Type a message..."
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
