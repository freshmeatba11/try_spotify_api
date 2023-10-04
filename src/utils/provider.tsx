"use client";

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai/react";
import { useHydrateAtoms } from "jotai/react/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientAtom } from "jotai-tanstack-query";
import { DevTools } from "jotai-devtools";

const queryClient = new QueryClient();

const HydrateAtoms = ({ children }: any) => {
  //@ts-ignore
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};

function Providers({ children }: React.PropsWithChildren) {
  // const [client] = React.useState(
  //   new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  // );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <HydrateAtoms>
          {children}
          <DevTools
            {...{
              theme: "dark",
              options: { shouldExpandJsonTreeViewInitially: true },
            }}
          />
        </HydrateAtoms>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
