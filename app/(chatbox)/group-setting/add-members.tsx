import { groupMemberAPI } from '@/api';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';
import { useToast } from 'react-native-paper-toast';
import { useMutation, useQuery } from 'react-query';
import { 
  EditableComboBox, 
  EditableComboBoxModelItem 
} from '@/components/ComboBox';
import { friendAPI } from '@/api/friend.api';
import { ActivityIndicator } from 'react-native-paper';


const AddMembersScreen = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { chatboxId, avatar, name, toGroupId, toUserId } =
    useLocalSearchParams<{
      chatboxId: string;
      avatar: string;
      name: string;
      toUserId: string;
      toGroupId: string;
    }>();
  const toaster = useToast();

  const { isLoading, data } = useQuery({
    queryKey: ["getFriends"],
    queryFn: () => friendAPI.getFriends(),
    enabled: true,
    select: (rs) => {
      let result: EditableComboBoxModelItem[] = [];
      rs.data.forEach(item => {
        result.push({
          id: item.to_user_profile.id,
          text: item.to_user_profile.profile[0].fullname,
          avatar: `data:image/png;base64, ${item.to_user_profile.profile[0]?.avatar}`,
        });
      });
      return result;
    },
  });

  const addMembers = useMutation(groupMemberAPI.addGroupMember, {
    onSuccess: (response) => {
      toaster.show({
        message: 'Thêm thành viên thành công',
        duration: 2000,
        type: "success",
      });
      router.push({
        pathname: "/(chatbox)/group-chatbox",
        params: { chatboxId, avatar, name, toGroupId, toUserId },
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

  return isLoading ? 
    <ActivityIndicator /> 
    : (
    <View style={styles.container}>
      <EditableComboBox 
        items={data? data as EditableComboBoxModelItem[]: []}
        placeHolderText="Tìm bạn"
        onSelectionChanged={(ids: string[]) => {
          setSelectedIds(ids);
        }}
      />
      <Button title="Thêm bạn" onPress={() => {
        addMembers.mutate({
          group_id: toGroupId,
          user_ids: selectedIds,
        });
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
  }
});

export default AddMembersScreen;
