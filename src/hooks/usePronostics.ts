"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPronostics, Pronostic } from "@/lib/api";

export function usePronostics(params?: { take?: number; skip?: number }) {
  return useQuery<Pronostic[], Error>({
    queryKey: ["pronostics", params?.take ?? 50, params?.skip ?? 0],
    queryFn: () => fetchPronostics(params),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}


