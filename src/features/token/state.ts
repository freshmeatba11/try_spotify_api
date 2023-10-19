import { atom } from "jotai";
import Cookies from "universal-cookie";

import { CookiesConfig } from "@/config/spotify";

const cookies = new Cookies(null, {
  path: "/",
  maxAge: CookiesConfig.maxAgeForWeek,
});

export const initialCodeAtom = atom("");
initialCodeAtom.debugLabel = "initialCodeAtom";
