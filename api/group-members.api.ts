import { RemoveGroupMemberDto } from "@/types/api/dto/group-members";
import http from "../utils/http";
import { GroupUserResponse } from "@/types/api/response/group.member.response";

export const GROUP_MEMBERS_URL = {
  GROUP_MEMBERS: "/group-members/list-by-group/%",
  GROUP_REMOVE_MEMBERS: "/group-members/remove-members"
};

export const groupMemberAPI = {
  getGroupMembers(groupId: string) {
    return http.get<GroupUserResponse>(GROUP_MEMBERS_URL.GROUP_MEMBERS.replace('%', groupId));
  },

  removeGroupMember(removeGroupMembersDto: RemoveGroupMemberDto) {
    return http.post<boolean>(GROUP_MEMBERS_URL.GROUP_REMOVE_MEMBERS, removeGroupMembersDto);
  }
};
