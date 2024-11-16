import { Stack } from "expo-router";
import "react-native-reanimated";

export {
  ErrorBoundary,
} from "expo-router";

export default function DetailMessageLayout() {
  return (
    <Stack>
      <Stack.Screen options={{headerTitle: 'Hội thoại'}} name="index" />
      <Stack.Screen options={{headerTitle: 'Nhóm chat'}} name="group-chatbox" />
      <Stack.Screen options={{headerTitle: 'Tạo nhóm'}} name="create-group" />
      <Stack.Screen options={{headerTitle: 'Thêm bạn'}} name="add-friend" />
      <Stack.Screen options={{headerTitle: 'Lời mời kết bạn'}} name="friend-request" />
      <Stack.Screen options={{headerShown: false }} name="group-setting" />
    </Stack>
  );
}
