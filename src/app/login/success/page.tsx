"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";

import { useSpotifyLogout } from "@/utils/spotify";
import { useGetTokenAtomQuery } from "@/features/token/api/useGetToken";
import { initialCodeAtom, initialTokenAtom } from "@/features/token/state";

const Button = styled.button`
  width: 100px;
  height: 100px;
`;

const Success = () => {
  const router = useRouter();
  const param = useParams();
  const searchParam = useSearchParams();
  const code = searchParam.get("code") ?? "";
  const setCodeAtom = useSetAtom(initialCodeAtom);
  setCodeAtom(code);

  // Access the client
  // const queryClient = useQueryClient();

  const [_] = useAtom(useGetTokenAtomQuery);
  const setTokenAtom = useSetAtom(initialTokenAtom);

  const handleLogout = useSpotifyLogout();

  useEffect(() => {
    if (!code) {
      //* 阻擋手動進入這個路徑
      code || console.log("no code");
      code || router.replace("/");
    } else {
      if (_.ok) {
        console.log("登入成功！");
        setTokenAtom(_.data.access_token);
        router.replace("/");
      } else {
        //* 處理登入失敗
        console.log("登入失敗！");
        handleLogout();
        router.replace("/");
      }
    }
    //eslint-disable-next-line
  }, []);
};

export default Success;
