"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
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
                bullets,
              },
            ],
          });

          setIsGenerating(false);
          setIsDone(true);
        }, 800);
      }, 900);
    }, 700);
  };

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/redesign/resumes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-500 transition-colors"
        >
          <ChevronLeft size={16} /> Return to Resume Studio Canvas
        </Link>

        {/* Header */}
        <div className="pb-4 border-b border-inherit">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-1">
            <ShieldCheck size={14} /> GOV.UK Check Answers Gate • Nothing Leaves Unseen
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
            Review Tailored Resume Before Generation
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            Confirm target role parameters, skills, and bullet evidence before committing 1 generation credit.
          </p>
        </div>

        {/* Check Answers Table Pattern */}
        <div
          className="rounded-2xl border divide-y transition-colors overflow-hidden"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          {/* Target Role & Company */}
          <div className="p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="w-48 shrink-0 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Target Position
            </div>
            <div className="flex-1 text-sm font-semibold">
              {targetRole} <span className="text-blue-500 font-normal">at</span> {targetCompany}
            </div>
            <button
              onClick={() => {
                setTargetRole((prev) => (prev.includes("Lead") ? "Senior Product Manager" : "Lead Product Manager"));
              }}
              className="text-xs font-semibold text-blue-500 hover:underline shrink-0"
            >
              Toggle Role Variant
            </button>
          </div>

          {/* Hard Skills & Competencies */}
          <div className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="w-48 shrink-0 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mt-1">
              Skills &amp; Keywords
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                      isLight
                        ? "bg-white border-slate-200 text-slate-800"
                        : "bg-slate-900 border-slate-800 text-slate-200"
                    }`}
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
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isLight
                        ? "bg-white border-slate-300 text-slate-900"
                        : "bg-slate-900 border-slate-800 text-white"
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSkillInput(true)}
                  className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1 mt-1"
                >
                  <Plus size={13} /> Add skill
                </button>
              )}
            </div>
            <span className="text-xs font-mono text-slate-500 shrink-0">
              {skills.length} verified
            </span>
          </div>

          {/* Honest Gap Flagged */}
          <div className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-amber-500/5">
            <div className="w-48 shrink-0 text-xs font-mono font-bold uppercase tracking-wider text-amber-500 mt-1 flex items-center gap-1.5">
              <AlertTriangle size={14} /> Unsupported Gap
            </div>
            <div className="flex-1 text-xs leading-relaxed space-y-1">
              <span className="font-bold font-mono text-amber-500">
                Kafka Event Stream Telemetry
              </span>
              <p className={isLight ? "text-slate-600" : "text-slate-400"}>
                Lattice Works mandates Kafka pipeline familiarity. Avery brings SQL and PostHog metrics, but has no direct Kafka cluster experience. This gap will be flagged honestly in the application dossier without falsified claims.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold shrink-0">
              Honest Flag
            </span>
          </div>

          {/* 3 Experience Bullets */}
          <div className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="w-48 shrink-0 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mt-1">
              Key Bullets to Tailor
            </div>
            <div className="flex-1 space-y-3">
              {bullets.map((b, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs leading-relaxed transition-colors ${
                    isLight ? "bg-white border-slate-200" : "bg-slate-900/50 border-slate-800"
                  }`}
                >
                  {editingIndex === i ? (
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        value={bulletDraft}
                        onChange={(e) => setBulletDraft(e.target.value)}
                        className={`w-full p-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-800 text-white"
                        }`}
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="px-2.5 py-1 rounded text-xs text-slate-400 hover:text-slate-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (bulletDraft.trim()) {
                              const updated = [...bullets];
                              updated[i] = bulletDraft.trim();
                              setBullets(updated);
                            }
                            setEditingIndex(null);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                        >
                          <Check size={12} /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className={isLight ? "text-slate-700" : "text-slate-300"}>{b}</span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingIndex(i);
                          setBulletDraft(b);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-blue-500 shrink-0"
                        title="Edit bullet"
                      >
                        <Edit2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-500 shrink-0">3 of 3 Approved</span>
          </div>

          {/* Credit Cost & Action Bar */}
          <div
            className="p-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              borderColor: isLight ? "#E5DFD5" : "#182C44",
              background: isLight ? "#F3F0EB" : "#0A182C",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono"
                style={{
                  background: isLight ? "#E8EEF8" : "#132A4A",
                  color: isLight ? "#123B7A" : "#9FC3F2",
                }}
              >
                1
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider font-mono">
                  Generation Cost: 1 Credit
                </p>
                <p className={`text-xs ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                  {user.creditsRemaining} credits available in Avery Chen&apos;s Premium account.
                </p>
              </div>
            </div>

            <button
              onClick={handleStartGeneration}
              disabled={isGenerating || user.creditsRemaining <= 0}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-50"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
              }}
            >
              <Sparkles size={16} />
              <span>Confirm &amp; Run Tailored Generation</span>
            </button>
          </div>
        </div>

        {/* Modal: Generation In-Progress */}
        {isGenerating && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className="w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-6"
              style={{
                background: isLight ? "#FBFAF9" : "#0C213A",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <div className="text-center space-y-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
                  style={{
                    background: isLight ? "#E8EEF8" : "#132A4A",
                    color: isLight ? "#123B7A" : "#9FC3F2",
                  }}
                >
                  <Loader2 size={24} className="animate-spin" />
                </div>
                <h3 className="text-lg font-bold font-display">Synthesizing Tailored Resume</h3>
                <p className={`text-xs ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                  Target: {targetRole} @ {targetCompany}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { step: 1, text: "Extracting verified metrics from master record" },
                  { step: 2, text: "Validating against 24 ATS parser heuristics" },
                  { step: 3, text: "Grounding bullet evidence without hallucination" },
                  { step: 4, text: "Compiling vector PDF and linking application" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    {genStep > item.step ? (
                      <CheckCircle2 size={16} className="text-[#059669] shrink-0" />
                    ) : genStep === item.step ? (
                      <Loader2 size={16} className="text-[#5B9BFF] animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span
                      className={
                        genStep >= item.step
                          ? "font-medium text-inherit"
                          : isLight
                          ? "text-[#52647A]"
                          : "text-[#9FB0C7]"
                      }
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Generation Complete Success */}
        {isDone && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className="w-full max-w-lg rounded-2xl border p-8 shadow-2xl space-y-6 text-center"
              style={{
                background: isLight ? "#FBFAF9" : "#0C213A",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-[#059669] flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#059669]">
                  Tailored Generation Verified
                </span>
                <h3 className="text-2xl font-bold font-display">Resume Successfully Tailored!</h3>
                <p className={`text-xs max-w-sm mx-auto ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                  Resume tailored for <span className="font-semibold text-inherit">{targetRole} @ {targetCompany}</span> with 88% ATS score and transparent Kafka telemetry notation.
                </p>
              </div>

              <div
                className="p-4 rounded-xl border flex items-center justify-around text-xs"
                style={{
                  background: isLight ? "#F3F0EB" : "#112642",
                  borderColor: isLight ? "#E5DFD5" : "#1B3654",
                }}
              >
                <div>
                  <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>ATS Readiness</span>
                  <p className="font-mono font-bold text-base" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>88%</p>
                </div>
                <div className="w-px h-8 bg-inherit" />
                <div>
                  <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Credits Left</span>
                  <p className="font-mono font-bold text-base text-[#F59E0B]">
                    {user.creditsRemaining}
                  </p>
                </div>
                <div className="w-px h-8 bg-inherit" />
                <div>
                  <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Target Match</span>
                  <p className="font-mono font-bold text-base text-[#059669]">High</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/redesign/resumes"
                  className="py-2.5 rounded-xl border font-semibold text-xs hover:bg-slate-500/10 transition-colors"
                  style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
                >
                  View Saved in Studio
                </Link>
                <Link
                  href="/redesign/applications"
                  className="py-2.5 rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                  style={{
                    background: isLight ? "#123B7A" : "#9FC3F2",
                    color: isLight ? "#FFFFFF" : "#071A33",
                  }}
                >
                  <span>Open Linked Application</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
