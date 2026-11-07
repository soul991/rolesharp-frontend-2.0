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
} from "lucide-react";

export default function RedesignDashboardPage() {
  const { user, resumes, applications, jobMatches, theme } = useRedesignStore();
  const isLight = theme === "light";

  const activeApplications = applications.filter((a) => a.stage !== "closed");
  const interviewApp = applications.find((a) => a.stage === "interview");
  const draftResume = resumes.find((r) => r.id === "resume-avery-tailored-lattice") || resumes[1];

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-inherit">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Candidate Workspace
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Seattle, WA • Target: <span className="font-semibold text-blue-500">{user.targetTitle}</span> @ {user.targetCompany}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/redesign/review"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
            >
              <Sparkles size={15} /> Tailor Resume for Lattice Works
            </Link>
          </div>
        </div>

        {/* Priority Action Alerts (High Stakes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Urgent Interview Alert */}
          {interviewApp && (
            <div
              className={`p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                isLight
                  ? "bg-amber-50/70 border-amber-300 text-amber-950"
                  : "bg-amber-950/20 border-amber-500/40 text-amber-200"
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
                <Calendar size={15} /> Upcoming Interview • Priority 1
              </div>
              <h2 className="text-lg font-bold font-display leading-tight">
                {interviewApp.roleTitle} @ {interviewApp.companyName}
              </h2>
              <p className="text-xs mt-1.5 opacity-90 leading-relaxed">
                Round 2 Technical &amp; Case Study interview with VP Product Marcus Vance scheduled for{" "}
                <span className="font-semibold font-mono">Tuesday, Nov 10 @ 2:00 PM PST</span>.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between">
                <span className="text-xs font-mono">Resume: Master (94 ATS)</span>
                <Link
                  href="/redesign/tools/interview-practice"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400"
                >
                  Launch Interview Rehearsal <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* Active Tailoring Draft Alert */}
          <div
            className={`p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
              isLight
                ? "bg-blue-50/70 border-blue-300 text-blue-950"
                : "bg-blue-950/20 border-blue-500/40 text-blue-200"
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">
              <AlertTriangle size={15} /> In-Progress Tailoring Draft • Priority 2
            </div>
            <h2 className="text-lg font-bold font-display leading-tight">
              {draftResume.targetRole} @ {draftResume.targetCompany}
            </h2>
            <p className="text-xs mt-1.5 opacity-90 leading-relaxed">
              Target ATS score is <span className="font-bold font-mono">88%</span> with 1 transparent gap flag (Kafka Telemetry). Bullet evidence is verified and pending pre-generation sign-off.
            </p>
            <div className="mt-4 pt-3 border-t border-blue-500/20 flex items-center justify-between">
              <span className="text-xs font-mono">Needs review</span>
              <Link
                href="/redesign/review"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-400"
              >
                Continue to Review Gate <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/redesign/resumes"
            className={`p-4 rounded-xl border transition-all hover:scale-[1.01] ${
              isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Resume Library</span>
              <FileText size={16} className="text-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">{resumes.length}</span>
              <span className="text-xs font-mono text-emerald-500 font-semibold">94 Max ATS</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">1 Master, 2 Tailored, 1 Draft</p>
          </Link>

          <Link
            href="/redesign/applications"
            className={`p-4 rounded-xl border transition-all hover:scale-[1.01] ${
              isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Active Pipeline</span>
              <Layers size={16} className="text-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">{activeApplications.length}</span>
              <span className="text-xs font-mono text-blue-500 font-semibold">1 Interview</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">5 Total recorded in tracker</p>
          </Link>

          <Link
            href="/redesign/jobs"
            className={`p-4 rounded-xl border transition-all hover:scale-[1.01] ${
              isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Curated Job Matches</span>
              <Briefcase size={16} className="text-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">{jobMatches.length}</span>
              <span className="text-xs font-mono text-purple-500 font-semibold">89% Avg Fit</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Transparent % reasoning</p>
          </Link>

          <Link
            href="/redesign/settings"
            className={`p-4 rounded-xl border transition-all hover:scale-[1.01] ${
              isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Generation Balance</span>
              <Sparkles size={16} className="text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">{user.creditsRemaining}</span>
              <span className="text-xs font-mono text-amber-500 font-semibold">Premium</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Fixed term through May 15, 2027</p>
          </Link>
        </div>

        {/* Applications Follow-up & Status Summary */}
        <div
          className={`rounded-2xl border p-5 transition-colors ${
            isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold font-display">Applications Requiring Attention</h2>
              <p className="text-xs text-slate-500">
                Tracked pipeline stages with linked resume versions and follow-up deadlines.
              </p>
            </div>
            <Link
              href="/redesign/applications"
              className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1"
            >
              Open Pipeline Board <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-inherit border border-inherit rounded-xl overflow-hidden text-xs">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-500/5 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm truncate">{app.companyName}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono uppercase text-[10px] font-semibold ${
                        app.stage === "interview"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : app.stage === "applied"
                          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          : app.stage === "preparing"
                          ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                          : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                      }`}
                    >
                      {app.stage}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-0.5 truncate">{app.roleTitle} • {app.location}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="font-mono font-bold text-xs">{app.matchScore}% Match</span>
                    <p className="text-[10px] text-slate-500">Follow-up due: {app.followUpDue}</p>
                  </div>
                  <Link
                    href={`/redesign/applications?selected=${app.id}`}
                    className="p-1.5 rounded-lg border border-inherit hover:bg-blue-500/10 hover:text-blue-500 transition-colors"
                  >
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Workspaces Quick Navigation (Commit 17c50e4) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold font-display">Specialized Tool Workspaces</h2>
            <Link
              href="/redesign/tools"
              className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1"
            >
              View all 6 workspaces <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                  className={`p-3.5 rounded-xl border text-center transition-all hover:scale-[1.02] ${
                    isLight
                      ? "bg-[#FAF9F6] border-[#E2E0D8] hover:border-blue-400"
                      : "bg-[#0A1220] border-[#182334] hover:border-blue-500/40"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-2">
                    <Icon size={16} />
                  </div>
                  <p className="font-bold text-xs font-display truncate">{ws.title}</p>
                  <span className="text-[10px] font-mono text-slate-500">{ws.tag}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
