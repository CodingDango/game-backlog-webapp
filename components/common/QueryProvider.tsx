'use client';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

interface Props {
  children: ReactNode;
}

export default function QueryProvider({children}: Props) {
  return (
    <QueryClientProvider client={queryClient}>  
      {children}
    </QueryClientProvider>
  );
}
