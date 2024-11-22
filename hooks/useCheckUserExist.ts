import { useQuery } from "react-query";
import { authAPI } from '@/api';


export const useCheckUserExist = (phone: string) => {
  return useQuery(
    ['checkUserExist', phone],
    () => authAPI.checkUserExist(phone),
    {
      enabled: phone.length > 0,
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
};
