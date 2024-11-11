import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useAuth } from "@/contexts/AuthContext";

export { ErrorBoundary } from "expo-router";

export default function AuthLayout() {
  const { accessToken } = useAuth();
  console.log(accessToken)
  if (accessToken) {
    SplashScreen.hideAsync();
    return <Redirect href="/(tabs)" />;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen options={{ headerTitle: "Đăng nhập" }} name="login" />
      <Stack.Screen options={{ headerTitle: "Đăng ký" }} name="register" />
      <Stack.Screen
        options={{ headerTitle: "Quên mật khẩu" }}
        name="forgot-password"
      />
      <Stack.Screen
        options={{ headerTitle: "Xác nhận OTP" }}
        name="submit-otp"
      />
      <Stack.Screen
        options={{ headerTitle: "Nhập mật khẩu mới" }}
        name="reset-password"
      />
    </Stack>
  );
}
