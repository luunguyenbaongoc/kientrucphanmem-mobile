import { friendAPI } from "@/api/friend.api";
import { useCheckUserExist } from "@/hooks/useCheckUserExist";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useToast } from "react-native-paper-toast";
import { useMutation } from "react-query";

const AddFriendScreen = () => {
  const toaster = useToast();
  const [phone, setPhone] = useState("");
  const [found, setFound] = useState<boolean>(false);

  const sendFriendRequest = useMutation(friendAPI.sendFriendRequest, {
    onSuccess: (response) => {
      const { created_date } = response.data;
      toaster.show({
        message: `Đã gửi yêu cầu kết bạn đến người dùng ${phone} thành công lúc ${created_date}`,
        duration: 2000,
        type: "success",
      });
    },
    onError: (error: any) => {
      toaster.show({
        message: error.message,
        duration: 2000,
        type: "error",
      });
    },
  });

  const handleChangePhone = (phone: string) => {
    const { data } = useCheckUserExist(phone);
    if (data?.data) {
      setFound(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm bạn</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={handleChangePhone}
      />
      <Button
        title="Thêm bạn"
        onPress={() => {
          sendFriendRequest.mutate({ to_user_phone: phone });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  privacyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 16,
  },
});

export default AddFriendScreen;
