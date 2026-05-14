import axios from "axios";
import type {
  ProfileResponse,
  DashboardResponse,
  CallSessionStats,
  CallSessionsResponse,
} from "@/types";

export const api = axios.create({
  baseURL: "https://mock-backend-hintro.vercel.app",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("userId") || "u1";
    config.headers["x-user-id"] = userId;
  }
  return config;
});

export const authApi = {
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get<ProfileResponse>("/api/auth/profile");
    return response.data;
  },

  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await api.get<DashboardResponse>("/api/auth/dashboard");
    return response.data;
  },
};

export const callSessionsApi = {
  getStats: async (): Promise<CallSessionStats> => {
    const response = await api.get<CallSessionStats>(
      "/api/call-sessions/stats"
    );
    return response.data;
  },

  getCallHistory: async (
    limit: number = 10
  ): Promise<CallSessionsResponse> => {
    const response = await api.get<CallSessionsResponse>(
      `/api/call-sessions?limit=${limit}`
    );
    return response.data;
  },
};