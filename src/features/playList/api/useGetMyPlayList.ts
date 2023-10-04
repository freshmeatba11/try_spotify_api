import { useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { ApiWithToken } from "@/service/api";
import { initialTokenAtom } from "@/features/token/state";

export const useGetMyPlayList = () => {
  const tokenAtom = useAtomValue(initialTokenAtom);

  const query = useQuery({
    queryKey: ["myPlayList"],
    queryFn: () => ApiWithToken(tokenAtom).get("/me/playlists"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};
