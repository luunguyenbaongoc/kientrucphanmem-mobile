import http from "../utils/http";
import { FriendResponse } from "@/types/api/response";
import { MakeRequestDto } from "@/types/api/dto";

export const FRIEND_URL = {
  FRIEND: '/friend',
  FRIEND_REQUEST: '/friend-request'
};

export const friendAPI = {
  getFriends() {
    return http.get<FriendResponse[]>(FRIEND_URL.FRIEND);
  },

  sendFriendRequest(makeRequestDto: MakeRequestDto) {
    return http.post<FriendResponse>(FRIEND_URL.FRIEND_REQUEST, makeRequestDto);
  }
};
