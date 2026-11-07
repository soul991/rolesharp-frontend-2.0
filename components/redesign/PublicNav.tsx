"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RoleSharpMark from "@/components/RoleSharpMark";
import { useRedesignStore } from "@/lib/redesign-store";
import { Sun, Moon, ArrowRight } from "lucide-react";

export function PublicNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useRedesignStore();

  const isLight = theme === "light";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
        isLight
          ? "bg-[#FAF9F6]/95 border-[#E2E0D8] text-[#10243E]"
          : "bg-[#05080F]/95 border-[#1A2638] text-white"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/redesign" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-blue-600/10 border border-blue-500/20 group-hover:scale-105 transition-transform">
            <RoleSharpMark />
          </div>
          <span className="font-bold text-lg tracking-tight font-display">
            <span className="text-blue-500">R</span>ole<span className="text-blue-400">Sharp</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/redesign#features"
            className={`transition-colors ${
              isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"
            }`}
          >
            Capabilities
          </Link>
          <Link
            href="/redesign/tools"
            className={`transition-colors ${
              isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"
            }`}
          >
            Tools Directory
          </Link>
          <Link
            href="/redesign#pricing"
            className={`transition-colors ${
              isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/redesign#proof"
            className={`transition-colors ${
              isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"
            }`}
          >
            Evidence Review
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              isLight
                ? "border-slate-200 text-slate-700 hover:bg-slate-100"
                : "border-slate-800 text-slate-300 hover:bg-slate-800/80"
            }`}
            aria-label={`Switch to ${isLight ? "Dark" : "Light"} theme`}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Sign In / Enter Workspace */}
          {pathname === "/redesign/login" ? (
            <Link
              href="/redesign"
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                isLight ? "text-slate-700 hover:bg-slate-100" : "text-slate-200 hover:bg-slate-800"
              }`}
            >
              Back to Home
            </Link>
          ) : (
            <Link
              href="/redesign/login"
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                isLight ? "text-slate-700 hover:bg-slate-100" : "text-slate-200 hover:bg-slate-800"
              }`}
            >
              Sign In
            </Link>
          )}

          <Link
            href="/redesign/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
          >
            Launch Workspace <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}
