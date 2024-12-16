"use client";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const QueryProviderWrapper = ({
  children,
  includeDevtools = false,
}: {
  children: ReactNode;
  includeDevtools?: boolean;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {includeDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default QueryProviderWrapper;
