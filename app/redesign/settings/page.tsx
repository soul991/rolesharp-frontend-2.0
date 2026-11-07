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
          className={`rounded-2xl border p-6 transition-colors ${
            isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-inherit">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold font-display">Active Access Pass</h2>
                <p className="text-xs text-slate-400">Fixed-term verified demo license (no recurring subscription)</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {user.plan} Tier
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <div
              className={`p-4 rounded-xl border text-xs space-y-1 ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/40 border-slate-800"
              }`}
            >
              <span className="text-slate-400">Generation Credits</span>
              <p className="text-2xl font-bold font-display text-blue-500">
                {user.creditsRemaining} Remaining
              </p>
              <p className="text-[11px] text-slate-500">1 credit per tailored resume run</p>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs space-y-1 ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/40 border-slate-800"
              }`}
            >
              <span className="text-slate-400">Expiration Date</span>
              <p className="text-lg font-bold font-display text-inherit font-mono">
                {user.planExpiry}
              </p>
              <p className="text-[11px] text-slate-500">Guaranteed non-expiring demo grant</p>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs space-y-1 ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/40 border-slate-800"
              }`}
            >
              <span className="text-slate-400">Export Allowance</span>
              <p className="text-lg font-bold font-display text-emerald-500">Unlimited</p>
              <p className="text-[11px] text-slate-500">PDF, DOCX, &amp; text exports</p>
            </div>
          </div>
        </div>

        {/* Security & Data Privacy */}
        <div
          className={`rounded-2xl border p-6 transition-colors ${
            isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
          }`}
        >
          <div className="flex items-center gap-3 pb-4 border-b border-inherit">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold font-display">Data Privacy &amp; Integrity</h2>
              <p className="text-xs text-slate-400">
                RoleSharp never shares candidate records with third-party model trainers.
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl border border-inherit bg-slate-500/5">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Zero telemetry leakage outside candidate-approved actions</span>
              </div>
              <span className="font-mono text-emerald-500 font-bold">Enforced</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-inherit bg-slate-500/5">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Pre-generation GOV.UK verification lock before credit consumption</span>
              </div>
              <span className="font-mono text-emerald-500 font-bold">Active</span>
            </div>
          </div>
        </div>

        {/* Demo Data Reset Action */}
        <div
          className={`rounded-2xl border p-6 transition-colors ${
            isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-display">Reset Evaluator State</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Restores Avery Chen&apos;s baseline dataset (12 credits, 4 resumes, 6 applications).
              </p>
            </div>

            <button
              onClick={() => {
                resetToBaseline();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 self-start sm:self-center transition-colors"
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
