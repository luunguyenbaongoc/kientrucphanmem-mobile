import * as React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const SettingsScreen = () => {
  const [name, setName] = React.useState('John Doe');
  const [email, setEmail] = React.useState('john.doe@example.com');
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  // Function to handle profile image change
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Function to save user information
  const saveSettings = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Profile Image:', profileImage);
    // Perform save action (API call or AsyncStorage)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/images/icon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <Button
        style={{ backgroundColor: "#0190f3" }}
        mode="contained"
        onPress={saveSettings}
      >
        Lưu
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
