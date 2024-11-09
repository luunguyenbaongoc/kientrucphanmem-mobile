import { authAPI } from '@/api';
import { friendAPI } from '@/api/friend.api';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet 
} from 'react-native';
import { useMutation, useQuery } from 'react-query';

const AddFriendScreen = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const sendFriendRequest = useMutation(friendAPI.sendFriendRequest, {
    onSuccess: (response) => {
      const { created_date } = response.data;
      setMessage(`Đã gửi yêu cầu kết bạn đến người dùng ${phone} thành công lúc ${created_date}`);
    },
    onError: (error) => {
      setMessage("Gửi yêu cầu kết bạn thất bại!")
    },
  });

  useQuery(
    ['checkUserExist', phone], 
    () => authAPI.checkUserExist(phone), 
    {
      enabled: phone.length > 0,
      onSuccess: async (response) => {
        const exist: boolean = response.data;
        if (!exist) {
          setMessage("Số điện thoại không tồn tại!");
        }
        else {
          setMessage("");
        }
      },
      onError: (error: any) => {
        setMessage(error.message);
      },
    },
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm bạn</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Thêm bạn" onPress={() => {
        sendFriendRequest.mutate({ to_user_phone: phone });
      }} />
      <ThemedText type='default' style={{ color: "black" }}>{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 16,
  },
});

export default AddFriendScreen;
