import http from "../utils/http";
import { ProfileResponse } from "../types/api/response";
import { UpdateProfileDto, UploadImageDto } from "@/types/api/dto";

export const USER_URL = {
  USER_PROFILE: '/user/me/profiles',
  PROFILE: '/profile/profiles/%',
  PROFILE_UPLOAD_IMAGE: '/profile/profiles/%/upload-image'
};

export const userAPI = {
  getMyProfile() {
    return http.get<ProfileResponse[]>(USER_URL.USER_PROFILE);
  },
  updateProfile(updateProfileDto: UpdateProfileDto) {
    return http.patch<ProfileResponse>(
      USER_URL.PROFILE.replace("%", updateProfileDto.profileId), updateProfileDto);
  },
  uploadAvatar(uploadImageDto: UploadImageDto) {
    return http.post<ProfileResponse>(
      USER_URL.PROFILE_UPLOAD_IMAGE.replace("%", uploadImageDto.profileId), uploadImageDto.formData, { 
        headers: {'Content-Type': 'multipart/form-data',
        }
      });
  },
};
