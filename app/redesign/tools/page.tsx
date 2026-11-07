"use client";

import { useState } from "react";
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
  ExternalLink,
  Search,
} from "lucide-react";

const WORKSPACES_DATA = [
  {
    id: "resume-studio",
    title: "Resume Studio",
    tagline: "Build, check, and improve one resume",
    desc: "Single-document workspace optimized for ATS readability, evidence grounding, and high-impact metric presentation.",
    icon: FileText,
    primaryAction: {
      label: "Open Resume Studio",
      href: "/redesign/resumes",
    },
    tools: [
      { name: "Resume Builder", desc: "Build role-specific versions without inventing experience", href: "/redesign/resumes" },
      { name: "ATS X-Ray", desc: "Inspect parser hierarchy and missing keyword evidence", href: "/redesign/resumes" },
      { name: "Resume Fixer", desc: "Targeted single-bullet metric sharpening", href: "/redesign/resumes" },
      { name: "Bullet Point Generator", desc: "Action + Context + Metric structured generation", href: "/redesign/review" },
      { name: "GitHub Resume Importer", desc: "Convert repository commits and stars into bullet points", href: "/redesign/resumes" },
      { name: "AI Humanizer", desc: "Remove repetitive corporate AI clichés and synthetic cadence", href: "/redesign/resumes" },
    ],
  },
  {
    id: "jobs-fit",
    title: "Jobs & Fit",
    tagline: "Find roles, compare requirements, and close real gaps",
    desc: "Analyze candidate-to-job compatibility with transparent weighting breakdown and honest unsupported skill flags.",
    icon: Briefcase,
    primaryAction: {
      label: "Explore Job Matches",
      href: "/redesign/jobs",
    },
    tools: [
      { name: "Resume Match", desc: "Transparent percentage match breakdown against any posting", href: "/redesign/jobs" },
      { name: "Skill Gap Analyzer", desc: "Isolate true missing competencies without guessing", href: "/redesign/jobs" },
      { name: "Resume Compare", desc: "Side-by-side diff between master and tailored versions", href: "/redesign/resumes" },
      { name: "Career Map", desc: "Multi-year trajectory and next seniority level requirements", href: "/redesign/profile" },
      { name: "Job Clipper", desc: "Save web job listings with one click directly into tracker", href: "/redesign/applications" },
      { name: "Free Certifications", desc: "Accredited credentials to address verified skill gaps", href: "/redesign/jobs" },
    ],
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    tagline: "Review your profile and improve its headline and story",
    desc: "Optimize public social footprint for recruiter search algorithms while keeping claims grounded in your true history.",
    icon: Sparkles,
    primaryAction: {
      label: "Audit LinkedIn Profile",
      href: "/redesign/tools/linkedin",
    },
    tools: [
      { name: "LinkedIn Profile Checker", desc: "Score profile against high-intent search criteria", href: "/redesign/tools/linkedin" },
      { name: "Headline Generator", desc: "Role-targeted headlines with verifiable proof points", href: "/redesign/tools/linkedin" },
      { name: "Career Summary Drafter", desc: "Narrative career synthesis for the About section", href: "/redesign/tools/linkedin" },
      { name: "Experience Bullet Formatter", desc: "Transform achievements into readable mobile snippets", href: "/redesign/tools/linkedin" },
    ],
  },
  {
    id: "letters",
    title: "Letters",
    tagline: "Write and review letters from your own facts",
    desc: "Targeted cover letters, warm follow-ups, and polite resignation documents grounded strictly in verified work history.",
    icon: Mail,
    primaryAction: {
      label: "Draft Cover Letter",
      href: "/redesign/tools/letters",
    },
    tools: [
      { name: "Cover Letter Generator", desc: "Targeted 3-paragraph letters aligned to job priorities", href: "/redesign/tools/letters" },
      { name: "Cover Letter Analyzer", desc: "Check tone, evidence alignment, and fluff ratio", href: "/redesign/tools/letters" },
      { name: "Resignation Letter Generator", desc: "Polite, professional departure documentation", href: "/redesign/tools/letters" },
      { name: "Cold Outreach Drafter", desc: "High-response LinkedIn and email connection notes", href: "/redesign/tools/letters" },
    ],
  },
  {
    id: "interview-practice",
    title: "Interview Practice",
    tagline: "Rehearse answers, prepare references, and follow up",
    desc: "Scenario-based interview simulator with real-time feedback on structure, STAR method adherence, and metric citation.",
    icon: HelpCircle,
    primaryAction: {
      label: "Start Mock Rehearsal",
      href: "/redesign/tools/interview-practice",
    },
    tools: [
      { name: "Interview Rehearsal Simulator", desc: "AI-guided practice for behavioral and technical rounds", href: "/redesign/tools/interview-practice" },
      { name: "Interview Question Bank", desc: "Top 50 vetted questions for Senior Product Managers", href: "/redesign/tools/interview-practice" },
      { name: "Thank You Note Generator", desc: "Post-interview follow-ups referencing specific conversation points", href: "/redesign/tools/interview-practice" },
      { name: "Reference Prep Generator", desc: "Briefing documents for your professional references", href: "/redesign/tools/interview-practice" },
      { name: "30-60-90 Day Plan Generator", desc: "Strategic onboarding plans for final interview rounds", href: "/redesign/tools/interview-practice" },
    ],
  },
  {
    id: "salary-offers",
    title: "Salary & Offers",
    tagline: "Research pay, compare offers, and prepare to negotiate",
    desc: "Verified compensation benchmarking, equity valuation calculators, and confident negotiation script generation.",
    icon: DollarSign,
    primaryAction: {
      label: "Benchmark Compensation",
      href: "/redesign/tools/salary-offers",
    },
    tools: [
      { name: "Salary Benchmark Explorer", desc: "P25, P50, and P75 comp bands for Seattle & Remote PMs", href: "/redesign/tools/salary-offers" },
      { name: "Offer Comparison Calculator", desc: "Total comp modeling including base, bonus, and equity", href: "/redesign/tools/salary-offers" },
      { name: "Salary Negotiation Scripts", desc: "Word-for-word scripts for counter-offers and perks", href: "/redesign/tools/salary-offers" },
    ],
  },
];

