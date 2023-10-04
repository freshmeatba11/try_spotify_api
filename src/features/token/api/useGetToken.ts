import { atomsWithQuery } from "jotai-tanstack-query";

import { ApiAccounts } from "@/service/api";
import { RedirectUri, ClientId } from "@/utils/spotify";

import { GetTokenBody } from "./useGetToken.type";
import { initialCodeAtom } from "../state";

const codeVerifier = localStorage.getItem("code_verifier") ?? "";
export const [useGetTokenAtomQuery] = atomsWithQuery((get) => ({
  queryKey: ["users", "token"],
  queryFn: () => {
    const body: GetTokenBody = {
      grant_type: "authorization_code",
      code: get(initialCodeAtom),
      redirect_uri: RedirectUri,
      client_id: ClientId,
      code_verifier: codeVerifier,
    };

    return ApiAccounts.post("api/token", body);
  },
  onSuccess: (data: any) => {
    console.log(data);
    if (data.ok) {
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
    }
  },
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  onError: (error) => {
    // An error happened!
    console.error("Error:", error);
  },
}));
