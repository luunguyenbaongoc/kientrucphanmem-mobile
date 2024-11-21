import { groupAPI } from '@/api/group.api';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useToast } from 'react-native-paper-toast';
import { useMutation, useQueryClient } from 'react-query';

interface GroupAvatarInfo {
  uri: string;
  fileName: string;
};

const CreateGroupScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupImageInfo, setGroupImageInfo] = useState<GroupAvatarInfo>({uri: '', fileName: ''});
  const queryClient = useQueryClient();
  const toaster = useToast();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { fileName, uri } = result.assets[0] as {
        fileName: string;
        uri: string;
      };
      setGroupImageInfo({ uri, fileName });
    }
  };

  const createGroup = useMutation(groupAPI.createGroup, {
    onSuccess: (response) => {
      const { name, id } = response.data;
      setGroupId(id);
      queryClient.invalidateQueries(["getGroupsByUser", ""]);
      toaster.show({
        message: 'Tạo nhóm thành công',
        duration: 2000,
        type: "success",
      });
      router.push({
        pathname: "/(chatbox)/group-chatbox",
        params: { groupName: name },
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo nhóm</Text>
      <TouchableOpacity onPress={pickImage}>
      <Text style={styles.centeredText}>Hình đại diện</Text>
        <Image
          source={
            groupImageInfo.uri.length > 0
              ? {
                  uri: groupImageInfo.uri,
                }
              : require("../../assets/images/icon.png")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Tên nhóm"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Tạo nhóm" onPress={() => {
        createGroup.mutate({ name, description });
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 16,
  },
  centeredText: {
    fontSize: 16,
    textAlign: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default CreateGroupScreen;
