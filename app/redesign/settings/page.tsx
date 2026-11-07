"use client";

import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  Settings,
  Shield,
  Sparkles,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export default function RedesignSettingsPage() {
  const { user, resetToBaseline, theme } = useRedesignStore();
  const isLight = theme === "light";

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="pb-4 border-b border-inherit">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-1">
            <Settings size={14} /> Account &amp; Billing Preferences
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
            Settings &amp; Security
          </h1>
          <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            Manage subscription status, generation credits, data residency, and evaluation state.
          </p>
        </div>

        {/* Subscription & Credits Card */}
        <div
          className="rounded-2xl border p-6 transition-colors"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          <div
            className="flex items-center justify-between pb-4 border-b"
            style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: isLight ? "#FEF3C7" : "#1C2E24",
                  color: "#F59E0B",
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold font-display tracking-tight">Active Access Pass</h2>
                <p className={`text-xs ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                  Fixed-term verified demo license (no recurring subscription)
                </p>
              </div>
            </div>
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
              style={{
                background: isLight ? "#FEF3C7" : "#1C2E24",
                borderColor: "#F59E0B",
                color: isLight ? "#92400E" : "#FDE68A",
              }}
            >
              {user.plan} Tier
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <div
              className="p-4 rounded-xl border text-xs space-y-1 transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Generation Credits</span>
              <p className="text-2xl font-bold font-display" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                {user.creditsRemaining} Remaining
              </p>
              <p className={`text-[11px] ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                1 credit per tailored resume run
              </p>
            </div>

            <div
              className="p-4 rounded-xl border text-xs space-y-1 transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Expiration Date</span>
              <p className="text-lg font-bold font-display text-inherit font-mono">
                {user.planExpiry}
              </p>
              <p className={`text-[11px] ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                Guaranteed non-expiring demo grant
              </p>
            </div>

            <div
              className="p-4 rounded-xl border text-xs space-y-1 transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Export Allowance</span>
              <p className="text-lg font-bold font-display text-[#059669]">Unlimited</p>
              <p className={`text-[11px] ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                PDF, DOCX, &amp; text exports
              </p>
            </div>
          </div>
        </div>

        {/* Security & Data Privacy */}
        <div
          className="rounded-2xl border p-6 transition-colors"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          <div
            className="flex items-center gap-3 pb-4 border-b"
            style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: isLight ? "#E8EEF8" : "#132A4A",
                color: isLight ? "#123B7A" : "#9FC3F2",
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold font-display tracking-tight">Data Privacy &amp; Integrity</h2>
              <p className={`text-xs ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                RoleSharp never shares candidate records with third-party model trainers.
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            <div
              className="flex items-center justify-between p-3 rounded-xl border transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-[#059669]" />
                <span>Zero telemetry leakage outside candidate-approved actions</span>
              </div>
              <span className="font-mono text-[#059669] font-bold">Enforced</span>
            </div>

            <div
              className="flex items-center justify-between p-3 rounded-xl border transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-[#059669]" />
                <span>Pre-generation GOV.UK verification lock before credit consumption</span>
              </div>
              <span className="font-mono text-[#059669] font-bold">Active</span>
            </div>
          </div>
        </div>

        {/* Demo Data Reset Action */}
        <div
          className="rounded-2xl border p-6 transition-colors"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-display tracking-tight">Reset Evaluator State</h2>
              <p className={`text-xs mt-0.5 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                Restores Avery Chen&apos;s baseline dataset (12 credits, 4 resumes, 6 applications).
              </p>
            </div>

            <button
              onClick={() => {
                resetToBaseline();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold self-start sm:self-center transition-all hover:scale-[1.02]"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
                color: isLight ? "#10243E" : "#EFF5FF",
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Demo Baseline</span>
            </button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
