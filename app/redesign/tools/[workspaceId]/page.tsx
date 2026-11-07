"use client";

import { use } from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import { resolveWorkspaceSlug } from "@/lib/tool-workspaces";
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
    desc: "Single-document workspace optimized for ATS readability, evidence grounding, and high-impact metric presentation.",
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
    title: "Interview Practice Workspace",
    tagline: "Voice AI mock interviews and STAR method rehearsal",
    desc: "Scenario-based interview simulator with real-time feedback on structure, STAR method adherence, and metric citation.",
    icon: HelpCircle,
    primaryAction: { label: "Start Live Simulation", href: "/redesign/resumes" },
    features: [
      "Role-tailored question pools matching target seniority level",
      "STAR framework structuring guidance for executive depth",
      "Verbal pause, filler word, and delivery confidence telemetry",
    ],
    tools: [
      { name: "Voice AI Simulator", desc: "Interactive behavioral mock interviews", href: "/redesign/resumes", status: "Active" },
      { name: "Question Bank", desc: "Top 50 vetted questions for Senior PMs", href: "/redesign/resumes", status: "Active" },
    ],
  },
  "salary-offers": {
    id: "salary-offers",
    title: "Salary & Offers Workspace",
    tagline: "Compensation benchmarks and negotiation strategy",
    desc: "Market compensation percentiles and data-backed counter-offer scripts for confident negotiation.",
    icon: DollarSign,
    primaryAction: { label: "Explore Comp Bands", href: "/redesign/jobs" },
    features: [
      "P25, P50, and P75 compensation bands across major tech hubs",
      "Equity grant valuation models and tax-adjusted scenarios",
      "Field-tested counter-offer scripts and email phrasing",
    ],
    tools: [
      { name: "Comp Benchmark", desc: "Seattle & Remote PM salary explorer", href: "/redesign/jobs", status: "Active" },
      { name: "Offer Evaluator", desc: "Total comp calculator with bonus & equity", href: "/redesign/jobs", status: "Active" },
    ],
  },
};

export default function RedesignToolWorkspaceDetailPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const { theme } = useRedesignStore();
  const isLight = theme === "light";

  const resolvedSlug = resolveWorkspaceSlug(workspaceId);
  const detail = DETAILS[resolvedSlug] || DETAILS[workspaceId];

  if (!detail) {
    return (
      <WorkspaceLayout>
        <div className="p-8 max-w-4xl mx-auto text-center">
          <p className="text-sm" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Workspace not found.</p>
          <Link href="/redesign/tools" className="mt-4 font-semibold inline-block hover:underline" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline transition-colors"
          style={{ color: isLight ? "#52647A" : "#9FB0C7" }}
        >
          <ChevronLeft size={16} /> Back to all Tool Workspaces
        </Link>

        {/* Hero Card */}
        <div
          className="rounded-2xl border p-6 sm:p-8 transition-colors"
          style={{
            background: isLight ? "#FAF9F6" : "#0C213A",
            borderColor: isLight ? "#E2DDD4" : "#1B3654",
            boxShadow: isLight
              ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
              : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b"
            style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: isLight ? "#E8EEF8" : "#132A4A",
                  color: isLight ? "#123B7A" : "#9FC3F2",
                }}
              >
                <Icon size={28} />
              </div>
              <div>
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                >
                  Task Suite
                </span>
                <h1
                  className="text-2xl sm:text-3xl font-bold tracking-tight mt-1"
                  style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                >
                  {detail.title}
                </h1>
                <p className="text-xs sm:text-sm mt-1 max-w-2xl" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  {detail.desc}
                </p>
              </div>
            </div>

            <Link
              href={detail.primaryAction.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all hover:translate-y-[-1px] self-start sm:self-center shrink-0"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
              }}
            >
              <span>{detail.primaryAction.label}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Key Capabilities */}
          <div className="mt-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3.5"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              Core Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {detail.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 transition-colors"
                  style={{
                    background: isLight ? "#FFFFFF" : "#112642",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                  }}
                >
                  <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
                  <span style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools in this Workspace */}
        <div className="space-y-4">
          <h2
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
          >
            Specialized Tools &amp; Utilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {detail.tools.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="p-4 rounded-xl border transition-all hover:translate-y-[-1px] group block"
                style={{
                  background: isLight ? "#FAF9F6" : "#0C213A",
                  borderColor: isLight ? "#E2DDD4" : "#1B3654",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-sm font-bold transition-colors"
                    style={{ color: isLight ? "#10243E" : "#EFF5FF" }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold"
                    style={{
                      background: isLight ? "#E8EEF8" : "#163150",
                      color: isLight ? "#123B7A" : "#9FC3F2",
                    }}
                  >
                    {t.status}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  {t.desc}
                </p>
                <span
                  className="text-xs font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                >
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
