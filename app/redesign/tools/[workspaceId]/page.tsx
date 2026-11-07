"use client";

import { use } from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  FileText,
  Briefcase,
  Sparkles,
  Mail,
  HelpCircle,
  DollarSign,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";

interface WorkspaceDetail {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  icon: typeof FileText;
  primaryAction: { label: string; href: string };
  features: string[];
  tools: Array<{ name: string; desc: string; href: string; status: string }>;
}

const DETAILS: Record<string, WorkspaceDetail> = {
  "resume-studio": {
    id: "resume-studio",
    title: "Resume Studio",
    tagline: "Focused single-document resume authoring canvas",
    desc: "Centered 680px paper canvas with live ATS evaluation against 24 common applicant tracking engines.",
    icon: FileText,
    primaryAction: { label: "Launch Resume Canvas", href: "/redesign/resumes" },
    features: [
      "In-place bullet editing with real-time wordcount and impact metrics",
      "Live ATS gauge tracking heading hierarchy, dates, and keyword density",
      "Transparent gap detection alerting before you finalize changes",
    ],
    tools: [
      { name: "Resume Builder", desc: "Build role-specific version without inventing experience", href: "/redesign/resumes", status: "Active" },
      { name: "ATS X-Ray", desc: "Parser simulation and hierarchy audit", href: "/redesign/resumes", status: "Active" },
      { name: "Bullet Point Generator", desc: "Action + Context + Metric structured generation", href: "/redesign/review", status: "Ready" },
    ],
  },
  "jobs-fit": {
    id: "jobs-fit",
    title: "Jobs & Fit",
    tagline: "Match breakdown and honest competency gap analysis",
    desc: "Calculate mathematically grounded fit percentages with transparent weighting for skills, experience, and education.",
    icon: Briefcase,
    primaryAction: { label: "View Role Matches", href: "/redesign/jobs" },
    features: [
      "Explicit weight percentage for each matched requirement",
      "Honest flagging of missing competencies without hallucination",
      "Direct 1-click link to tailor resume for any role",
    ],
    tools: [
      { name: "Resume Match", desc: "Transparent percentage match breakdown", href: "/redesign/jobs", status: "Active" },
      { name: "Skill Gap Analyzer", desc: "Isolate true missing competencies", href: "/redesign/jobs", status: "Active" },
    ],
  },
  linkedin: {
    id: "linkedin",
    title: "LinkedIn Workspace",
    tagline: "Profile headline, summary, and recruiter visibility",
    desc: "Calibrate your public professional presence for recruiter search algorithms while keeping claims verifiable.",
    icon: Sparkles,
    primaryAction: { label: "Run Profile Audit", href: "/redesign/profile" },
    features: [
      "Keyword density calibration for recruiter search Boolean filters",
      "Headline generator highlighting verifiable impact achievements",
      "First-person and third-person summary narratives",
    ],
    tools: [
      { name: "LinkedIn Profile Checker", desc: "Score profile against search criteria", href: "/redesign/profile", status: "Active" },
      { name: "Headline Generator", desc: "Verifiable proof-point headlines", href: "/redesign/profile", status: "Active" },
    ],
  },
  letters: {
    id: "letters",
    title: "Letters Workspace",
    tagline: "Targeted cover letters and professional correspondence",
    desc: "Construct compelling, concise cover letters and follow-up notes grounded in the candidate's verified record.",
    icon: Mail,
    primaryAction: { label: "Draft New Cover Letter", href: "/redesign/resumes" },
    features: [
      "3-paragraph concise format preferred by modern hiring teams",
      "Zero generic filler sentences or corporate clichés",
      "Seamless integration with target role requirements",
    ],
    tools: [
      { name: "Cover Letter Generator", desc: "3-paragraph role-aligned letters", href: "/redesign/resumes", status: "Active" },
      { name: "Cover Letter Analyzer", desc: "Fluff ratio and evidence alignment score", href: "/redesign/resumes", status: "Active" },
    ],
  },
  "interview-practice": {
    id: "interview-practice",
    title: "Interview Practice",
    tagline: "Rehearsal simulator and question breakdown",
    desc: "Scenario-based prep with instant critique on STAR structure and metric citation for product management interviews.",
    icon: HelpCircle,
    primaryAction: { label: "Begin Mock Session", href: "/redesign/dashboard" },
    features: [
      "Horizon Analytics Round 2 Case Study specific scenarios",
      "STAR framework structure guidance (Situation, Task, Action, Result)",
      "Follow-up thank you note generator with specific topic callbacks",
    ],
    tools: [
      { name: "Interview Rehearsal Simulator", desc: "Mock session for case study round", href: "/redesign/dashboard", status: "Upcoming Nov 10" },
      { name: "Thank You Note Generator", desc: "Topic callback thank-you drafts", href: "/redesign/dashboard", status: "Ready" },
    ],
  },
  "salary-offers": {
    id: "salary-offers",
    title: "Salary & Offers",
    tagline: "Compensation benchmarks and negotiation scripts",
    desc: "Real-world Seattle and Remote compensation data with total reward modeling (base, bonus, equity vest schedules).",
    icon: DollarSign,
    primaryAction: { label: "Explore PM Comp Bands", href: "/redesign/jobs" },
    features: [
      "Verified Seattle Senior PM comp range ($165k - $195k base)",
      "Total compensation calculator with 4-year equity vesting schedules",
      "Word-for-word counter-offer scripts for salary and remote flexibility",
    ],
    tools: [
      { name: "Salary Benchmark Explorer", desc: "P25, P50, and P75 comp bands", href: "/redesign/jobs", status: "Active" },
      { name: "Offer Comparison Calculator", desc: "Base + bonus + equity modeling", href: "/redesign/jobs", status: "Active" },
    ],
  },
};

