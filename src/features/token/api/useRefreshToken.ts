import { useQuery } from "@tanstack/react-query";
import { useSetAtom, useAtom } from "jotai";
import Cookies from "universal-cookie";

import { ApiAccounts } from "@/service/api";
import { ClientId } from "@/utils/spotify";
import { RefreshTokenBody } from "./useRefreshToken.types";
import { CookiesConfig } from "@/config/spotify";

export const useRefreshToken = () => {
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
        refresh_token: cookies.get("refresh_token"),
      };
      return ApiAccounts.post("api/token", body);
    },
    onSuccess: (data: any) => {
      console.log(data);
      if (data.ok) {
        const expireDate = Date.now() + CookiesConfig.tokenValidDurationInMs;
        cookies.set("access_token", data.data.access_token, {
          maxAge: CookiesConfig.tokenValidDurationInSec,
        });
        cookies.set("refresh_token", data.data.refresh_token);
        cookies.set("token_expires_in", expireDate);

        console.log("refresh success");
      }
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};
