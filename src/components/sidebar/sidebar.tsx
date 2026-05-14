"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Phone,
  FileText,
  MessageSquare,
  Aperture,
  History,
  Gift,
  Info,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  hasIndicator?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Call Insights", href: "/dashboard/call-insights", icon: Phone },
  { label: "Knowledge Base", href: "/dashboard/knowledge-base", icon: FileText, hasIndicator: true },
  { label: "Prompts", href: "/dashboard/prompts", icon: MessageSquare, hasIndicator: true },
  { label: "Boxy Controls", href: "/dashboard/boxy-controls", icon: Aperture, hasIndicator: true },
];

const bottomNavItems: NavItem[] = [
  { label: "Feedback History", href: "/feedback-history", icon: History },
  { label: "Feedback", href: "#", icon: Gift },
];

interface SidebarContentProps {
  onItemClick?: () => void;
  onFeedbackClick?: () => void;
  className?: string;
}

function SidebarContent({
  onItemClick,
  onFeedbackClick,
  className,
}: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col h-full bg-white", className)}>
      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} onClick={onItemClick}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between gap-3 h-12 px-4 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#EEF2FF] hover:text-[#4F46E5]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5", isActive ? "text-[#4F46E5]" : "text-gray-400 group-hover:text-gray-600")} />
                  <span className="font-medium text-[15px]">{item.label}</span>
                </div>
                {item.hasIndicator && (
                  <Info className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-gray-100 p-4 space-y-2 pb-6">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.label === "Feedback") {
            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => {
                  onFeedbackClick?.();
                  onItemClick?.();
                }}
                className={cn(
                  "w-full justify-start gap-3 h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                )}
              >
                <Icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                <span className="font-medium text-[15px]">{item.label}</span>
              </Button>
            );
          }

          return (
            <Link key={item.href} href={item.href} onClick={onItemClick}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group",
                  isActive && "bg-[#EEF2FF] text-[#4F46E5]"
                )}
              >
                <Icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                <span className="font-medium text-[15px]">{item.label}</span>
              </Button>
            </Link>
          );
        })}
        
        <div className="pt-2">
          <Button
            className="w-full h-11 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-xl transition-colors"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </nav>
  );
}

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFeedbackClick: () => void;
}

export function MobileSidebar({
  open,
  onOpenChange,
  onFeedbackClick,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Navigate through the dashboard
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center border-b border-gray-100 px-6 h-[72px]">
            <Link href="/dashboard" className="flex items-center">
              <span className="font-bold text-[24px] text-gray-900 tracking-tight">Hintro</span>
            </Link>
          </div>
          <SidebarContent
            onItemClick={() => onOpenChange(false)}
            onFeedbackClick={onFeedbackClick}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Sidebar({ onFeedbackClick }: { onFeedbackClick: () => void }) {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[280px] lg:fixed lg:inset-y-0 bg-white border-r border-gray-100">
      <div className="flex items-center justify-center border-b border-gray-100 px-6 h-[72px]">
        <Link href="/dashboard" className="flex items-center">
          <span className="font-bold text-[24px] text-gray-900 tracking-tight">Hintro</span>
        </Link>
      </div>
      <SidebarContent onFeedbackClick={onFeedbackClick} />
    </aside>
  );
}

export function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={onClick}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}

interface SidebarToggleProps {
  onClick: () => void;
}
