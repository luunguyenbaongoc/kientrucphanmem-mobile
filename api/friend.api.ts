import http from "../utils/http";
import { FriendResponse } from "@/types/api/response";
import { MakeRequestDto } from "@/types/api/dto";
import { FriendRequestResponse } from "@/types/api/response/friend-request.response";
import { FindByTextDto } from "@/types/api/dto/friend";

export const FRIEND_URL = {
  FRIEND: '/friend',
  FRIEND_REQUEST: '/friend-request',
  FRIEND_REQUEST_RECEIVED: '/friend-request/list-received',
  FRIEND_REQUEST_SENT: '/friend-request/list-sent',
  FIND_BY_TEXT: '/friend/find-by-text'
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
  },

  findByText(findByTextDto: FindByTextDto) {
    return http.post<FriendResponse[]>(FRIEND_URL.FIND_BY_TEXT, findByTextDto);
  }
};
