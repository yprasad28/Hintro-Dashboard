"use client";

import * as React from "react";
import { LogOut, UserCircle, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarToggle } from "@/components/sidebar/sidebar";
import { LogoutModal } from "@/components/dashboard/logout-modal";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { authApi } from "@/services/api";
import type { User } from "@/types";

interface TopNavbarProps {
  onMenuClick: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { userId, switchUser, logout } = useUserStore();
  const [user, setUser] = React.useState<User | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/dashboard/feedback-history") return "Feedback History";
    return "Dashboard";
  };

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authApi.getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSwitchUser = () => {
    const newUserId = userId === "u1" ? "u2" : "u1";
    switchUser(newUserId);
    localStorage.setItem("userId", newUserId);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userId");
    router.push("/");
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white h-[72px]">
      <div className="flex h-full items-center justify-between px-4 sm:px-8">
        <div className="flex items-center sm:gap-4">
          <SidebarToggle onClick={onMenuClick} />
        </div>
        
        <h1 className="text-[18px] sm:text-[22px] font-bold text-gray-900 tracking-tight absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
          {getPageTitle()}
        </h1>

        <div className="flex items-center gap-3 sm:gap-6">
          <Button 
            variant="outline" 
            className="hidden lg:flex h-10 px-4 rounded-md border-[1px] border-[#000000] gap-2 font-medium text-gray-900 hover:bg-gray-50"
          >
            <Play className="h-3.5 w-3.5 fill-black text-black" />
            <span className="text-[14px]">Watch Tutorial</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 outline-none group cursor-pointer">
                <Avatar className="h-10 w-10 border-0">
                  <AvatarImage 
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"} 
                    alt="User" 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                    {user ? getInitials(user.firstName, user.lastName) : "JD"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user
                      ? `${user.firstName} ${user.lastName}`
                      : "Loading..."}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "..."}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSwitchUser} className="text-sm">
                <UserCircle className="mr-2 h-4 w-4" />
                Switch to {userId === "u1" ? "User 2" : "User 1"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsLogoutModalOpen(true)} className="text-sm text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </header>
  );
}
