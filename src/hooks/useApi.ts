"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi, callSessionsApi } from "@/services/api";
import { useUserStore } from "@/store";

export function useProfile() {
  const { userId } = useUserStore();
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: authApi.getProfile,
    enabled: !!userId,
  });
}

export function useDashboard() {
  const { userId } = useUserStore();
  return useQuery({
    queryKey: ["dashboard", userId],
    queryFn: authApi.getDashboard,
    enabled: !!userId,
  });
}

export function useCallSessionStats() {
  const { userId } = useUserStore();
  return useQuery({
    queryKey: ["callSessions", "stats", userId],
    queryFn: callSessionsApi.getStats,
    enabled: !!userId,
  });
}

export function useCallSessions(limit = 10) {
  const { userId } = useUserStore();
  return useQuery({
    queryKey: ["callSessions", "history", limit, userId],
    queryFn: () => callSessionsApi.getCallHistory(limit),
    enabled: !!userId,
  });
}