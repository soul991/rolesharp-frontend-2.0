"use client";

import { useRouter } from "next/navigation";
import { PublicNav } from "@/components/redesign/PublicNav";
import { useRedesignStore } from "@/lib/redesign-store";
import { ArrowRight, UserCheck, Shield } from "lucide-react";
import RoleSharpMark from "@/components/RoleSharpMark";

export default function RedesignLoginPage() {
  const router = useRouter();
  const { user, theme } = useRedesignStore();
  const isLight = theme === "light";

  const handleDemoSignIn = () => {
    router.push("/redesign/dashboard");
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isLight ? "bg-[#F3F2EE] text-[#10243E]" : "bg-[#05080F] text-[#F3F4F6]"
      }`}
    >
      <PublicNav />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div
          className={`w-full max-w-md rounded-2xl border p-8 shadow-xl transition-colors ${
            isLight
              ? "bg-[#FAF9F6] border-[#E2E0D8] text-[#10243E]"
              : "bg-[#0A1220] border-[#182334] text-white"
          }`}
        >
          {/* Brand & Heading */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <RoleSharpMark />
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight">
              Sign in to RoleSharp
            </h1>
            <p className={`text-xs mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Evidence-based career workspace
            </p>
          </div>

          {/* 1-Click Demo Candidate Action */}
          <div className="mb-6">
            <button
              onClick={handleDemoSignIn}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                  AC
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-blue-400 group-hover:text-blue-300">
                    <UserCheck size={15} /> Continue as {user.name}
                  </div>
                  <p className="text-xs text-slate-400">
                    {user.targetTitle} • {user.creditsRemaining} credits
                  </p>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="text-blue-400 group-hover:translate-x-1 transition-transform"
              />
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Recommended for evaluation: Loads full demo dataset with 4 resumes &amp; 6 applications.
            </p>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-inherit" />
            </div>
            <span
              className={`relative px-3 text-[11px] font-mono uppercase tracking-wider ${
                isLight ? "bg-[#FAF9F6] text-slate-500" : "bg-[#0A1220] text-slate-500"
              }`}
            >
              or sign in with email
            </span>
          </div>

          {/* Standard Form Mock */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDemoSignIn();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-900"
                    : "bg-slate-900/60 border-slate-800 text-white"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                Password
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-900"
                    : "bg-slate-900/60 border-slate-800 text-white"
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              Enter Workspace
            </button>
          </form>

          {/* Security guarantee */}
          <div className="mt-6 pt-4 border-t border-inherit flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
            <Shield size={13} className="text-emerald-500" />
            <span>Encrypted local session • Zero tracking telemetry</span>
          </div>
        </div>
      </main>
    </div>
  );
}
