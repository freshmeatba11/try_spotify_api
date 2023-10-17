"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { useQueryClient } from "@tanstack/react-query";

import { useGetMyPlayList } from "@/features/playList/api/useGetMyPlayList";

export default function Home() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isError } = useGetMyPlayList();

  return (
    <main>
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
