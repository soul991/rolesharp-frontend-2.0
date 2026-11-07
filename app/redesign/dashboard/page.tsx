"use client";

import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  Calendar,
  FileText,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Check,
  Search,
} from "lucide-react";

export default function RedesignDashboardPage() {
  const { user, resumes, applications, jobMatches, theme } = useRedesignStore();
  const isLight = theme === "light";

  const activeApplications = applications.filter((a) => a.stage !== "closed");
  const interviewApp = applications.find((a) => a.stage === "interview");
  const draftResume = resumes.find((r) => r.id === "resume-avery-tailored-lattice") || resumes[1];

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* =========================================================================
            EXECUTIVE MASTHEAD
            ========================================================================= */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b transition-colors"
          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
        >
          <div>
            <p
              className="text-[11px] font-bold tracking-[0.12em] uppercase"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              Candidate Intelligence &amp; Tailoring Workspace
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight mt-1.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back, {user.name.split(" ")[0]}{" "}
              <span
                className="font-normal italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: isLight ? "#123B7A" : "#9FC3F2",
                }}
              >
                — Executive Desk
              </span>
            </h1>
            <p
              className="text-sm mt-1.5 font-normal"
              style={{ color: isLight ? "#52647A" : "#9FB0C7" }}
            >
              Targeting <strong className="font-semibold text-inherit">{user.targetTitle}</strong> at{" "}
              <span className="font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                {user.targetCompany}
              </span>{" "}
              · Seattle, WA · Next milestone: Round 2 technical case study
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/redesign/review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
                boxShadow: isLight
                  ? "0 4px 14px rgba(18, 59, 122, 0.2)"
                  : "0 4px 16px rgba(159, 195, 242, 0.2)",
              }}
            >
              <Sparkles size={16} />
              <span>Tailor Resume for Lattice Works</span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            UNIFIED EXECUTIVE METRICS RIBBON (Grounded, Restrained & Integrated)
            ========================================================================= */}
        <div
          className="rounded-xl border divide-y md:divide-y-0 md:divide-x grid grid-cols-2 md:grid-cols-4 transition-colors overflow-hidden"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
          }}
        >
          {/* Segment 1: Resumes */}
          <Link
            href="/redesign/resumes"
            className="p-5 hover:bg-slate-500/5 transition-colors group block"
          >
            <div className="flex items-center justify-between text-xs font-medium mb-1.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              <span>Resume Library</span>
              <FileText size={15} style={{ color: isLight ? "#123B7A" : "#9FC3F2" }} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {resumes.length}
              </span>
              <span className="text-xs font-semibold" style={{ color: isLight ? "#059669" : "#34D399" }}>
                94 Max ATS
              </span>
            </div>
            <p className="text-[11px] mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              1 Master · 2 Tailored · 1 Draft
            </p>
          </Link>

          {/* Segment 2: Active Pipeline */}
          <Link
            href="/redesign/applications"
            className="p-5 hover:bg-slate-500/5 transition-colors group block"
          >
            <div className="flex items-center justify-between text-xs font-medium mb-1.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              <span>Active Pipeline</span>
              <Layers size={15} style={{ color: isLight ? "#123B7A" : "#9FC3F2" }} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {activeApplications.length}
              </span>
              <span className="text-xs font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                1 Interview Scheduled
              </span>
            </div>
            <p className="text-[11px] mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              5 total recorded applications
            </p>
          </Link>

          {/* Segment 3: Curated Matches */}
          <Link
            href="/redesign/jobs"
            className="p-5 hover:bg-slate-500/5 transition-colors group block"
          >
            <div className="flex items-center justify-between text-xs font-medium mb-1.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              <span>Curated Matches</span>
              <Briefcase size={15} style={{ color: isLight ? "#123B7A" : "#9FC3F2" }} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {jobMatches.length}
              </span>
              <span className="text-xs font-semibold" style={{ color: isLight ? "#7C3AED" : "#C4B5FD" }}>
                89% Top Fit
              </span>
            </div>
            <p className="text-[11px] mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              Lattice Works · Northstar Labs
            </p>
          </Link>

          {/* Segment 4: Generation Balance */}
          <Link
            href="/redesign/settings"
            className="p-5 hover:bg-slate-500/5 transition-colors group block"
          >
            <div className="flex items-center justify-between text-xs font-medium mb-1.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              <span>Generation Pass</span>
              <Sparkles size={15} style={{ color: isLight ? "#D97706" : "#F6C75B" }} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {user.creditsRemaining}
              </span>
              <span className="text-xs font-semibold" style={{ color: isLight ? "#D97706" : "#F6C75B" }}>
                Credits Available
              </span>
            </div>
            <p className="text-[11px] mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              $29 Term Pass · Zero auto-renewal
            </p>
          </Link>
        </div>

        {/* =========================================================================
            PRIMARY EXECUTIVE FOCUS: 2-COLUMN BALANCED STAGE
            (Directly honoring RoleSharp's Approved Product Stage Craft)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: ACTIVE TAILORING DOSSIER (7 COLS) */}
          <div
            className="lg:col-span-7 rounded-2xl border transition-all overflow-hidden flex flex-col justify-between"
            style={{
              background: isLight ? "#FAF9F6" : "#0C213A",
              borderColor: isLight ? "#E2DDD4" : "#1B3654",
              boxShadow: isLight
                ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
                : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Stage Top Bar */}
            <div
              className="flex items-center justify-between px-6 py-3.5 border-b text-xs transition-colors"
              style={{
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
                background: isLight ? "#F3F0EB" : "#091B30",
              }}
            >
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck size={16} style={{ color: isLight ? "#123B7A" : "#9FC3F2" }} />
                <span style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                  Active Focus: Tailoring for Lattice Works
                </span>
                <span className="hidden sm:inline text-[11px]" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  · 1 Verified Evidence Bullet · 1 Honest Skill Note
                </span>
              </div>
              <span
                className="text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                style={{
                  background: isLight ? "#E8EEF8" : "#132A4A",
                  color: isLight ? "#123B7A" : "#9FC3F2",
                }}
              >
                88 ATS Score
              </span>
            </div>

            {/* Stage Body */}
            <div className="p-6 space-y-5">
              {/* Target Role & Scope */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b"
                style={{ borderColor: isLight ? "#EAE5DC" : "#163150" }}
              >
                <div>
                  <h3
                    className="text-lg font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                  >
                    Senior Product Manager
                  </h3>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                    Lattice Works · Seattle, WA · Hybrid
                  </p>
                </div>
                <span className="text-xs" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  Linked: {draftResume.title} ({draftResume.atsScore} ATS)
                </span>
              </div>

              {/* Verified Bullet Evidence */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                  Tailored Bullet Draft
                </p>
                <div
                  className="p-4 rounded-xl text-sm leading-relaxed border transition-colors"
                  style={{
                    background: isLight ? "#F0F4FA" : "#112642",
                    borderColor: isLight ? "#BFDBFE" : "#1E3A5F",
                    color: isLight ? "#10243E" : "#F4F7FB",
                  }}
                >
                  <p className="font-normal">
                    &ldquo;Architected distributed event-streaming telemetry pipeline for real-time order tracking across 14 services, reducing event drop rate to &lt;0.01%.&rdquo;
                  </p>
                </div>
              </div>

              {/* Two Evidence Annotations (Matching Approved Landing .evidence Pattern) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Supported Evidence Card */}
                <div
                  className="p-4 rounded-xl text-xs leading-relaxed border-t-2"
                  style={{
                    background: isLight ? "#EFF6FF" : "#0E243D",
                    borderTopColor: "#77AAF6",
                    color: isLight ? "#173153" : "#D5E5FF",
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                    <Check size={14} />
                    <span>Supported by resume evidence</span>
                  </div>
                  <p className="text-[11px] opacity-90">
                    The 12% lift is a concrete, verifiable outcome matching Lattice Works&apos; onboarding mandate.
                  </p>
                </div>

                {/* Transparent Gap Card */}
                <div
                  className="p-4 rounded-xl text-xs leading-relaxed border-t-2"
                  style={{
                    background: isLight ? "#FFF7E6" : "#241D12",
                    borderTopColor: "#E3A737",
                    color: isLight ? "#854600" : "#FDE68A",
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1" style={{ color: isLight ? "#854600" : "#F6C75B" }}>
                    <Search size={14} />
                    <span>Check before generation</span>
                  </div>
                  <p className="text-[11px] opacity-90">
                    Role asks for Kafka cluster admin; verified profile brings event ingestion. Flagged for candidate confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage Bottom Action Bar */}
            <div
              className="px-6 py-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              style={{
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
                background: isLight ? "#F3F0EB" : "#091B30",
              }}
            >
              <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                Requires 1 generation credit for finalized PDF export
              </span>
              <Link
                href="/redesign/review"
                className="inline-flex items-center gap-1.5 font-bold hover:underline"
                style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
              >
                <span>Proceed to Pre-Gen Review Gate</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* RIGHT: UPCOMING MILESTONES & CURATED MATCHES (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upcoming Interview Milestone */}
            {interviewApp && (
              <div
                className="rounded-2xl border p-6 transition-all"
                style={{
                  background: isLight ? "#FAF9F6" : "#0C213A",
                  borderColor: isLight ? "#E2DDD4" : "#1B3654",
                  boxShadow: isLight
                    ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
                    : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
                }}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: isLight ? "#D97706" : "#F6C75B" }}
                >
                  <Calendar size={15} />
                  <span>Upcoming Interview Milestone</span>
                </div>

                <h3
                  className="text-lg font-bold tracking-tight leading-snug"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                >
                  {interviewApp.roleTitle}
                </h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                  {interviewApp.companyName} · Seattle, WA
                </p>

                <div
                  className="my-4 p-3.5 rounded-xl text-xs leading-relaxed border"
                  style={{
                    background: isLight ? "#F0F4FA" : "#112642",
                    borderColor: isLight ? "#D5DFEA" : "#1B3654",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                >
                  <p className="font-semibold text-inherit">
                    Round 2 Technical Case Study with VP Product Marcus Vance
                  </p>
                  <p className="text-[11px] mt-1 font-mono opacity-80">
                    Tuesday, Nov 10 @ 2:00 PM PST · 45 mins
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t"
                  style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
                >
                  <span className="text-xs" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                    Linked: Master (94 ATS)
                  </span>
                  <Link
                    href="/redesign/tools/interview-practice"
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:translate-x-0.5"
                    style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                  >
                    <span>Launch Interview Rehearsal</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}

            {/* Curated Opportunities Quick Look */}
            <div
              className="rounded-2xl border p-6 transition-all"
              style={{
                background: isLight ? "#FAF9F6" : "#0C213A",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
                boxShadow: isLight
                  ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
                  : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                  style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                >
                  <Briefcase size={14} />
                  <span>Curated Match Spotlight</span>
                </div>
                <Link
                  href="/redesign/jobs"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                >
                  View all 3
                </Link>
              </div>

              <div className="space-y-3">
                {jobMatches.slice(0, 2).map((job) => (
                  <div
                    key={job.id}
                    className="p-3.5 rounded-xl border flex items-center justify-between text-xs transition-colors"
                    style={{
                      background: isLight ? "#FFFFFF" : "#112642",
                      borderColor: isLight ? "#E2DDD4" : "#1B3654",
                    }}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold truncate text-sm" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                        {job.roleTitle}
                      </p>
                      <p className="text-[11px] truncate mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                        {job.companyName} · {job.location}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                      style={{
                        background: isLight ? "#E8EEF8" : "#163150",
                        color: isLight ? "#123B7A" : "#9FC3F2",
                      }}
                    >
                      {job.matchScore}% Fit
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            APPLICATIONS REQUIRING ATTENTION (Interactive Pipeline Table)
            ========================================================================= */}
        <div
          className="rounded-2xl border p-6 transition-colors"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
            boxShadow: isLight
              ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
              : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Applications Requiring Attention
              </h2>
              <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                Tracked pipeline stages with linked resume versions and follow-up deadlines.
              </p>
            </div>
            <Link
              href="/redesign/applications"
              className="text-xs font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              <span>Open Pipeline Board</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="divide-y rounded-xl border overflow-hidden text-xs transition-colors"
            style={{
              borderColor: isLight ? "#E2DDD4" : "#182C44",
            }}
          >
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-500/5 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border"
                    style={{
                      background: isLight ? "#F3F0EB" : "#112642",
                      borderColor: isLight ? "#E2DDD4" : "#1B3654",
                      color: isLight ? "#10243E" : "#EFF5FF",
                    }}
                  >
                    {app.companyName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm tracking-tight truncate">
                        {app.companyName}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono uppercase text-[10px] font-semibold ${
                          app.stage === "interview"
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                            : app.stage === "applied"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                            : app.stage === "preparing"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {app.stage}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                      {app.roleTitle} · {app.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:self-center">
                  <div className="text-right">
                    <span className="font-mono font-bold text-xs">
                      {app.matchScore}% Match
                    </span>
                    <p className="text-[10px]" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                      Follow-up: {app.followUpDue}
                    </p>
                  </div>
                  <Link
                    href={`/redesign/applications?selected=${app.id}`}
                    className="p-2 rounded-lg border transition-transform hover:scale-105"
                    style={{
                      borderColor: isLight ? "#E2DDD4" : "#182C44",
                      background: isLight ? "#FFFFFF" : "#112642",
                      color: isLight ? "#123B7A" : "#9FC3F2",
                    }}
                    aria-label={`Open dossier for ${app.companyName}`}
                  >
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SPECIALIZED TOOL WORKSPACES (Restoring Commit 17c50e4)
            ========================================================================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Specialized Tool Workspaces
              </h2>
              <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                Six purpose-built task suites for the end-to-end career transition workflow.
              </p>
            </div>
            <Link
              href="/redesign/tools"
              className="text-xs font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              <span>View all 6 workspaces</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { title: "Resume Studio", path: "/redesign/resumes", icon: FileText, tag: "Canvas" },
              { title: "Jobs & Fit", path: "/redesign/jobs", icon: Briefcase, tag: "Matches" },
              { title: "LinkedIn", path: "/redesign/tools/linkedin", icon: Sparkles, tag: "Profile" },
              { title: "Letters", path: "/redesign/tools/letters", icon: FileText, tag: "Outreach" },
              { title: "Interview Practice", path: "/redesign/tools/interview-practice", icon: Clock, tag: "Rehearse" },
              { title: "Salary & Offers", path: "/redesign/tools/salary-offers", icon: CheckCircle2, tag: "Evaluate" },
            ].map((ws) => {
              const Icon = ws.icon;
              return (
                <Link
                  key={ws.title}
                  href={ws.path}
                  className="p-4 rounded-xl border text-center transition-all hover:-translate-y-0.5 group"
                  style={{
                    background: isLight ? "#FAF9F6" : "#0C213A",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2.5 transition-colors"
                    style={{
                      background: isLight ? "#E8EEF8" : "#132A4A",
                      color: isLight ? "#123B7A" : "#9FC3F2",
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <p
                    className="font-bold text-xs tracking-tight truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {ws.title}
                  </p>
                  <span className="text-[10px] mt-0.5 block font-medium" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                    {ws.tag}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
