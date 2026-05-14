"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sidebar, MobileSidebar } from "@/components/sidebar/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { FeedbackModal } from "@/components/feedback/feedback-modal";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <FeedbackModal
        open={feedbackModalOpen}
        onOpenChange={setFeedbackModalOpen}
      />
      <MobileSidebar
        open={mobileSidebarOpen}
        onOpenChange={setMobileSidebarOpen}
        onFeedbackClick={() => setFeedbackModalOpen(true)}
      />
      <Sidebar onFeedbackClick={() => setFeedbackModalOpen(true)} />

      <div className="lg:pl-[280px]">
        <TopNavbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="py-6 sm:py-8 px-4 sm:px-8 lg:px-12 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}