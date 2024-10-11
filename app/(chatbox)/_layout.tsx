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
      <Stack.Screen options={{headerTitle: 'Nội dung'}} name="index" />
    </Stack>
  );
}
