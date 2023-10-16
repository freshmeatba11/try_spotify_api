"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { useQueryClient } from "@tanstack/react-query";

import { spotifyLogin, useSpotifyLogout } from "@/utils/spotify";
import { useGetMyPlayList } from "@/features/playList/api/useGetMyPlayList";
import { useRefreshToken } from "@/features/token/api/useRefreshToken";
import {
  initialTokenAtom,
  initialRefreshTokenAtom,
} from "@/features/token/state";

export default function Home() {
  const router = useRouter();
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  //@ts-ignore
  const { data, isError } = useGetMyPlayList();
  const { data: refreshTokenData, refetch } = useRefreshToken();

  const tokenAtom = useAtomValue(initialTokenAtom);
  const refreshTokenAtom = useAtomValue(initialRefreshTokenAtom);

  const handleLogout = useSpotifyLogout();

  return (
    <main>
      <button
        onClick={() => {
          spotifyLogin();
        }}
      >
        login
      </button>
      <button onClick={() => refetch()}>refresh</button>
      <button
        onClick={() => {
          router.push("/test");
        }}
      >
        go to /test
      </button>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Log out
      </button>

      <div>
        {
          //@ts-ignore
          data?.data?.items?.map((item: any) => (
            <div key={item.id}>{item.name}</div>
          ))
        }
      </div>
    </main>
  );
}
