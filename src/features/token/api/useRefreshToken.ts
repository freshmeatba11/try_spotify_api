import { useQuery } from "@tanstack/react-query";
import { useSetAtom, useAtom } from "jotai";

import { ApiAccounts } from "@/service/api";
import { ClientId } from "@/utils/spotify";
import { initialTokenAtom, initialRefreshTokenAtom } from "../state";
import { RefreshTokenBody } from "./useRefreshToken.types";

export const useRefreshToken = () => {
  const setTokenAtom = useSetAtom(initialTokenAtom);
  const [refreshTokenAtom, setRefreshTokenAtom] = useAtom(
    initialRefreshTokenAtom
  );

  const query = useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => {
      const body: RefreshTokenBody = {
        grant_type: "refresh_token",
        client_id: ClientId,
        refresh_token: refreshTokenAtom,
      };
      return ApiAccounts.post("api/token", body);
    },
    onSuccess: (data: any) => {
      console.log(data);
      if (data.ok) {
        setTokenAtom(data.data.access_token);
        setRefreshTokenAtom(data.data.refresh_token);
        console.log("refresh success");
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("refresh_token", data.data.refresh_token);
      }
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};
