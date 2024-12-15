"use client";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProviderWrapper = ({
  children,
  includeDevtools = false,
}: {
  children: ReactNode;
  includeDevtools?: boolean;
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {includeDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default QueryProviderWrapper;
