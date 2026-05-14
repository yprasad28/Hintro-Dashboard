"use client";

import * as React from "react";
import { Calendar, MoreVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CallSession } from "@/types";
import { useCallSessions } from "@/hooks/useApi";
import { formatDateGroup, formatTime } from "@/lib/formatters";

interface CallSessionCardProps {
  session: CallSession;
}

function CallSessionCard({ session }: CallSessionCardProps) {
  const firstLetter = session.client.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between py-4 group cursor-pointer hover:bg-gray-50/50 px-4 rounded-xl transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#A855F7] text-white font-semibold text-lg">
          {firstLetter}
        </div>
        <div className="flex flex-col">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
            {session.client}
          </h3>
          <div className="flex items-center -space-x-1.5 mt-1.5">
            {session.participants.slice(0, 3).map((p, i) => (
              <Avatar key={i} className="h-5 w-5 border-2 border-white">
                <AvatarImage src={`https://i.pravatar.cc/100?u=${p.name}`} />
                <AvatarFallback className="text-[8px] bg-gray-100">{p.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-medium text-gray-500">
          {formatTime(session.started_at).toLowerCase()}
        </span>
        <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  isLoading: boolean;
}

function EmptyState({ isLoading }: EmptyStateProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 bg-white border border-gray-100 rounded-[20px] text-center">
      <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-6">
        <Calendar className="h-6 w-6 text-[#4F46E5]" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Calls</h3>
      <p className="text-sm text-gray-500 max-w-[420px] mb-8 leading-relaxed">
        Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
      </p>
      <Button
        variant="outline"
        className="h-10 px-6 rounded-lg font-medium text-gray-900 border-gray-200 hover:bg-gray-50 transition-colors"
      >
        Start a Call
      </Button>
    </div>
  );
}

export function CallSessionsList({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const { data } = useCallSessions();
  const sessions = React.useMemo(() => data?.callSessions || [], [data]);
  const isEmpty = sessions.length === 0;

  const groupedSessions = React.useMemo(() => {
    const groups: { [key: string]: CallSession[] } = {};
    sessions.forEach((session) => {
      const dateKey = formatDateGroup(session.started_at);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(session);
    });
    return groups;
  }, [sessions]);

  return (
    <div className="space-y-6 sm:space-y-8 mt-10 sm:mt-12">
      <div className="flex items-center justify-center">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent calls</h2>
      </div>

      {isEmpty && !isLoading ? (
        <EmptyState isLoading={isLoading} />
      ) : (
        <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
          {isLoading ? (
            <EmptyState isLoading={true} />
          ) : (
            Object.entries(groupedSessions).map(([date, items]) => (
              <div key={date} className="space-y-3">
                <h3 className="text-[11px] sm:text-[13px] font-semibold text-gray-400 px-4">
                  {date}
                </h3>
                <div className="space-y-1">
                  {items.map((session) => (
                    <CallSessionCard key={session._id} session={session} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
