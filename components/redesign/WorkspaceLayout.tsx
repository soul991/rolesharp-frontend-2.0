"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RoleSharpMark from "@/components/RoleSharpMark";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  Wrench,
  User,
  Settings,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/redesign/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Resume Studio", href: "/redesign/resumes", icon: FileText, badge: "94 ATS" },
  { label: "Jobs & Fit", href: "/redesign/jobs", icon: Briefcase, badge: "3 New" },
  { label: "Applications Tracker", href: "/redesign/applications", icon: Layers, badge: "4 Active" },
  { label: "Tool Workspaces", href: "/redesign/tools", icon: Wrench, badge: "6 Hubs" },
  { label: "Career Profile", href: "/redesign/profile", icon: User },
  { label: "Settings & Billing", href: "/redesign/settings", icon: Settings },
];

export function WorkspaceLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, theme, toggleTheme, resetToBaseline } = useRedesignStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLight = theme === "light";

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    if (item.href === "/redesign/resumes" && pathname === "/redesign/review") return true;
    return pathname.startsWith(item.href);
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-200 ${
        isLight ? "bg-[#F3F2EE] text-[#10243E]" : "bg-[#05080F] text-[#F3F4F6]"
      }`}
    >
      {/* =========================================================================
          DESKTOP PERSISTENT LEFT SIDEBAR (Commit 0243b00 restoration)
          ========================================================================= */}
      <aside
        className={`hidden lg:flex flex-col w-64 shrink-0 border-r transition-colors duration-200 sticky top-0 h-screen ${
          isLight
            ? "bg-[#FAF9F6] border-[#E5E3DC] text-[#10243E]"
            : "bg-[#0A1220] border-[#182334] text-white"
        }`}
      >
        {/* Brand Lockup */}
        <div className="p-4 border-b border-inherit flex items-center justify-between">
          <Link href="/redesign/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-blue-600/10 border border-blue-500/20 group-hover:scale-105 transition-transform">
              <RoleSharpMark />
            </div>
            <span className="font-bold text-lg tracking-tight font-display">
              <span className="text-blue-500">R</span>ole<span className="text-blue-400">Sharp</span>
            </span>
          </Link>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
              isLight ? "bg-slate-200/80 text-slate-700" : "bg-blue-950 text-blue-300 border border-blue-800/40"
            }`}
          >
            v2.0
          </span>
        </div>

        {/* Candidate User Card (Avery Chen) */}
        <div className="p-3 mx-3 my-3 rounded-xl border border-inherit bg-blue-500/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
              AC
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate leading-tight">{user.name}</p>
              <p className={`text-xs truncate ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                {user.targetTitle}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-inherit flex items-center justify-between text-xs">
            <span className={`flex items-center gap-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              <Sparkles size={12} className="text-amber-500" />
              Credits
            </span>
            <span className="font-mono font-semibold text-blue-500">
              {user.creditsRemaining} remaining
            </span>
          </div>
        </div>

        {/* Labeled Primary Destinations */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto" aria-label="Primary Navigation">
          <p
            className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Workspace
          </p>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
                  active
                    ? isLight
                      ? "bg-blue-600 text-white shadow-sm font-semibold"
                      : "bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    size={17}
                    className={
                      active
                        ? isLight
                          ? "text-white"
                          : "text-blue-400"
                        : isLight
                        ? "text-slate-500 group-hover:text-slate-700"
                        : "text-slate-400 group-hover:text-slate-200"
                    }
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.5 rounded font-medium ${
                      active
                        ? isLight
                          ? "bg-blue-700 text-white"
                          : "bg-blue-900 text-blue-200"
                        : isLight
                        ? "bg-slate-200 text-slate-700"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Utility Controls */}
        <div className="p-3 border-t border-inherit space-y-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isLight
                ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <span className="flex items-center gap-2">
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
              <span>Appearance</span>
            </span>
            <span className="font-mono uppercase text-[10px] font-semibold">
              {isLight ? "Warm Light" : "Dark"}
            </span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetToBaseline}
            title="Reset demo data to baseline"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isLight
                ? "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>

          {/* Sign Out */}
          <Link
            href="/redesign"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isLight
                ? "text-rose-600 hover:bg-rose-50"
                : "text-rose-400 hover:bg-rose-950/30"
            }`}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE TOP BAR (< 1024px)
          ========================================================================= */}
      <header
        className={`lg:hidden sticky top-0 z-40 w-full border-b flex items-center justify-between px-4 h-14 ${
          isLight ? "bg-[#FAF9F6] border-[#E5E3DC]" : "bg-[#0A1220] border-[#182334]"
        }`}
      >
        <Link href="/redesign/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-blue-600/10 border border-blue-500/20">
            <RoleSharpMark />
          </div>
          <span className="font-bold text-base tracking-tight font-display">
            <span className="text-blue-500">R</span>oleSharp
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
              isLight ? "bg-blue-100 text-blue-800" : "bg-blue-950 text-blue-300"
            }`}
          >
            {user.creditsRemaining} credits
          </span>
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg border ${
              isLight ? "border-slate-200 text-slate-700" : "border-slate-800 text-slate-300"
            }`}
            aria-label="Toggle theme"
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-lg border ${
              isLight ? "border-slate-200 text-slate-700" : "border-slate-800 text-slate-300"
            }`}
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE DRAWER MODAL
          ========================================================================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm flex flex-col justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`w-full max-h-[85vh] overflow-y-auto rounded-t-2xl p-5 border-t ${
              isLight ? "bg-[#FAF9F6] border-[#E5E3DC]" : "bg-[#0A1220] border-[#182334]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-inherit">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                  AC
                </div>
                <div>
                  <p className="font-bold text-sm">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.targetTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                      active
                        ? "bg-blue-600 text-white font-semibold"
                        : isLight
                        ? "text-slate-700 hover:bg-slate-100"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/20">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-inherit flex items-center justify-between">
              <button
                onClick={() => {
                  resetToBaseline();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-400 flex items-center gap-1.5"
              >
                <RotateCcw size={13} /> Reset Demo
              </button>
              <Link
                href="/redesign"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-rose-400 flex items-center gap-1.5 font-medium"
              >
                <LogOut size={13} /> Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MAIN WORKSPACE CONTENT CANVAS
          ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0 overflow-x-hidden">
        {children}
      </main>

      {/* =========================================================================
          MOBILE BOTTOM DOCK NAVIGATION (< 1024px)
          ========================================================================= */}
      <nav
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-around h-14 backdrop-blur-md ${
          isLight ? "bg-[#FAF9F6]/95 border-[#E5E3DC]" : "bg-[#0A1220]/95 border-[#182334]"
        }`}
        aria-label="Mobile Navigation Dock"
      >
        {[
          { label: "Dashboard", href: "/redesign/dashboard", icon: LayoutDashboard },
          { label: "Resumes", href: "/redesign/resumes", icon: FileText },
          { label: "Applications", href: "/redesign/applications", icon: Layers },
          { label: "Tools", href: "/redesign/tools", icon: Wrench },
        ].map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition-colors ${
                active
                  ? "text-blue-500 font-semibold"
                  : isLight
                  ? "text-slate-500 hover:text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon size={18} className="mb-0.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
