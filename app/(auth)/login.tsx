import React from "react";
import { Link } from "expo-router";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";

export default function LoginScreen() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log("Login with phone: ", phone, " and password: ", password);
    // Replace with actual login logic when ready
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
          autoFocus
          mode="outlined"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          mode="outlined"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          style={{ backgroundColor: "#0190f3" }}
          mode="contained"
          onPress={handleLogin}
        >
          Đăng nhập
        </Button>
        <Link
          href="/register"
          style={{
            color: "black",
          }}
        >
          Đăng ký mới
        </Link>
        <Link
          href="/forgot-password"
          style={{
            color: "black",
          }}
        >
          Quên mật khẩu?
        </Link>
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
