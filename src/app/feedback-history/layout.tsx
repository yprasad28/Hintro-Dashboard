"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function FeedbackHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}