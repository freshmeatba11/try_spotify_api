"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { spotifyLogin, useSpotifyLogout } from "@/utils/spotify";
import { useRefreshToken } from "@/features/token/api/useRefreshToken";

const HeaderWrapper = styled.header`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;
const Button = styled.button`
  border: 1px solid red;
  padding: 1rem;
`;

export default function Header() {
  const router = useRouter();
  const { data: refreshTokenData, refetch } = useRefreshToken();
  const handleLogout = useSpotifyLogout();

  const config = [
    {
      text: "home",
      onClick: () => {
        router.push("/");
      },
    },
    {
      text: "login",
      onClick: () => {
        spotifyLogin();
      },
    },
    {
      text: "refresh",
      onClick: () => refetch(),
    },
    {
      text: "go to /test",
      onClick: () => {
        router.push("/test");
      },
    },
    {
      text: "Log out",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  return (
    <HeaderWrapper>
      {config.map((item) => (
        <Button key={item.text} onClick={item.onClick}>
          {item.text}
        </Button>
      ))}
    </HeaderWrapper>
  );
}
