import * as React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQuery } from 'react-query';
import { authAPI } from '@/api';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/utils/constants';
import { LogOutDto } from '@/types/api/dto';

const SettingsScreen = () => {
  const [profileInfo, setProfileInfo] = React.useState({ name: "", phone: "", profileImage: "" });

  // Function to handle profile image change
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileInfo({...profileInfo});
    }
  };

  // Function to save user information
  const saveSettings = () => {
  };

  // useQuery(
  //   ['getUserProfile', registerInfo.phone], 
  //   () => authAPI.checkUserExist(registerInfo.phone), 
  //   {
  //     enabled: registerInfo.phone.length > 0,
  //     onSuccess: async (response) => {
  //       const exist: boolean = response.data;
  //       if (exist) {
  //         setErrorText("Số điện thoại đã tồn tại!");
  //         setErrorVisible(true);
  //       }
  //       else {
  //         setErrorText("");
  //         setErrorVisible(false);
  //       }
  //     },
  //     onError: (error: any) => {
  //       setErrorText(error.message);
  //     },
  //   },
  // );

  const logout = useMutation(authAPI.logout, {
    onSuccess: async (response) => {
      const succsess: boolean = response.data;
      if (succsess) {
        router.navigate("../(auth)/login");
      }
    },
    onError: (error: any) => {
      router.navigate("./");
    },
  });

  const handleLogout = async () => {
    const userId: string| null = await AsyncStorage.getItem(STORAGE_KEY.ID);
    const refresh_token: string| null = await AsyncStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    if (userId && refresh_token) {
      await AsyncStorage.removeItem(STORAGE_KEY.ID);
      await AsyncStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
      logout.mutate({ userId, refresh_token } as unknown as LogOutDto);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileInfo.profileImage ? { uri: profileInfo.profileImage } : require('../../assets/images/icon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={"name"}
          // onChangeText={}
          style={styles.input}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={"phone"}
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changePhotoText: {
    textAlign: 'center',
    color: 'blue',
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
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});
