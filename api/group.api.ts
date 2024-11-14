import http from "../utils/http";
import { GroupResponse } from "../types/api/response";
import { CreateGroupDto } from "@/types/api/dto";
import { GroupMemberResponse } from "@/types/api/response/group.member.response";
import { FindByUserDto } from "@/types/api/dto/group";

export const GROUP_URL = {
  GROUP: "/group",
  GROUP_LIST: "/group-members/list-by-user",
};

export const groupAPI = {
  createGroup(createGroupDto: CreateGroupDto) {
    return http.post<GroupResponse>(GROUP_URL.GROUP, createGroupDto);
  },

  getGroups(findByUserDto: FindByUserDto) {
    return http.post<GroupMemberResponse>(GROUP_URL.GROUP_LIST, findByUserDto);
  },
};