const ALIASES: Record<string, string> = {
  resume: "resume-studio",
  fit: "jobs-fit",
  interview: "interview-practice",
  offers: "salary-offers",
};

export default function RedesignWorkspaceDetailPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const resolvedParams = use(params);
  const targetId = ALIASES[resolvedParams.workspaceId] || resolvedParams.workspaceId;
  const detail = DETAILS[targetId];
  const { theme } = useRedesignStore();
  const isLight = theme === "light";

  if (!detail) {
    return (
      <WorkspaceLayout>
        <div className="p-8 max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-400">Workspace not found.</p>
          <Link href="/redesign/tools" className="mt-4 text-blue-500 font-semibold inline-block">
            Back to Tools Hub
          </Link>
        </div>
      </WorkspaceLayout>
    );
  }

  const Icon = detail.icon;

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Back Link */}
        <Link
          href="/redesign/tools"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-500 transition-colors"
        >
          <ChevronLeft size={16} /> Back to all Tool Workspaces
        </Link>

        {/* Hero Card */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 transition-colors ${
            isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-inherit">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <Icon size={28} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500">
                  Task Workspace
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-display">{detail.title}</h1>
                <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  {detail.desc}
                </p>
              </div>
            </div>

            <Link
              href={detail.primaryAction.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm self-start sm:self-center shrink-0"
            >
              <span>{detail.primaryAction.label}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Key Capabilities */}
          <div className="mt-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Core Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {detail.features.map((feature, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                    isLight ? "bg-white border-slate-200" : "bg-slate-900/40 border-slate-800"
                  }`}
                >
                  <CheckCircle2 size={15} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools in this Workspace */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-display">Specialized Tools &amp; Utilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {detail.tools.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className={`p-4 rounded-xl border transition-all hover:scale-[1.01] group ${
                  isLight
                    ? "bg-[#FAF9F6] border-[#E2E0D8] hover:border-blue-400"
                    : "bg-[#0A1220] border-[#182334] hover:border-blue-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold font-display group-hover:text-blue-500 transition-colors">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold">
                    {t.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{t.desc}</p>
                <span className="text-xs font-semibold text-blue-500 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Launch Tool <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
