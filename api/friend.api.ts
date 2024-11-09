import http from "../utils/http";
import { FriendResponse } from "@/types/api/response";
import { MakeRequestDto } from "@/types/api/dto";
import { FriendRequestResponse } from "@/types/api/response/friend-request.response";

export const FRIEND_URL = {
  FRIEND: '/friend',
  FRIEND_REQUEST: '/friend-request',
  FRIEND_REQUEST_RECEIVED: '/friend-request/list-received',
  FRIEND_REQUEST_SENT: '/friend-request/list-sent',
};

export const friendAPI = {
  getFriends() {
    return http.get<FriendResponse[]>(FRIEND_URL.FRIEND);
  },

  getFriendRequestsReceived() {
    return http.get<FriendRequestResponse[]>(FRIEND_URL.FRIEND_REQUEST_RECEIVED);
  },

  getFriendRequestsSent() {
    return http.get<FriendRequestResponse[]>(FRIEND_URL.FRIEND_REQUEST_SENT);
  },

  sendFriendRequest(makeRequestDto: MakeRequestDto) {
    return http.post<FriendRequestResponse>(FRIEND_URL.FRIEND_REQUEST, makeRequestDto);
  }
};
