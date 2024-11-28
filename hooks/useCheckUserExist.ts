import { authAPI } from '@/api';
import { useQuery } from "react-query";


export const useCheckUserExist = (phone: string, enabled: boolean=true) => {
  return useQuery(
    ['checkUserExist', phone],
    () => authAPI.checkUserExist(phone),
    {
      enabled: phone.length > 0 && enabled,
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
};
