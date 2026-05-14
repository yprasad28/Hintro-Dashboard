"use client";

import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CallSessionsList } from "@/components/dashboard/call-sessions-list";
import { useDashboard, useCallSessionStats, useCallSessions } from "@/hooks/useApi";

export default function DashboardPage() {
  const { data: dashboardData } = useDashboard();
  const { data: statsData, isLoading: isLoadingStats } = useCallSessionStats();
  const { isLoading: isLoadingSessions } = useCallSessions(10);

  const user = dashboardData?.user;

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-[20px] sm:text-xl font-semibold text-gray-900 leading-tight">
            Hi, {user?.firstName || "Name"} 👋 Welcome to Hintro
          </h2>
          <p className="text-[13px] sm:text-sm text-gray-500 mt-1">
            Ready to make your next call smarter ?
          </p>
        </div>
        <Button className="w-fit sm:w-auto font-semibold h-8 sm:h-10 px-4 sm:px-6 rounded-lg bg-black text-white text-[12px] sm:text-sm hover:bg-black/90">
          <span className="sm:hidden">Start Call</span>
          <span className="hidden sm:inline">Start New Call</span>
        </Button>
      </div>

      <StatsCards stats={statsData} isLoading={isLoadingStats} />

      <CallSessionsList isLoading={isLoadingSessions} />
    </div>
  );
}