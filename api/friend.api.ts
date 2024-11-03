import http from "../utils/http";
import { FriendResponse } from "@/types/api/response";

export const FRIEND_URL = {
  FRIEND: '/friend',
};

export const friendAPI = {
  getFriends() {
    return http.get<FriendResponse[]>(FRIEND_URL.FRIEND);
  }
};
