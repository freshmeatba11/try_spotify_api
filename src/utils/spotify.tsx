import { useSetAtom } from "jotai";
import { SpotifyConfig } from "@/config/spotify";
import {
  initialTokenAtom,
  initialRefreshTokenAtom,
  initialCodeAtom,
} from "@/features/token/state";

export const ClientId = SpotifyConfig.clientId;
export const RedirectUri = SpotifyConfig.redirectUri;

export async function GenerateCodeChallenge(codeVerifier: string) {
  function base64encode(string: ArrayBuffer) {
    //@ts-ignore
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const CodeVerifier = generateRandomString(128);

export const spotifyLogin = () =>
  GenerateCodeChallenge(CodeVerifier).then((codeChallenge) => {
    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email";

    localStorage.setItem("code_verifier", CodeVerifier);
    //@ts-ignore
    const args = new URLSearchParams({
      response_type: "code",
      client_id: ClientId,
      scope: scope,
      redirect_uri: RedirectUri,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    //@ts-ignore
    window.location = "https://accounts.spotify.com/authorize?" + args;
  });

export const useSpotifyLogout = () => {
  // useSetAtom(initialTokenAtom)("");
  // useSetAtom(initialRefreshTokenAtom)("");
  const setInitialTokenAtom = useSetAtom(initialTokenAtom);
  const setInitialRefreshTokenAtom = useSetAtom(initialRefreshTokenAtom);
  const setInitialCodeAtom = useSetAtom(initialCodeAtom);
  //todo 清空 query 快取
  return () => {
    setInitialTokenAtom("");
    setInitialRefreshTokenAtom("");
    setInitialCodeAtom("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("code_verifier");
  };
};
