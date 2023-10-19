import { useQuery } from "@tanstack/react-query";

import { ApiWithToken } from "@/service/api";

export const useGetMyPlayList = () => {
  const query = useQuery({
    queryKey: ["myPlayList"],
    queryFn: () => ApiWithToken().get("/me/playlists"),
    onSuccess: (data: any) => {
      console.log(data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};