export default function RedesignToolsPage() {
  const { theme } = useRedesignStore();
  const [search, setSearch] = useState("");
  const isLight = theme === "light";

  const filteredWorkspaces = WORKSPACES_DATA.filter((ws) => {
    const query = search.toLowerCase();
    return (
      ws.title.toLowerCase().includes(query) ||
      ws.desc.toLowerCase().includes(query) ||
      ws.tools.some((t) => t.name.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query))
    );
  });

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-inherit">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-1">
              Historical Reference 17c50e4 Restored
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Tool Workspaces
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Six dedicated task-oriented suites containing all 22 RoleSharp specialized career instruments.
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools & workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLight
                  ? "bg-[#FAF9F6] border-slate-300 text-slate-900"
                  : "bg-slate-900/60 border-slate-800 text-white"
              }`}
            />
          </div>
        </div>

        {/* 6 Workspace Cards */}
        <div className="space-y-8">
          {filteredWorkspaces.map((ws) => {
            const Icon = ws.icon;
            return (
              <section
                key={ws.id}
                id={ws.id}
                className={`rounded-2xl border p-6 transition-all ${
                  isLight
                    ? "bg-[#FAF9F6] border-[#E2E0D8]"
                    : "bg-[#0A1220] border-[#182334]"
                }`}
              >
                {/* Workspace Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-inherit">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-display">{ws.title}</h2>
                      <p className="text-xs font-semibold text-blue-500 mt-0.5">{ws.tagline}</p>
                      <p className={`text-xs mt-1 max-w-xl ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        {ws.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={ws.primaryAction.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm self-start sm:self-center"
                  >
                    <span>{ws.primaryAction.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Sub-tools Grid */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ws.tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className={`p-3.5 rounded-xl border transition-all hover:scale-[1.01] group ${
                        isLight
                          ? "bg-white border-slate-200 hover:border-blue-400"
                          : "bg-slate-900/40 border-slate-800/80 hover:border-blue-500/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-display group-hover:text-blue-500 transition-colors">
                          {tool.name}
                        </span>
                        <ExternalLink size={12} className="text-slate-400 group-hover:text-blue-400" />
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {tool.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
