import { UpdateProfileDto } from "@/types/api/dto";
import { ProfileResponse } from "../types/api/response";
import http from "../utils/http";

export const USER_URL = {
  USER_PROFILE: '/user/me/profiles',
  PROFILE: '/profile',
};

export const userAPI = {
  getMyProfile() {
    return http.get<ProfileResponse[]>(USER_URL.USER_PROFILE);
  },
  updateProfile(updateProfileDto: UpdateProfileDto) {
    return http.put<ProfileResponse>(USER_URL.PROFILE, updateProfileDto);
  }
};
