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
        isLight ? "bg-[#F3F2EE] text-[#10243E]" : "bg-[#061426] text-[#EFF5FF]"
      }`}
    >
      <PublicNav />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div
          className="w-full max-w-md rounded-2xl border p-8 shadow-2xl transition-all"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          {/* Brand & Heading */}
          <div className="text-center mb-8">
            <div
              className="w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-3 shadow-sm"
              style={{
                background: isLight ? "#E8EEF8" : "#132A4A",
                borderColor: isLight ? "#BFDBFE" : "#234168",
              }}
            >
              <RoleSharpMark />
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight">
              Sign in to RoleSharp
            </h1>
            <p className={`text-xs mt-1 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
              Evidence-based career workspace
            </p>
          </div>

          {/* 1-Click Demo Candidate Action */}
          <div className="mb-6">
            <button
              onClick={handleDemoSignIn}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.01] group"
              style={{
                background: isLight ? "#EFF6FF" : "#112642",
                borderColor: isLight ? "#123B7A" : "#5B9BFF",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg font-bold flex items-center justify-center shrink-0 shadow-sm text-sm"
                  style={{
                    background: isLight ? "#123B7A" : "#9FC3F2",
                    color: isLight ? "#FFFFFF" : "#071A33",
                  }}
                >
                  AC
                </div>
                <div>
                  <div
                    className="flex items-center gap-1.5 font-bold text-sm"
                    style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                  >
                    <UserCheck size={15} /> Continue as {user.name}
                  </div>
                  <p className={`text-xs ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                    {user.targetTitle} • {user.creditsRemaining} credits
                  </p>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
                style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
              />
            </button>
            <p className="text-[11px] text-center opacity-75 mt-2">
              Recommended for evaluation: Loads full demo dataset with 4 resumes &amp; 6 applications.
            </p>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }} />
            </div>
            <span
              className="relative px-3 text-[11px] font-mono uppercase tracking-wider"
              style={{
                background: isLight ? "#FBFAF9" : "#0C213A",
                color: isLight ? "#52647A" : "#9FB0C7",
              }}
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
              <label className="block text-xs font-semibold mb-1 opacity-75">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: isLight ? "#FFFFFF" : "#112642",
                  borderColor: isLight ? "#E5DFD5" : "#1B3654",
                  color: isLight ? "#10243E" : "#EFF5FF",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-75">
                Password
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: isLight ? "#FFFFFF" : "#112642",
                  borderColor: isLight ? "#E5DFD5" : "#1B3654",
                  color: isLight ? "#10243E" : "#EFF5FF",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
              }}
            >
              Enter Workspace
            </button>
          </form>

          {/* Security guarantee */}
          <div
            className="mt-6 pt-4 border-t flex items-center justify-center gap-2 text-[11px] opacity-75 font-mono"
            style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
          >
            <Shield size={13} className="text-[#059669]" />
            <span>Encrypted local session • Zero tracking telemetry</span>
          </div>
        </div>
      </main>
    </div>
  );
}
