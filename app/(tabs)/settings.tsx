import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQuery } from "react-query";
import { authAPI } from "@/api";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "@/utils/constants";
import { LogOutDto } from "@/types/api/dto";
import { userAPI } from "@/api/user.api";
import { ProfileResponse } from "@/types/api/response/profile.response";
import { useAuth } from "@/contexts/AuthContext";

const SettingsScreen = () => {
  const { setAccessToken, setUserId } = useAuth();
  const [profileInfo, setProfileInfo] = React.useState<ProfileResponse>({
    fullname: "",
    avatar: undefined,
    id: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      const { fileName, uri } = result.assets[0] as {
        fileName: string;
        uri: string;
      };
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append("file", blob, fileName);
      uploadAvatar.mutate({ profileId: profileInfo.id, formData: formData });
    }
  };

  const saveSettings = () => {
    updateProfile.mutate({
      profileId: profileInfo.id,
      fullname: profileInfo.fullname,
    });
  };

  useQuery(["getMyProfile", profileInfo.id], () => userAPI.getMyProfile(), {
    onSuccess: async (response) => {
      const profiles: ProfileResponse[] = response.data;
      setProfileInfo({ ...profileInfo, ...profiles[0] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const uploadAvatar = useMutation(userAPI.uploadAvatar, {
    onSuccess: async (response) => {
      const profile: ProfileResponse = response.data;
      setProfileInfo({ ...profileInfo, ...profile });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const updateProfile = useMutation(userAPI.updateProfile, {
    onSuccess: async (response) => {
      const profile: ProfileResponse = response.data;
      setProfileInfo({ ...profileInfo, ...profile });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const logout = useMutation(authAPI.logout, {
    onSuccess: async (response) => {
      const succsess: boolean = response.data;
      if (succsess) {
        await AsyncStorage.clear();
        setAccessToken('');
        setUserId('');
        router.navigate("../(auth)");
      }
    },
    onError: (error: any) => {
      router.navigate("./");
    },
  });

  const handleLogout = async () => {
    const userId: string | null = await AsyncStorage.getItem(STORAGE_KEY.ID);
    const refresh_token: string | null = await AsyncStorage.getItem(
      STORAGE_KEY.REFRESH_TOKEN
    );
    if (userId && refresh_token) {
      logout.mutate({ userId, refresh_token } as unknown as LogOutDto);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cài đặt</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            profileInfo.avatar
              ? {
                  uri: `data:image/png;base64, ${profileInfo.avatar}`,
                }
              : require("../../assets/images/icon.png")
          }
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Thay đổi ảnh đại diện</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          value={profileInfo.fullname}
          onChangeText={(value: string) =>
            setProfileInfo({ ...profileInfo, fullname: value })
          }
          style={styles.input}
        />
      </View>

      <Button
        style={{ backgroundColor: "#0190f3" }}
        mode="contained"
        onPress={saveSettings}
      >
        Lưu
      </Button>
      <Button
        style={{ backgroundColor: "#0190f3", marginTop: 10 }}
        mode="contained"
        onPress={handleLogout}
      >
        Đăng xuất
      </Button>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  changePhotoText: {
    textAlign: "center",
    color: "blue",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});
