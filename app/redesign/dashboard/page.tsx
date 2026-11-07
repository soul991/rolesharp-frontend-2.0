"use client";

import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  Calendar,
  AlertTriangle,
  FileText,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b transition-colors"
          style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
        >
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest font-semibold"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              Candidate Intelligence &amp; Tailoring Workspace
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Candidate Workspace
            </h1>
            <p className={`text-sm mt-1.5 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
              Targeting <strong className="font-semibold text-inherit">{user.targetTitle}</strong> at{" "}
              <span className="font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                {user.targetCompany}
              </span>{" "}
              · Seattle, WA
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/redesign/review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.99]"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
                boxShadow: isLight ? "0 4px 14px rgba(18, 59, 122, 0.25)" : "0 4px 20px rgba(159, 195, 242, 0.25)",
              }}
            >
              <Sparkles size={16} />
              <span>Tailor Resume for Lattice Works</span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            SIGNATURE PRODUCT STAGE (Inspired by Approved Landing Product Stage)
            ========================================================================= */}
        <div
          className="rounded-2xl border transition-all overflow-hidden"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
            boxShadow: isLight
              ? "0 10px 30px -10px rgba(0, 0, 0, 0.06)"
              : "0 24px 50px -15px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Stage Top Bar */}
          <div
            className="flex items-center justify-between px-6 py-3.5 border-b text-xs transition-colors"
            style={{
              borderColor: isLight ? "#E5DFD5" : "#182C44",
              background: isLight ? "#F3F0EB" : "#0A182C",
            }}
          >
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck size={16} className={isLight ? "text-[#123B7A]" : "text-[#5B9BFF]"} />
              <span style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                Active Document Review Stage
              </span>
              <span className={`hidden sm:inline text-[11px] ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                · 1 Verified Bullet Evidence · 1 Transparent Gap
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[11px] px-2 py-0.5 rounded font-semibold uppercase"
                style={{
                  background: isLight ? "#E8EEF8" : "#163150",
                  color: isLight ? "#123B7A" : "#9FC3F2",
                }}
              >
                Lattice Works
              </span>
            </div>
          </div>

          {/* Stage Body Grid */}
          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: THE TACTILE PAPER RESUME CANVAS (7 COLS) */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className="rounded-xl border p-6 transition-all"
                style={{
                  background: isLight ? "#FFFFFF" : "#FBFAF9",
                  borderColor: isLight ? "#E2DDD4" : "#D5DFEA",
                  color: "#10243E",
                  boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Paper Header */}
                <div className="border-b border-[#D5DFEA] pb-4">
                  <div className="flex items-baseline justify-between">
                    <h2
                      className="text-2xl font-bold tracking-tight text-[#10243E]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Avery Chen
                    </h2>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#123B7A] border border-[#BFDBFE]">
                      88 ATS Score
                    </span>
                  </div>
                  <p className="text-xs text-[#52647A] mt-1 font-medium">
                    Senior Product Manager · Seattle, WA · linkedin.com/in/averychen · (555) 234-5678
                  </p>
                </div>

                {/* Target Role & Section */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#123B7A] uppercase tracking-wider">
                      Target Role Tailoring Draft
                    </span>
                    <span className="text-[#52647A] font-mono">
                      {draftResume.targetRole} @ {draftResume.targetCompany}
                    </span>
                  </div>

                  {/* Highlighted Evidence Bullet */}
                  <div
                    className="p-3.5 rounded-lg border-l-4 text-xs leading-relaxed"
                    style={{
                      background: "#EFF6FF",
                      borderColor: "#3B82F6",
                      color: "#10243E",
                    }}
                  >
                    <p className="font-medium">
                      &ldquo;Architected distributed event-streaming telemetry pipeline for real-time order tracking across 14 services, reducing event drop rate to &lt;0.01%.&rdquo;
                    </p>
                    <div className="mt-2 pt-2 border-t border-[#BFDBFE] flex items-center justify-between text-[11px] text-[#123B7A]">
                      <span className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-[#059669]" /> Supported by candidate evidence
                      </span>
                      <span className="font-mono text-[10px] opacity-75">12% lift verified</span>
                    </div>
                  </div>

                  {/* Transparent Gap Notification */}
                  <div
                    className="p-3.5 rounded-lg border-l-4 text-xs leading-relaxed"
                    style={{
                      background: "#FFF7ED",
                      borderColor: "#F59E0B",
                      color: "#78350F",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Transparent Gap: Kafka Telemetry Administration</span>
                        <p className="text-[11px] mt-0.5 opacity-90">
                          Role spec requests cluster admin; your verified profile anchors event-streaming ingestion. Flagged for candidate confirmation before credit deduction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Canvas CTA Bar */}
                <div className="mt-6 pt-4 border-t border-[#D5DFEA] flex items-center justify-between">
                  <span className="text-xs text-[#52647A]">
                    Requires 1 generation credit for final PDF
                  </span>
                  <Link
                    href="/redesign/review"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123B7A] hover:underline"
                  >
                    <span>Proceed to Pre-Gen Review Gate</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT: UPCOMING HIGH-STAKES MILESTONE & PREP (5 COLS) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Interview Milestone Briefing Card */}
              {interviewApp && (
                <div
                  className="rounded-xl border p-5 transition-all"
                  style={{
                    background: isLight ? "#FFFFFF" : "#0E2138",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-[#F59E0B] mb-2.5">
                    <Calendar size={15} />
                    <span>Upcoming Interview · Priority 1</span>
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
                  <p className="text-xs font-medium" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                    {interviewApp.companyName} · Seattle, WA
                  </p>

                  <div
                    className="my-3.5 p-3 rounded-lg text-xs leading-relaxed"
                    style={{
                      background: isLight ? "#F3F0EB" : "#132A4A",
                      color: isLight ? "#52647A" : "#EFF5FF",
                    }}
                  >
                    <p className="font-semibold text-inherit">
                      Round 2 Technical Case Study with VP Product Marcus Vance
                    </p>
                    <p className="text-[11px] mt-1 font-mono opacity-80">
                      Tuesday, Nov 10 @ 2:00 PM PST · 45 mins
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-inherit">
                    <span className="text-xs font-mono opacity-80" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                      Linked: Master (94 ATS)
                    </span>
                    <Link
                      href="/redesign/tools/interview-practice"
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                      style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                    >
                      <span>Launch Rehearsal</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Curated Opportunities Quick Look */}
              <div
                className="rounded-xl border p-5 transition-all"
                style={{
                  background: isLight ? "#FFFFFF" : "#0E2138",
                  borderColor: isLight ? "#E2DDD4" : "#1B3654",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold opacity-75">
                    <Briefcase size={14} className={isLight ? "text-[#123B7A]" : "text-[#5B9BFF]"} />
                    <span style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>Curated Match Spotlight</span>
                  </div>
                  <Link
                    href="/redesign/jobs"
                    className="text-xs font-semibold hover:underline"
                    style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                  >
                    View all 3
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {jobMatches.slice(0, 2).map((job) => (
                    <div
                      key={job.id}
                      className="p-3 rounded-lg border flex items-center justify-between text-xs transition-colors"
                      style={{
                        background: isLight ? "#F8F7F4" : "#112642",
                        borderColor: isLight ? "#E8E4DC" : "#1B3654",
                      }}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold truncate" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                          {job.roleTitle}
                        </p>
                        <p className="text-[11px] opacity-75 truncate" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                          {job.companyName} · {job.location}
                        </p>
                      </div>
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0"
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
        </div>

        {/* =========================================================================
            UNIFIED EXECUTIVE METRICS RIBBON (Grounded, Restrained & Integrated)
            ========================================================================= */}
        <div
          className="rounded-xl border divide-y md:divide-y-0 md:divide-x grid grid-cols-2 md:grid-cols-4 transition-colors overflow-hidden"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          {/* Segment 1: Resumes */}
          <Link
            href="/redesign/resumes"
            className="p-4 sm:p-5 hover:bg-slate-500/5 transition-colors group"
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5">
              <span>Resume Library</span>
              <FileText size={15} className={isLight ? "text-[#123B7A]" : "text-[#5B9BFF]"} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {resumes.length}
              </span>
              <span className="text-xs font-mono font-semibold text-[#059669]">
                94 Max ATS
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
              1 Master · 2 Tailored · 1 Draft
            </p>
          </Link>

          {/* Segment 2: Active Pipeline */}
          <Link
            href="/redesign/applications"
            className="p-4 sm:p-5 hover:bg-slate-500/5 transition-colors group"
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5">
              <span>Active Pipeline</span>
              <Layers size={15} className={isLight ? "text-[#123B7A]" : "text-[#5B9BFF]"} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {activeApplications.length}
              </span>
              <span className="text-xs font-mono font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                1 Interview
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
              5 Total recorded in tracker
            </p>
          </Link>

          {/* Segment 3: Curated Matches */}
          <Link
            href="/redesign/jobs"
            className="p-4 sm:p-5 hover:bg-slate-500/5 transition-colors group"
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5">
              <span>Curated Job Matches</span>
              <Briefcase size={15} className={isLight ? "text-[#123B7A]" : "text-[#5B9BFF]"} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {jobMatches.length}
              </span>
              <span className="text-xs font-mono font-semibold text-[#7C3AED]">
                89% Avg Fit
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
              Transparent percentage breakdown
            </p>
          </Link>

          {/* Segment 4: Generation Balance */}
          <Link
            href="/redesign/settings"
            className="p-4 sm:p-5 hover:bg-slate-500/5 transition-colors group"
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5">
              <span>Active Generation Pass</span>
              <Sparkles size={15} className="text-[#F59E0B]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {user.creditsRemaining}
              </span>
              <span className="text-xs font-mono font-semibold text-[#F59E0B]">
                Credits
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
              $29 Term Pass · Zero auto-renewal
            </p>
          </Link>
        </div>

        {/* =========================================================================
            APPLICATIONS REQUIRING ATTENTION (Interactive Pipeline Dossier)
            ========================================================================= */}
        <div
          className="rounded-2xl border p-6 transition-colors"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Applications Requiring Attention
              </h2>
              <p className={`text-xs mt-0.5 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                Tracked pipeline stages with linked resume versions and follow-up deadlines.
              </p>
            </div>
            <Link
              href="/redesign/applications"
              className="text-xs font-bold hover:underline flex items-center gap-1"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              <span>Open Pipeline Board</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="divide-y rounded-xl border overflow-hidden text-xs transition-colors"
            style={{
              borderColor: isLight ? "#E5DFD5" : "#182C44",
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
                    <p className={`text-xs mt-0.5 truncate ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                      {app.roleTitle} · {app.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:self-center">
                  <div className="text-right">
                    <span className="font-mono font-bold text-xs">
                      {app.matchScore}% Match
                    </span>
                    <p className={`text-[10px] ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                      Follow-up: {app.followUpDue}
                    </p>
                  </div>
                  <Link
                    href={`/redesign/applications?selected=${app.id}`}
                    className="p-2 rounded-lg border transition-colors hover:scale-105"
                    style={{
                      borderColor: isLight ? "#E5DFD5" : "#182C44",
                      background: isLight ? "#F8F7F4" : "#112642",
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Specialized Tool Workspaces
              </h2>
              <p className={`text-xs mt-0.5 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                Six purpose-built task suites for the end-to-end career transition workflow.
              </p>
            </div>
            <Link
              href="/redesign/tools"
              className="text-xs font-bold hover:underline flex items-center gap-1"
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
                    background: isLight ? "#FBFAF9" : "#0C213A",
                    borderColor: isLight ? "#E5DFD5" : "#1B3654",
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
                  <span className={`text-[10px] font-mono mt-0.5 block ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
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
