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
        <div
          className="pb-5 border-b transition-colors"
          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
        >
          <div
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5"
            style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
          >
            <Settings size={14} />
            <span>Account &amp; Billing Preferences</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Settings &amp; Security
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
            Manage subscription status, generation credits, data residency, and evaluation state.
          </p>
        </div>

        {/* Subscription & Credits Card */}
        <div
          className="rounded-2xl border p-6 sm:p-7 transition-colors"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
            boxShadow: isLight
              ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
              : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            className="flex items-center justify-between pb-4 border-b"
            style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: isLight ? "#FFF7E6" : "#241D12",
                  color: isLight ? "#854600" : "#F6C75B",
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h2
                  className="text-base font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                >
                  Active Access Pass
                </h2>
                <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  Fixed-term verified demo license (no recurring subscription)
                </p>
              </div>
            </div>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full border"
              style={{
                background: isLight ? "#FFF7E6" : "#241D12",
                borderColor: "#E3A737",
                color: isLight ? "#854600" : "#FDE68A",
              }}
            >
              {user.plan} Tier
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div
              className="p-4 rounded-xl border text-xs space-y-1 transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Generation Credits</span>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: isLight ? "#123B7A" : "#9FC3F2" }}
              >
                {user.creditsRemaining} Remaining
              </p>
              <p className="text-[11px]" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                1 credit per tailored resume run
              </p>
            </div>

            <div
              className="p-4 rounded-xl border text-xs space-y-1 transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Expiration Date</span>
              <p
                className="text-lg font-bold font-mono text-inherit"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {user.planExpiry}
              </p>
              <p className="text-[11px]" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                Guaranteed non-expiring demo grant
              </p>
            </div>

            <div
              className="p-4 rounded-xl border text-xs space-y-1 transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Export Allowance</span>
              <p className="text-lg font-bold text-[#059669]">Unlimited</p>
              <p className="text-[11px]" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                PDF, DOCX, &amp; text exports
              </p>
            </div>
          </div>
        </div>

        {/* Security & Data Privacy */}
        <div
          className="rounded-2xl border p-6 sm:p-7 transition-colors"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
            boxShadow: isLight
              ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
              : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            className="flex items-center gap-3 pb-4 border-b"
            style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}
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
              <h2
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
              >
                Data Privacy &amp; Model Grounding
              </h2>
              <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                RoleSharp architectural guarantees for personal career evidence
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-6 text-xs leading-relaxed">
            <div
              className="flex items-start gap-3 p-3.5 rounded-xl border transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <CheckCircle2 size={16} className="text-[#059669] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                  Zero Model Training on Candidate Evidence
                </span>
                <p className="mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  Your uploaded resumes, career metrics, and tailored variations are never used to train foundational AI models.
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 p-3.5 rounded-xl border transition-colors"
              style={{
                background: isLight ? "#FFFFFF" : "#112642",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <CheckCircle2 size={16} className="text-[#059669] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                  Honest Gap Disclosure Architecture
                </span>
                <p className="mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  We never falsify candidate experience. Missing keywords and skills are flagged transparently for your approval before credit commitment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Baseline Reset */}
        <div
          className="rounded-2xl border p-6 sm:p-7 transition-colors"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
              >
                Reset Demo Evaluation State
              </h2>
              <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                Restores the Avery Chen fictional candidate dataset, resetting credits to 11 and clearing modifications.
              </p>
            </div>

            <button
              onClick={resetToBaseline}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all hover:bg-slate-500/10 shrink-0 self-start sm:self-center"
              style={{
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
                color: isLight ? "#123B7A" : "#9FC3F2",
              }}
            >
              <RotateCcw size={14} />
              <span>Reset to Baseline</span>
            </button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
