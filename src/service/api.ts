import { create } from "apisauce";
import Cookies from "universal-cookie";

import { CookiesConfig } from "@/config/spotify";
import { ClientId } from "@/utils/spotify";
import { RefreshTokenBody } from "@/features/token/api/useRefreshToken.types";

export const ApiAccounts = create({
  baseURL: "https://accounts.spotify.com/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const ApiWithToken = () => {
  const cookies = new Cookies(null, {
    path: "/",
    maxAge: CookiesConfig.maxAgeForWeek,
  });
  const cookieToken = cookies.get("access_token");
  const cookieRefreshToken = cookies.get("refresh_token");
  const cookieExpiresIn = cookies.get("token_expires_in");
  const isTokenValid = cookieExpiresIn ? cookieExpiresIn > Date.now() : false;

  const api = create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookieToken}`,
    },
  });

  const refreshToken = () => {
    const body: RefreshTokenBody = {
      grant_type: "refresh_token",
      client_id: ClientId,
      refresh_token: cookieRefreshToken,
    };
    return (
      ApiAccounts.post("api/token", body)
        .then((res: any) => {
          if (res.ok) {
            const expireDate =
              Date.now() + CookiesConfig.tokenValidDurationInMs;

            cookies.set("access_token", res.data.access_token, {
              maxAge: CookiesConfig.tokenValidDurationInSec,
            });
            cookies.set("refresh_token", res.data.refresh_token);
            cookies.set("token_expires_in", expireDate);
            return res;
          }
        })
        //todo refresh失敗要做的事 清空資料或跳轉
        //todo 跳轉前先記憶網址 讓跳轉回來可以接續動作
        //todo 設定短時間的記憶 保證兩動作為同一人
        .catch((err) => console.log({ err }))
    );
  };

  api.axiosInstance.interceptors.request.use(async (config) => {
    if (cookieRefreshToken && !isTokenValid) {
      console.log("pre request refresh token");
      const data = await refreshToken();
      config.headers.Authorization = `Bearer ${data.data.access_token}`;
    } else if (!cookieRefreshToken) {
      //todo 重新登入
    } else {
      console.log("dont need refresh token");
    }
    return config;
  });

  return api;
};
