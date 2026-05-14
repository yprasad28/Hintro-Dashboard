"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store";
import { Mail, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { switchUser } = useUserStore();

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchUser("u1");
    localStorage.setItem("userId", "u1");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[400px] space-y-12">
        <h1 className="text-[28px] sm:text-[32px] font-bold text-gray-900 text-center">
          Login
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-gray-700 ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                type="email"
                placeholder="Example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 pl-12 pr-4 bg-gray-50/50 border-gray-100 rounded-xl focus:bg-white focus:ring-0 focus:border-gray-200 text-[15px] transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-gray-700 ml-1">
              Password
            </label>
            <div className="relative group">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-14 pl-4 pr-12 bg-gray-50/50 border-gray-100 rounded-xl focus:bg-white focus:ring-0 focus:border-gray-200 text-[15px] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full h-14 bg-black text-white font-bold text-[16px] rounded-xl hover:bg-black/90 transition-all shadow-sm">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}