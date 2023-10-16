import { atom } from "jotai";
import Cookies from "universal-cookie";

import { CookiesConfig } from "@/config/spotify";

const cookies = new Cookies(null, {
  path: "/",
  maxAge: CookiesConfig.maxAgeForWeek,
});

const cookieToken = cookies.get("access_token");
export const initialTokenAtom = atom(cookieToken ?? "");
initialTokenAtom.debugLabel = "initialTokenAtom";

const cookieRefreshToken = cookies.get("refresh_token");
export const initialRefreshTokenAtom = atom(cookieRefreshToken ?? "");
initialRefreshTokenAtom.debugLabel = "initialRefreshTokenAtom";

export const initialCodeAtom = atom("");
initialCodeAtom.debugLabel = "initialCodeAtom";
