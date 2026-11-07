"use client";

import Link from "next/link";
import { PublicNav } from "@/components/redesign/PublicNav";
import { LandingQuote } from "@/components/marketing/LandingQuote";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Briefcase,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function RedesignLandingPage() {
  const { theme } = useRedesignStore();
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isLight ? "bg-[#F3F2EE] text-[#10243E]" : "bg-[#05080F] text-[#F3F4F6]"
      }`}
    >
      <PublicNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-inherit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <Sparkles size={12} /> EVIDENCE-LED RESUME & CAREER WORKSPACE
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.12]">
                RoleSharp: One step ahead towards a successful career.
              </h1>

              <p
                className={`text-lg sm:text-xl max-w-2xl leading-relaxed ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}
              >
                Turn the work you have done into a resume that a hiring team can actually understand, verify, and remember. No inflated claims, no hallucinated bullet points.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/redesign/login"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md hover:shadow-blue-500/20 group"
                >
                  Enter Workspace as Demo Candidate
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/redesign/resumes"
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold border transition-all ${
                    isLight
                      ? "border-slate-300 text-slate-800 hover:bg-white hover:border-slate-400"
                      : "border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  Check my resume free
                </Link>
              </div>

              <p
                className={`text-xs font-mono tracking-tight flex items-center gap-2 ${
                  isLight ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <ShieldCheck size={14} className="text-emerald-500" />
                Start with a PDF, DOCX, or pasted text. No credit card required.
              </p>

              {/* Approved Animated Quote Component */}
              <div className="pt-4 border-t border-inherit">
                <LandingQuote compact />
              </div>
            </div>

            {/* Right Column: Live Evidence Review Stage */}
            <div className="lg:col-span-5">
              <div
                className={`rounded-2xl border p-6 shadow-2xl relative transition-colors ${
                  isLight
                    ? "bg-[#FAF9F6] border-[#E2E0D8] text-[#10243E]"
                    : "bg-[#0A1220] border-[#182334] text-white"
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-inherit">
                  <div className="flex items-center gap-2">
                    <FileSearch size={16} className="text-blue-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      Live Evidence Review
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                    Target: Senior PM
                  </span>
                </div>

                {/* Candidate Mock Resume Snapshot */}
                <div className="mt-4 p-4 rounded-xl border border-inherit bg-slate-500/5 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">Avery Chen</p>
                      <p className={isLight ? "text-slate-500" : "text-slate-400"}>
                        Senior Product Manager · Seattle, WA
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      94 ATS Score
                    </span>
                  </div>

                  <div className="pt-2 border-t border-inherit space-y-2">
                    <p className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">
                      Verified Experience
                    </p>
                    <p className="font-medium text-blue-500">
                      Product Manager · Fieldnote Software (2021 – Present)
                    </p>
                    <p className="p-2 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300">
                      &quot;Led onboarding experiments improving activation 12% across two major releases.&quot;
                    </p>
                  </div>
                </div>

                {/* Grounding Explanation */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-500">Supported by verified record</p>
                      <p className={isLight ? "text-slate-600" : "text-slate-400"}>
                        The 12% activation lift is concrete outcome evidence the hiring team can measure.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-500">Transparent Gap Flagged</p>
                      <p className={isLight ? "text-slate-600" : "text-slate-400"}>
                        Kafka Event Stream Telemetry required by Lattice Works; flagged honestly without falsification.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-inherit flex items-center justify-between">
                  <span className="text-xs text-slate-400">Tested against 24 ATS parsers</span>
                  <Link
                    href="/redesign/review"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Inspect review gate <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Proof Pillars */}
      <section id="proof" className="py-16 md:py-24 border-b border-inherit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-2">
              The Three Proof Pillars
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight">
              A career instrument—not an AI decoration.
            </h2>
            <p className={`mt-3 text-base ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Every screen makes the evidence source, the reasoning signal, and the next safe action clear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div
              className={`p-6 rounded-2xl border transition-colors ${
                isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
              }`}
            >
              <div className="text-xs font-mono font-bold text-blue-500 mb-3">01 • SOURCE</div>
              <h3 className="text-xl font-bold font-display mb-2">Read the record.</h3>
              <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Metrics, target role requirements, and original experience remain visible—not replaced with hallucinated buzzwords.
              </p>
              <div className="mt-4 pt-4 border-t border-inherit text-xs font-mono text-slate-400">
                ✓ 12 verified candidate impact metrics
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              className={`p-6 rounded-2xl border transition-colors ${
                isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
              }`}
            >
              <div className="text-xs font-mono font-bold text-blue-500 mb-3">02 • EXPLAIN</div>
              <h3 className="text-xl font-bold font-display mb-2">Test against the role.</h3>
              <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Scores name what matched, why it matters, and what skill gaps require honest acknowledgment before submission.
              </p>
              <div className="mt-4 pt-4 border-t border-inherit text-xs font-mono text-slate-400">
                ✓ Transparent % contribution breakdown
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              className={`p-6 rounded-2xl border transition-colors ${
                isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
              }`}
            >
              <div className="text-xs font-mono font-bold text-blue-500 mb-3">03 • CONTROL</div>
              <h3 className="text-xl font-bold font-display mb-2">Approve the action.</h3>
              <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Nothing leaves unseen. The GOV.UK Check Answers pattern guarantees every tailored bullet and skill is confirmed by you.
              </p>
              <div className="mt-4 pt-4 border-t border-inherit text-xs font-mono text-slate-400">
                ✓ Full review gate before credit deduction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Workspaces Preview */}
      <section id="features" className="py-16 md:py-24 border-b border-inherit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-2">
                Commit 17c50e4 Restored Workspaces
              </p>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Six Task-Oriented Workspaces
              </h2>
            </div>
            <Link
              href="/redesign/tools"
              className="mt-4 md:mt-0 text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
            >
              Browse all 22 tools <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "resume-studio",
                title: "Resume Studio",
                desc: "Build, check, and improve one resume on centered 680px paper canvas with real-time ATS scoring.",
                tools: "Builder, Manual Maker, ATS X-Ray, Resume Fixer, GitHub Import",
                icon: FileCheck,
                href: "/redesign/resumes",
              },
              {
                id: "jobs-fit",
                title: "Jobs & Fit",
                desc: "Find roles, compare requirements, and close real gaps with transparent match reasoning.",
                tools: "Resume Match, Skill Gap, Career Map, Job Clipper",
                icon: Briefcase,
                href: "/redesign/jobs",
              },
              {
                id: "applications",
                title: "Applications Tracker",
                desc: "Manage pipeline with 5-stage Kanban board, semantic accessible table, and linked resume versions.",
                tools: "Kanban Board, Semantic Table, Follow-Up Timeline, Application Dossier",
                icon: Layers,
                href: "/redesign/applications",
              },
              {
                id: "linkedin",
                title: "LinkedIn",
                desc: "Review your profile and improve its headline and story to match recruiter keyword searches.",
                tools: "LinkedIn Checker, Headline Generator, Career Summary",
                icon: Sparkles,
                href: "/redesign/tools/linkedin",
              },
              {
                id: "letters",
                title: "Letters",
                desc: "Write and review cover letters, resignation notes, and outreach grounded in your verified facts.",
                tools: "Cover Letter Generator, Letter Analyzer, Resignation Drafter",
                icon: FileSearch,
                href: "/redesign/tools/letters",
              },
              {
                id: "interview",
                title: "Interview Practice",
                desc: "Rehearse answers, prepare references, and construct 30-60-90 day executive plans.",
                tools: "Prep Simulator, Question Bank, Thank You Generator",
                icon: ShieldCheck,
                href: "/redesign/tools/interview-practice",
              },
            ].map((ws) => {
              const Icon = ws.icon;
              return (
                <Link
                  key={ws.id}
                  href={ws.href}
                  className={`p-6 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-lg group ${
                    isLight
                      ? "bg-[#FAF9F6] border-[#E2E0D8] hover:border-blue-400"
                      : "bg-[#0A1220] border-[#182334] hover:border-blue-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h3 className="text-lg font-bold font-display mb-1">{ws.title}</h3>
                  <p className={`text-xs mb-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                    {ws.desc}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500">
                    <span className="font-semibold text-blue-400">Tools:</span> {ws.tools}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing & Access Section */}
      <section id="pricing" className="py-16 md:py-24 border-b border-inherit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-2">
              Transparent Access Pass
            </p>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Fixed-Term Access • Never Auto-Renews
            </h2>
            <p className={`mt-3 text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Honest pricing with explicit credit allotments. Drops safely to Free at term end with zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div
              className={`p-8 rounded-2xl border transition-colors ${
                isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Starter Assessment
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-500/10 text-slate-400 font-bold">
                  $0
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2">Free Account</h3>
              <p className={`text-xs mb-6 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Basic ATS readability testing and single master resume storage.
              </p>
              <ul className="space-y-3 text-xs mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>1 Free tailored resume generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>ATS X-Ray parser hierarchy score</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Unlimited plain text exports</span>
                </li>
              </ul>
              <Link
                href="/redesign/resumes"
                className={`w-full inline-flex items-center justify-center py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                  isLight
                    ? "border-slate-300 text-slate-800 hover:bg-slate-100"
                    : "border-slate-700 text-slate-200 hover:bg-slate-800"
                }`}
              >
                Check Resume Free
              </Link>
            </div>

            {/* Premium Fixed-Term Tier */}
            <div
              className={`p-8 rounded-2xl border-2 border-blue-500 transition-colors relative ${
                isLight ? "bg-white shadow-xl" : "bg-[#0A1220] shadow-2xl"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500">
                  Full Candidate Suite
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold">
                  Fixed Term
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2">Premium Pass</h3>
              <p className={`text-xs mb-6 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Complete access pass with verified tailoring credits and unlimited exports.
              </p>
              <ul className="space-y-3 text-xs mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-blue-500" />
                  <span className="font-semibold">12 Candidate generation credits included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-blue-500" />
                  <span>Unlimited ATS-safe Vector PDF &amp; DOCX exports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-blue-500" />
                  <span>Full access to all 6 specialized tool workspaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-blue-500" />
                  <span>Never auto-renews • Drops safely to Free at term end</span>
                </li>
              </ul>
              <Link
                href="/redesign/login"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors shadow-sm"
              >
                Launch Demo Workspace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="py-12 border-t border-inherit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <span className="font-bold font-display text-sm tracking-tight text-inherit">
              Role<span className="text-blue-500">Sharp</span>
            </span>{" "}
            • One step ahead towards a successful career.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/redesign/dashboard" className="hover:text-blue-400 transition-colors">
              Candidate Workspace
            </Link>
            <Link href="/redesign/tools" className="hover:text-blue-400 transition-colors">
              Tools Directory
            </Link>
            <Link href="/redesign/settings" className="hover:text-blue-400 transition-colors">
              Account & Security
            </Link>
          </div>
          <div>© 2026 RoleSharp Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
