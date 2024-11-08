export type GroupMemberInfoResponse = {
    group_id: string;
    user_id: string;
    created_by: string;
    created_date: string;
}

export type GroupMemberResponse = {
  groups: GroupMemberInfoResponse[];
  count: number;
};
