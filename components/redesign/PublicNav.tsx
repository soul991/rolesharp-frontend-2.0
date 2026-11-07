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
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b backdrop-blur-md ${
        isLight
          ? "bg-[#FBFAF9]/95 border-[#E5DFD5] text-[#10243E]"
          : "bg-[#061426]/95 border-[#182C44] text-[#EFF5FF]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/redesign" className="flex items-center gap-2.5 group">
          <div className={`w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform ${
            isLight ? "bg-[#123B7A]/5 border-[#123B7A]/20" : "bg-[#132A4A] border-[#234168]"
          }`}>
            <RoleSharpMark />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            <span className={isLight ? "text-[#123B7A]" : "text-[#5B9BFF]"}>R</span>ole<span className={isLight ? "text-[#3B82F6]" : "text-[#9FC3F2]"}>Sharp</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/redesign#features"
            className={`transition-colors ${
              isLight ? "text-[#52647A] hover:text-[#10243E]" : "text-[#9FB0C7] hover:text-white"
            }`}
          >
            Capabilities
          </Link>
          <Link
            href="/redesign/tools"
            className={`transition-colors ${
              isLight ? "text-[#52647A] hover:text-[#10243E]" : "text-[#9FB0C7] hover:text-white"
            }`}
          >
            Tools Directory
          </Link>
          <Link
            href="/redesign#pricing"
            className={`transition-colors ${
              isLight ? "text-[#52647A] hover:text-[#10243E]" : "text-[#9FB0C7] hover:text-white"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/redesign#proof"
            className={`transition-colors ${
              isLight ? "text-[#52647A] hover:text-[#10243E]" : "text-[#9FB0C7] hover:text-white"
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
                ? "border-[#E5DFD5] text-[#52647A] hover:bg-[#F3F0EB]"
                : "border-[#182C44] text-[#9FB0C7] hover:bg-[#0E2138]"
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
                isLight ? "text-[#52647A] hover:bg-[#F3F0EB]" : "text-[#9FB0C7] hover:bg-[#0E2138]"
              }`}
            >
              Back to Home
            </Link>
          ) : (
            <Link
              href="/redesign/login"
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                isLight ? "text-[#52647A] hover:bg-[#F3F0EB]" : "text-[#9FB0C7] hover:bg-[#0E2138]"
              }`}
            >
              Sign In
            </Link>
          )}

          <Link
            href="/redesign/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg shadow-md transition-all hover:scale-[1.02]"
            style={{
              background: isLight ? "#123B7A" : "#9FC3F2",
              color: isLight ? "#FFFFFF" : "#071A33",
            }}
          >
            <span>Launch Workspace</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
