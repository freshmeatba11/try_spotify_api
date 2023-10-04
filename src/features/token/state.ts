import { atom } from "jotai";

const localStorageToken = localStorage.getItem("access_token");
export const initialTokenAtom = atom(localStorageToken ?? "");
initialTokenAtom.debugLabel = "initialTokenAtom";

const localStorageRefreshToken = localStorage.getItem("refresh_token");
export const initialRefreshTokenAtom = atom(localStorageRefreshToken ?? "");
initialRefreshTokenAtom.debugLabel = "initialRefreshTokenAtom";

export const initialCodeAtom = atom("");
initialCodeAtom.debugLabel = "initialCodeAtom";
