import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from '@/hooks/useColorScheme';

export {
  ErrorBoundary,
} from "expo-router";

export default function DetailMessageLayout() {
  return (
    <Stack>
      <Stack.Screen options={{headerTitle: 'Hội thoại'}} name="index" />
      <Stack.Screen options={{headerTitle: 'Nhóm chat'}} name="group-chatbox" />
      <Stack.Screen options={{headerTitle: 'Tạo nhóm'}} name="create-group" />
    </Stack>
  );
}
