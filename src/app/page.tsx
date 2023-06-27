"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
import styled from "styled-components";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function Home() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  // const query = useQuery({
  //   queryKey: ["test"],
  //   queryFn: async () => {
  //     const res = await fetch("https://prompt-ashy-xi.vercel.app/api/prompt");
  //     return res.json();
  //   },
  // });
  // console.log(query);

  return <main></main>;
}
