"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Plus,
  Loader2,
  ChevronLeft,
  Edit2,
  Check,
} from "lucide-react";

export default function RedesignReviewGatePage() {
  const { user, deductCredit, addGeneratedResume, theme } = useRedesignStore();
  const isLight = theme === "light";

  const [targetRole, setTargetRole] = useState("Senior Product Manager");
  const targetCompany = "Lattice Works";
  const [skills, setSkills] = useState([
    "Roadmapping",
    "SQL",
    "User research",
    "Experiment design",
    "Product analytics",
    "Onboarding Architecture",
    "A/B Testing",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);

  const [bullets, setBullets] = useState([
    "Led onboarding experiments improving activation 12% across two releases through frictionless signup steps.",
    "Interviewed 24 customers about trial friction, converting research into high-impact feature specifications.",
    "Partnered with engineering and design on quarterly roadmap priorities, delivering 100% of P0 commitments on time.",
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [bulletDraft, setBulletDraft] = useState("");

  // Generation Modal States
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setShowSkillInput(false);
    }
  };

  const handleStartGeneration = () => {
    if (user.creditsRemaining <= 0) {
      return;
    }

    setIsGenerating(true);
    setGenStep(1);

    setTimeout(() => {
      setGenStep(2);
      setTimeout(() => {
        setGenStep(3);
        setTimeout(() => {
          setGenStep(4);
          deductCredit();

          // Add generated resume
          addGeneratedResume({
            id: "resume-avery-tailored-lattice",
            title: `Tailored — ${targetRole} @ ${targetCompany}`,
            type: "tailored",
            targetRole,
            targetCompany,
            atsScore: 88,
            template: "signal",
            lastModified: new Date().toISOString(),
            status: "complete",
            summary: `Senior Product Manager candidate with deep specialization in activation funnels, trial-to-paid conversion experimentation, and qualitative user research. Built to meet ${targetCompany}'s onboarding roadmap mandates.`,
            skills,
            honestGap: {
              requiredSkill: "Kafka Event Stream Telemetry",
              explanation: `${targetCompany} requires real-time Kafka event pipeline observability; Avery brings strong relational SQL and event tracking (Mixpanel/PostHog) but no direct Kafka cluster instrumentation experience.`,
              status: "unsupported_gap",
            },
            experience: [
              {
                role: "Product Manager (Onboarding & Activation)",
                company: "Fieldnote Software",
                location: "Seattle, WA",
                startDate: "2021-09",
                endDate: "Present",
                bullets: [
                  ...bullets,
                  "Instrumented client onboarding journey analytics capturing 14 distinct funnel checkpoints.",
                ],
              },
            ],
          });

          setIsGenerating(false);
          setIsDone(true);
        }, 800);
      }, 800);
    }, 700);
  };

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
        {/* Breadcrumb Back */}
        <Link
          href="/redesign/resumes"
          className="inline-flex items-center gap-2 text-xs font-semibold transition-colors"
          style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
        >
          <ChevronLeft size={16} /> Return to Resume Studio Canvas
        </Link>

        {/* Header */}
        <div
          className="pb-5 border-b transition-colors"
          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
        >
          <div
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5"
            style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
          >
            <ShieldCheck size={14} />
            <span>Pre-Generation Review Gate · Parameter Verification</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Review Tailored Resume Before Generation
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
            Confirm target role parameters, skills, and bullet evidence before committing 1 generation credit.
          </p>
        </div>

        {/* Check Answers Table Pattern */}
        <div
          className="rounded-2xl border divide-y transition-colors overflow-hidden"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
          }}
        >
          {/* Target Role & Company */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div
              className="w-48 shrink-0 text-xs font-bold uppercase tracking-wider"
              style={{ color: isLight ? "#52647A" : "#9FB0C7" }}
            >
              Target Position
            </div>
            <div className="flex-1 text-sm font-semibold" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
              {targetRole}{" "}
              <span className="font-normal" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                at
              </span>{" "}
              <span style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>{targetCompany}</span>
            </div>
            <button
              onClick={() => {
                setTargetRole((prev) => (prev.includes("Lead") ? "Senior Product Manager" : "Lead Product Manager"));
              }}
              className="text-xs font-semibold hover:underline shrink-0"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              Switch Role Variant
            </button>
          </div>

          {/* Hard Skills & Competencies */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div
              className="w-48 shrink-0 text-xs font-bold uppercase tracking-wider mt-1"
              style={{ color: isLight ? "#52647A" : "#9FB0C7" }}
            >
              Skills &amp; Keywords
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg border font-medium"
                    style={{
                      background: isLight ? "#FFFFFF" : "#112642",
                      borderColor: isLight ? "#E2DDD4" : "#1B3654",
                      color: isLight ? "#10243E" : "#EFF5FF",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {showSkillInput ? (
                <form onSubmit={handleAddSkill} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="e.g. Distributed Systems"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none"
                    style={{
                      background: isLight ? "#FFFFFF" : "#112642",
                      borderColor: isLight ? "#D5DFEA" : "#1B3654",
                      color: isLight ? "#10243E" : "#EFF5FF",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg text-white text-xs font-bold"
                    style={{ background: isLight ? "#123B7A" : "#9FC3F2", color: isLight ? "#FFFFFF" : "#071A33" }}
                  >
                    Add
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSkillInput(true)}
                  className="text-xs font-semibold hover:underline flex items-center gap-1 mt-1"
                  style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                >
                  <Plus size={13} /> Add skill
                </button>
              )}
            </div>
            <span className="text-xs shrink-0" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              {skills.length} verified
            </span>
          </div>

          {/* Honest Gap Flagged */}
          <div
            className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-t-2"
            style={{
              background: isLight ? "#FFF7E6" : "#241D12",
              borderTopColor: "#E3A737",
              color: isLight ? "#854600" : "#FDE68A",
            }}
          >
            <div className="w-48 shrink-0 text-xs font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5 text-inherit">
              <AlertTriangle size={14} />
              <span>Transparent Gap</span>
            </div>
            <div className="flex-1 text-xs leading-relaxed space-y-1">
              <span className="font-bold text-sm block">Kafka Event Stream Telemetry</span>
              <p className="opacity-90">
                Lattice Works mandates Kafka pipeline familiarity. Avery brings SQL and PostHog metrics, but has no direct Kafka cluster experience. This gap will be flagged honestly in the application dossier without falsified claims.
              </p>
            </div>
            <span
              className="text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shrink-0"
              style={{
                background: isLight ? "#FFEACC" : "#3D2B16",
                color: isLight ? "#854600" : "#F6C75B",
              }}
            >
              Honest Flag
            </span>
          </div>

          {/* 3 Experience Bullets */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div
              className="w-48 shrink-0 text-xs font-bold uppercase tracking-wider mt-1"
              style={{ color: isLight ? "#52647A" : "#9FB0C7" }}
            >
              Key Bullets to Tailor
            </div>
            <div className="flex-1 space-y-3">
              {bullets.map((b, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border text-xs leading-relaxed transition-colors"
                  style={{
                    background: isLight ? "#FFFFFF" : "#112642",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                >
                  {editingIndex === i ? (
                    <div className="space-y-2">
                      <textarea
                        value={bulletDraft}
                        onChange={(e) => setBulletDraft(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border focus:outline-none"
                        style={{
                          background: isLight ? "#F8F7F4" : "#0C213A",
                          borderColor: isLight ? "#123B7A" : "#9FC3F2",
                          color: isLight ? "#10243E" : "#EFF5FF",
                        }}
                        rows={3}
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const next = [...bullets];
                            next[i] = bulletDraft;
                            setBullets(next);
                            setEditingIndex(null);
                          }}
                          className="px-3 py-1 rounded text-xs font-semibold flex items-center gap-1"
                          style={{
                            background: isLight ? "#123B7A" : "#9FC3F2",
                            color: isLight ? "#FFFFFF" : "#071A33",
                          }}
                        >
                          <Check size={12} /> Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="px-3 py-1 rounded border text-xs font-semibold"
                          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <span>{b}</span>
                      <button
                        onClick={() => {
                          setEditingIndex(i);
                          setBulletDraft(b);
                        }}
                        className="opacity-70 hover:opacity-100 transition-opacity p-1"
                        style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                        title="Edit bullet"
                      >
                        <Edit2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commitment & Generation Action Bar */}
        <div
          className="p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
          }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
              Commit 1 Generation Credit
            </p>
            <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              Current balance:{" "}
              <span className="font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                {user.creditsRemaining} credits
              </span>{" "}
              · Will deduct to {Math.max(0, user.creditsRemaining - 1)} upon generation completion.
            </p>
          </div>

          <button
            onClick={handleStartGeneration}
            disabled={user.creditsRemaining <= 0 || isGenerating}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all hover:translate-y-[-1px] disabled:opacity-50"
            style={{
              background: isLight ? "#123B7A" : "#9FC3F2",
              color: isLight ? "#FFFFFF" : "#071A33",
            }}
          >
            <Sparkles size={16} />
            <span>Tailor Resume &amp; Deduct 1 Credit</span>
          </button>
        </div>

        {/* =========================================================================
            SYNTHESIS PROGRESS SIMULATION MODAL
            ========================================================================= */}
        {isGenerating && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className="max-w-md w-full rounded-2xl border p-6 text-center space-y-5 shadow-2xl"
              style={{
                background: isLight ? "#FAF9F6" : "#0C213A",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
                style={{
                  background: isLight ? "#E8EEF8" : "#132A4A",
                  color: isLight ? "#123B7A" : "#9FC3F2",
                }}
              >
                <Loader2 size={24} className="animate-spin" />
              </div>

              <div>
                <h3
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                >
                  Synthesizing Tailored Profile
                </h3>
                <p className="text-xs mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  Aligning candidate evidence against Lattice Works role mandates…
                </p>
              </div>

              <div className="space-y-2 text-left text-xs">
                {[
                  "1. Parsing target company requirement telemetry",
                  "2. Cross-referencing Avery Chen verified impact evidence",
                  "3. Flagging transparent unsupported skill gaps",
                  "4. Formatting final ATS-safe vector document",
                ].map((stepText, idx) => {
                  const stepNum = idx + 1;
                  const isPast = genStep > stepNum;
                  const isCurrent = genStep === stepNum;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors"
                      style={{
                        background: isCurrent
                          ? isLight
                            ? "#E8EEF8"
                            : "#132A4A"
                          : isLight
                          ? "#FFFFFF"
                          : "#112642",
                        borderColor: isCurrent
                          ? isLight
                            ? "#123B7A"
                            : "#9FC3F2"
                          : isLight
                          ? "#E2DDD4"
                          : "#1B3654",
                      }}
                    >
                      {isPast ? (
                        <Check size={14} className="text-[#059669] shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 size={14} className="animate-spin shrink-0" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }} />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-500 shrink-0" />
                      )}
                      <span className={isCurrent ? "font-bold" : "opacity-80"}>
                        {stepText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            GENERATION COMPLETED CONFIRMATION MODAL
            ========================================================================= */}
        {isDone && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className="max-w-md w-full rounded-2xl border p-6 text-center space-y-5 shadow-2xl"
              style={{
                background: isLight ? "#FAF9F6" : "#0C213A",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-[#059669] flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>

              <div>
                <h3
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                >
                  Tailored Resume Generated
                </h3>
                <p className="text-xs mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  1 generation credit deducted. Updated credit balance: {user.creditsRemaining}.
                </p>
              </div>

              <div
                className="p-4 rounded-xl border text-xs text-left space-y-1"
                style={{
                  background: isLight ? "#FFFFFF" : "#112642",
                  borderColor: isLight ? "#E2DDD4" : "#1B3654",
                }}
              >
                <p className="font-bold">Tailored — Senior Product Manager @ Lattice Works</p>
                <p className="opacity-80">ATS Readiness: 88% • Signal Template • Honest Gap Preserved</p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/redesign/resumes"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all text-center"
                  style={{
                    background: isLight ? "#123B7A" : "#9FC3F2",
                    color: isLight ? "#FFFFFF" : "#071A33",
                  }}
                >
                  Open in Resume Studio
                </Link>
                <Link
                  href="/redesign/applications"
                  className="flex-1 py-2.5 rounded-xl border text-xs font-semibold text-center transition-colors"
                  style={{
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                >
                  View in Applications
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
