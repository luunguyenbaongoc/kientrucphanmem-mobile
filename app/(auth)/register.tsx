import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Image, GestureResponderEvent } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { RegisterDto } from "@/types/api/dto";
import { useMutation, useQuery } from "react-query";
import { authAPI } from "@/api";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

export default function RegisterScreen() {

  const [registerInfo, setRegisterInfo] = useState({
    phone: "",
    password: "",
    fullname: "",
  } as RegisterDto);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorText, setErrorText] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  useQuery(
    ['checkUserExist', registerInfo.phone], 
    () => authAPI.checkUserExist(registerInfo.phone), 
    {
      enabled: registerInfo.phone.length > 0,
      onSuccess: async (response) => {
        const exist: boolean = response.data;
        if (exist) {
          setErrorText("Số điện thoại đã tồn tại!");
          setErrorVisible(true);
        }
        else {
          setErrorText("");
          setErrorVisible(false);
        }
      },
      onError: (error: any) => {
        setErrorText(error.message);
      },
    },
  );

  const register = useMutation(authAPI.register, {
    onSuccess: async (response) => {
      const { is_success } = response.data;
      if (is_success) {
        router.navigate("./login");
      }
    },
    onError: (error: any) => {
      setErrorText(error.response.data.message);
      router.navigate("./register");
    },
  });

  const handleRegister = (event: GestureResponderEvent) => {
    event.preventDefault();
    if (!errorVisible) {
      register.mutate(registerInfo);
    }
  };

  const checkIdenticalConfirmedPass = (password: string) => {
    setConfirmPassword(password);
    if (password !== registerInfo.password) {
      setErrorText("Mật khẩu không trùng khớp!");
      setErrorVisible(true);
    }
    else {
      setErrorText("");
      setErrorVisible(false);
    }
  };

  const onFormChangeHandler = (key: string, value: string) => {
    setRegisterInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePhone = (value: string) => {
    const onlyNums = value.replace(/[^0-9]/g, "");
    if (onlyNums.length <= 10) {
      setRegisterInfo((prev) => ({ ...prev, phone: onlyNums }));
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <TextInput
          mode="outlined"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          value={registerInfo.phone}
          autoFocus
          onChangeText={handleChangePhone}
        />
        <TextInput
          mode="outlined"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          value={registerInfo.password}
          onChangeText={(value) => onFormChangeHandler("password", value)}
        />
        <TextInput
          mode="outlined"
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={checkIdenticalConfirmedPass}
        />
        <TextInput
          mode="outlined"
          label="Họ và tên"
          placeholder="Nhập họ tên"
          value={registerInfo.fullname}
          onChangeText={(value) => onFormChangeHandler("fullname", value)}
        />
        {
          errorVisible && <ThemedText type='error'>{errorText}</ThemedText>
        }
        <Button
          style={{ backgroundColor: "#0190f3" }}
          mode="contained"
          onPress={handleRegister}
        >
          Đăng ký
        </Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
