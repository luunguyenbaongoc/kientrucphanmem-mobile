import http from "../utils/http";
import { GroupResponse } from "../types/api/response";
import { CreateGroupDto } from "@/types/api/dto";

export const GROUP_URL = {
  GROUP: '/group/groups',
};

export const groupAPI = {
  createGroup(createGroupDto: CreateGroupDto) {
    return http.patch<GroupResponse>(GROUP_URL.GROUP, createGroupDto);
  },
};
