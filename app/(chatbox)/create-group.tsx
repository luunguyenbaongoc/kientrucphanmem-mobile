import { groupAPI } from '@/api/group.api';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet 
} from 'react-native';
import { useMutation } from 'react-query';

const CreateGroupScreen = () => {
  const [name, setName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleCreateGroup = () => {
    createGroup.mutate({ name });
    router.push({
      pathname: "/(chatbox)/group-chatbox",
      params: { groupName: name },
    });
  }

  const createGroup = useMutation(groupAPI.createGroup, {
    onSuccess: (response) => {
      const { name, group_lead: { id } } = response.data;
      console.log('Group created successfully', response);
    },
    onError: (error) => {
      console.error('Error creating group', error);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo nhóm</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên nhóm"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={groupDescription}
        onChangeText={setGroupDescription}
        multiline
      />
      <Button title="Tạo nhóm" onPress={handleCreateGroup} />
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
});

export default CreateGroupScreen;
