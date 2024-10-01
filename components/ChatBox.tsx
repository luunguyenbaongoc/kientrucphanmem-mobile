import React, { useState, useCallback } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

export default function Chatbox() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Set initial message
  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
          avatar: 'https://placeimg.com/140/140/any', // Placeholder avatar
        },
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
        _id: 1, // Current user id
      }}
      placeholder="Type a message..."
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
