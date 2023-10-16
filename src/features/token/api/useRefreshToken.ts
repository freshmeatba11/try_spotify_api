import { useQuery } from "@tanstack/react-query";
import { useSetAtom, useAtom } from "jotai";
import Cookies from "universal-cookie";

import { ApiAccounts } from "@/service/api";
import { ClientId } from "@/utils/spotify";
import { initialTokenAtom, initialRefreshTokenAtom } from "../state";
import { RefreshTokenBody } from "./useRefreshToken.types";
import { CookiesConfig } from "@/config/spotify";

export const useRefreshToken = () => {
  const setTokenAtom = useSetAtom(initialTokenAtom);
  const [refreshTokenAtom, setRefreshTokenAtom] = useAtom(
    initialRefreshTokenAtom
  );
  const cookies = new Cookies(null, {
    path: "/",
    maxAge: CookiesConfig.maxAgeForWeek,
  });

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
        cookies.set("access_token", data.data.access_token);
        cookies.set("refresh_token", data.data.refresh_token);

        setTokenAtom(data.data.access_token);
        setRefreshTokenAtom(data.data.refresh_token);
        console.log("refresh success");
      }
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};
