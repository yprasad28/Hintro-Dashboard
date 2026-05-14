"use client";

import * as React from "react";
import { PieChart, Sparkles, Clock, CalendarDays } from "lucide-react";
import { CallSessionStats } from "@/types";
import { formatDuration, formatDate } from "@/lib/formatters";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-white border border-gray-300 rounded-[12px] flex-1 min-w-0 h-auto sm:h-[86px]">
      <div
        className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl shrink-0"
        style={{
          backgroundColor: iconBgColor,
        }}
      >
        <Icon
          className="h-5 w-5 sm:h-6 sm:w-6"
          style={{
            color: iconColor,
          }}
        />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[11px] sm:text-[13px] font-medium text-gray-500 truncate">
          {title}
        </span>
        <span className="text-base sm:text-xl font-semibold text-gray-900 truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

interface StatsCardsProps {
  stats?: CallSessionStats | null;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const isEmpty = !stats || stats.totalSessions === 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-gray-100 rounded-[12px] animate-pulse h-[80px] sm:h-[86px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Total Sessions"
        value={stats?.totalSessions || 0}
        icon={PieChart}
        iconBgColor="#FEE2E2"
        iconColor="#EF4444"
      />
      <StatCard
        title="Average Duration"
        value={isEmpty ? "0" : formatDuration(stats?.averageDuration || 0)}
        icon={Clock}
        iconBgColor="#E0F7FA"
        iconColor="#00BCD4"
      />
      <StatCard
        title="AI Used"
        value={isEmpty ? "0" : `${stats?.totalAIInteractions} times`}
        icon={Sparkles}
        iconBgColor="#DCFCE7"
        iconColor="#22C55E"
      />
      <StatCard
        title="Last Session"
        value={isEmpty ? "-" : formatDate(stats?.lastSession[0] || "")}
        icon={CalendarDays}
        iconBgColor="#EDE9FE"
        iconColor="#8B5CF6"
      />
    </div>
  );
}
