"use client";

import React, { useState } from "react";
import {
  AVERY_CHEN_USER,
  AVERY_RESUMES,
  AVERY_APPLICATIONS,
  AVERY_JOB_MATCHES,
} from "@/lib/fictional-demo-dataset";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Grid,
  Layers,
  Layout,
  Moon,
  Plus,
  Smartphone,
  Sparkles,
  Sun,
  Target,
  X,
  AlertTriangle,
  Menu,
} from "lucide-react";

export type ArchitectureOption = "A" | "B" | "C" | "D" | "E" | "F";
export type ActiveTabOption = "dashboard" | "landing" | "auth" | "profile" | "resumes" | "review" | "tailor" | "jobs" | "applications" | "tools" | "settings" | "content" | "admin";

export default function ArchitectureComparisonGallery() {
  const [option, setOption] = useState<ArchitectureOption>("F");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<ActiveTabOption>("dashboard");

  // Hybrid unified architecture states
  const [hybridViewMode, setHybridViewMode] = useState<"editor" | "library">("editor");
  const [applicationsViewMode, setApplicationsViewMode] = useState<"board" | "list">("board");
  const [applicationsFilter, setApplicationsFilter] = useState<string>("all");
  const [returnContext, setReturnContext] = useState<{
    fromTab: ActiveTabOption;
    label: string;
    appId?: string;
  } | null>(null);
  const [settingsTab, setSettingsTab] = useState<"profile" | "account" | "billing" | "notifications">("profile");

  // Interactive task state
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("resume-avery-master");
  const [selectedJobId, setSelectedJobId] = useState<string>("job-match-lattice");
  const [selectedAppId, setSelectedAppId] = useState<string>("app-lattice-works");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isToolsDrawerOpen, setIsToolsDrawerOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync URL query params on load and updates
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const opt = params.get("option");
      const tab = params.get("tab");
      if (opt && ["A", "B", "C", "D", "E", "F"].includes(opt)) {
        setOption(opt as ArchitectureOption);
      }
      if (tab) {
        setActiveTab(tab as ActiveTabOption);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("option", option);
      url.searchParams.set("tab", activeTab);
      window.history.replaceState(null, "", url.toString());
    }
  }, [option, activeTab]);

  const handleResetBaseline = () => {
    setSelectedResumeId("resume-avery-master");
    setSelectedJobId("job-match-lattice");
    setSelectedAppId("app-lattice-works");
    setEditedSkill("");
    setSkillsList([
      "Roadmapping",
      "SQL",
      "User research",
      "Experiment design",
      "Product analytics",
      "Onboarding Architecture",
    ]);
    setEditedBullet(
      "Led onboarding experiments improving activation 12% across two releases through frictionless signup steps."
    );
    setIsEditingBullet(false);
    setReturnContext(null);
    setGenerationSuccess(false);
    setActiveTab("dashboard");
  };

  // State-preservation test state for GOV.UK Check Answers pattern
  const [editedSkill, setEditedSkill] = useState("");
  const [skillsList, setSkillsList] = useState<string[]>([
    "Roadmapping",
    "SQL",
    "User research",
    "Experiment design",
    "Product analytics",
    "Onboarding Architecture",
  ]);
  const [editedBullet, setEditedBullet] = useState(
    "Led onboarding experiments improving activation 12% across two releases through frictionless signup steps."
  );
  const [isEditingBullet, setIsEditingBullet] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  const activeResume = AVERY_RESUMES.find((r) => r.id === selectedResumeId) || AVERY_RESUMES[0];
  const activeJob = AVERY_JOB_MATCHES.find((j) => j.id === selectedJobId) || AVERY_JOB_MATCHES[0];
  const activeApp = AVERY_APPLICATIONS.find((a) => a.id === selectedAppId) || AVERY_APPLICATIONS[0];

  const handleAddSkill = () => {
    if (editedSkill.trim() && !skillsList.includes(editedSkill.trim())) {
      setSkillsList([...skillsList, editedSkill.trim()]);
      setEditedSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  const handleTriggerTailoring = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsReviewModalOpen(true);
  };

  const handleExecuteGeneration = () => {
    setGenerationSuccess(true);
    setTimeout(() => {
      setGenerationSuccess(false);
      setIsReviewModalOpen(false);
      setSelectedResumeId("resume-avery-tailored-lattice");
      setSelectedAppId("app-lattice-works");
      setActiveTab("applications");
    }, 1200);
  };

  const runTask = (taskNum: number) => {
    setActiveTask(taskNum);
    switch (taskNum) {
      case 1:
        // Continue existing resume
        setSelectedResumeId("resume-avery-master");
        setActiveTab("resumes");
        break;
      case 2:
        // Choose saved job & enter tailoring
        setSelectedJobId("job-match-lattice");
        setActiveTab("jobs");
        setIsReviewModalOpen(true);
        break;
      case 3:
        // Review entered details & edit a section
        setIsReviewModalOpen(true);
        setIsEditingBullet(true);
        break;
      case 4:
        // Find resulting version and application
        setSelectedResumeId("resume-avery-tailored-lattice");
        setSelectedAppId("app-lattice-works");
        setActiveTab("applications");
        break;
      case 5:
        // Find a tool, edit profile, locate settings
        setIsToolsDrawerOpen(true);
        break;
      case 6:
        // Change theme and locate language
        setTheme(theme === "dark" ? "light" : "dark");
        setIsLanguageModalOpen(true);
        break;
    }
  };

  // Color variables for comparison frame
  const bgCanvas = theme === "dark" ? "#0A1220" : "#F3F2EE";
  const bgSurface = theme === "dark" ? "#121C2E" : "#FAF9F6";
  const bgCard = theme === "dark" ? "#16233B" : "#FFFFFF";
  const borderRule = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = theme === "dark" ? "#F5F7FA" : "#111827";
  const textMuted = theme === "dark" ? "#94A3B8" : "#64748B";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05080F",
        color: "#F1F5F9",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
      className="p-4 md:p-6"
    >
      {/* ── TOP CONTROL BAR: ARCHITECTURE CONTROLS & TEST HARNESS ── */}
      <header className="mb-6 rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-lg">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white">RoleSharp 2.0</span>
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-400">
                  Architecture Exploration (Approval A)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Compare five distinct information architectures with live interactive fixture state.
              </p>
            </div>
          </div>

          {/* Viewport & Theme controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg border border-slate-700 bg-slate-800/80 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
                  viewport === "desktop" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                <Layout size={14} /> Desktop (1280px)
              </button>
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
                  viewport === "mobile" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone size={14} /> Mobile (390px)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700"
            >
              {theme === "dark" ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
              {theme === "dark" ? "Dark (Default)" : "Warm Light (#F3F2EE)"}
            </button>

            <button
              type="button"
              onClick={handleResetBaseline}
              title="Reset all scenario edits to canonical Avery Chen baseline"
              className="flex items-center gap-1.5 rounded-lg border border-emerald-600/60 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-colors"
            >
              <span>↺</span> Reset Baseline
            </button>
            <a
              href="https://www.figma.com/design/unsaved-mw6du5d0-mulppgth?node-id=67-2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-purple-700/60 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/50 transition-colors"
            >
              <span>❖</span> Figma Frames
            </a>
            <button
              type="button"
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700"
            >
              <Globe size={14} /> {selectedLanguage}
            </button>
          </div>
        </div>

        {/* Option Selector Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Structure:</span>
            {[
              { id: "A", name: "Option A", desc: "Familiar Workspace (Sidebar)" },
              { id: "B", name: "Option B", desc: "Career Journey (4-Stage Stepper)" },
              { id: "C", name: "Option C", desc: "Resume Studio (Document-First)" },
              { id: "D", name: "Option D", desc: "Application-First (Pipeline)" },
              { id: "E", name: "Option E", desc: "Compact Hybrid (Top Rail)" },
              { id: "F", name: "★ Option F", desc: "Cohesive Hybrid (Synthesis)" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setOption(opt.id as ArchitectureOption);
                  setActiveTab("dashboard");
                }}
                className={`rounded-lg px-3.5 py-2 text-left text-xs transition-all ${
                  option === opt.id
                    ? "border border-blue-500 bg-blue-600/20 text-white ring-1 ring-blue-500"
                    : "border border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="font-bold">{opt.name}</div>
                <div className="text-[10px] text-slate-400">{opt.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-mono">Demo: Avery Chen (Seattle, WA)</span>
          </div>
        </div>

        {/* ── INTERACTIVE TASK RUNNER (Supports Tasks 1-6) ── */}
        <div className="mt-4 rounded-lg bg-slate-950/60 p-3 border border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-300">
              ⚡ Verification Tasks (Click to test in current option):
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { num: 1, label: "1. Continue Resume" },
                { num: 2, label: "2. Tailor Job Match" },
                { num: 3, label: "3. Pre-Gen Review Gate" },
                { num: 4, label: "4. Resulting Version & App" },
                { num: 5, label: "5. Tools Hub & Profile" },
                { num: 6, label: "6. Theme & Language" },
              ].map((t) => (
                <button
                  key={t.num}
                  type="button"
                  onClick={() => runTask(t.num)}
                  className={`rounded border px-2.5 py-1 text-xs transition-colors ${
                    activeTask === t.num
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── COMPARISON CANVAS WRAPPER ── */}
      <main
        className="mx-auto transition-all duration-300"
        style={{
          maxWidth: viewport === "mobile" ? "420px" : "1380px",
        }}
      >
        <div
          style={{
            background: bgCanvas,
            color: textPrimary,
            minHeight: "750px",
            borderColor: borderRule,
          }}
          className="relative overflow-hidden rounded-2xl border shadow-2xl transition-colors duration-200"
        >
          {/* ========================================================================= */}
          {/* UNIFIED HYBRID ARCHITECTURE (Authorized Approval A Direction) */}
          {/* ========================================================================= */}
          {option === "F" && (
            <div className="flex min-h-[780px] flex-col">
              {/* 1. Global Shell (from Option E): Compact 48px Top Primary Navigation */}
              <header
                style={{ background: bgSurface, borderColor: borderRule }}
                className="flex h-12 items-center justify-between border-b px-4 sm:px-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {/* Brand Mark: Joined colored R to oleSharp */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 font-bold text-white text-[11px]">
                      R
                    </div>
                    <span className="font-bold text-sm tracking-tight text-white">RoleSharp</span>
                    <span className="ml-2 hidden rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-400 sm:inline-block">
                      Hybrid Core
                    </span>
                  </div>

                  {/* Primary Workspace Navigation Tabs */}
                  <nav className="hidden md:flex items-center gap-1 text-xs">
                    {[
                      { id: "dashboard", label: "Overview", icon: Layout },
                      { id: "resumes", label: "Resume Studio", icon: FileText },
                      { id: "applications", label: `Applications (${AVERY_APPLICATIONS.length})`, icon: Briefcase },
                      { id: "jobs", label: `Job Matches (${AVERY_JOB_MATCHES.length})`, icon: Target },
                      { id: "tools", label: "Tools Hub (22)", icon: Layers },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            if (tab.id === "tools") {
                              setIsToolsDrawerOpen(true);
                            } else {
                              setActiveTab(tab.id as ActiveTabOption);
                            }
                          }}
                          className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors ${
                            isActive
                              ? "bg-blue-600 text-white font-bold shadow"
                              : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                          }`}
                        >
                          <Icon size={13} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="flex items-center gap-2.5 text-xs">
                  {/* Global Search Simulation */}
                  <div className="hidden lg:flex items-center rounded-md border border-slate-700/60 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-400">
                    <span>Search or jump to... ⌘K</span>
                  </div>

                  {/* Return Path indicator if active */}
                  {returnContext && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(returnContext.fromTab);
                        if (returnContext.appId) {
                          setSelectedAppId(returnContext.appId);
                        }
                        setReturnContext(null);
                      }}
                      className="rounded bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-[11px] font-bold text-amber-300 hover:bg-amber-500/30 flex items-center gap-1"
                    >
                      <span>← Back to {returnContext.label}</span>
                    </button>
                  )}

                  {/* Settings / Avatar Menu */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium transition-all ${
                      activeTab === "settings"
                        ? "border-blue-500 bg-blue-600/30 text-white"
                        : "border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold">
                      AC
                    </div>
                    <span className="hidden sm:inline text-[11px] font-semibold">{AVERY_CHEN_USER.name}</span>
                  </button>
                </div>
              </header>

              {/* 2. Secondary Contextual Sub-Navigation Strip (38px) */}
              <div
                style={{ background: bgCard, borderColor: borderRule }}
                className="flex h-9 items-center justify-between border-b px-4 sm:px-6 text-[11px] overflow-x-auto"
              >
                {/* Contextual sub-nav morphs based on active primary tab */}
                {activeTab === "dashboard" && (
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Campaign Health:</span>
                    <span>Candidate: <strong>Avery Chen (Seattle, WA)</strong></span>
                    <span>•</span>
                    <span>Target: <strong>Senior PM @ Lattice Works</strong></span>
                    <span className="rounded bg-blue-500/20 px-1.5 py-0.2 text-blue-400 font-semibold">88% Match</span>
                  </div>
                )}

                {activeTab === "resumes" && (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">View:</span>
                      <button
                        type="button"
                        onClick={() => setHybridViewMode("editor")}
                        className={`rounded px-2.5 py-0.5 font-medium transition-colors ${
                          hybridViewMode === "editor"
                            ? "bg-slate-700 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Document Workspace (C)
                      </button>
                      <button
                        type="button"
                        onClick={() => setHybridViewMode("library")}
                        className={`rounded px-2.5 py-0.5 font-medium transition-colors ${
                          hybridViewMode === "library"
                            ? "bg-slate-700 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Resume Library Grid ({AVERY_RESUMES.length})
                      </button>
                      <span className="mx-1 text-slate-600">|</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Version:</span>
                      <button
                        type="button"
                        onClick={() => setSelectedResumeId("resume-avery-master")}
                        className={`rounded px-2 py-0.5 font-medium ${
                          selectedResumeId === "resume-avery-master"
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Master (94 ATS)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedResumeId("resume-avery-tailored-lattice")}
                        className={`rounded px-2 py-0.5 font-medium ${
                          selectedResumeId === "resume-avery-tailored-lattice"
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        ● Lattice Works (88% Match)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedResumeId("resume-avery-tailored-northstar")}
                        className={`rounded px-2 py-0.5 font-medium ${
                          selectedResumeId === "resume-avery-tailored-northstar"
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Northstar Labs (89% Match)
                      </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleTriggerTailoring("job-match-lattice")}
                        className="text-blue-400 hover:underline font-semibold"
                      >
                        Pre-Gen Review Gate →
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "applications" && (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Display:</span>
                      <button
                        type="button"
                        onClick={() => setApplicationsViewMode("board")}
                        className={`rounded px-2.5 py-0.5 font-medium transition-colors ${
                          applicationsViewMode === "board"
                            ? "bg-slate-700 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Board View (Kanban)
                      </button>
                      <button
                        type="button"
                        onClick={() => setApplicationsViewMode("list")}
                        className={`rounded px-2.5 py-0.5 font-medium transition-colors ${
                          applicationsViewMode === "list"
                            ? "bg-slate-700 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Accessible List View (Table)
                      </button>
                      <span className="mx-1 text-slate-600">|</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Filter:</span>
                      {["all", "saved", "preparing", "applied", "interview", "closed"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setApplicationsFilter(f)}
                          className={`rounded px-2 py-0.5 capitalize ${
                            applicationsFilter === f ? "text-blue-400 font-bold underline" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTriggerTailoring("job-match-lattice")}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      + Track New Role
                    </button>
                  </div>
                )}

                {activeTab === "jobs" && (
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Match Discovery:</span>
                    <span>3 Active Target Matches</span>
                    <span>•</span>
                    <span>Location: <strong>Seattle, WA & Remote</strong></span>
                    <span>•</span>
                    <span className="text-emerald-400">Transparent signal attribution active</span>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Settings:</span>
                    {[
                      { id: "profile", label: "Professional Profile & Evidence" },
                      { id: "account", label: "Account & Security" },
                      { id: "billing", label: "Billing & Credits" },
                      { id: "notifications", label: "Notifications" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSettingsTab(tab.id as "profile" | "account" | "billing" | "notifications")}
                        className={`rounded px-2.5 py-0.5 font-medium transition-colors ${
                          settingsTab === tab.id
                            ? "bg-slate-700 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Main Workspace Stage (Task-Specific Layouts within ONE Product) */}
              <div className="flex-1 p-4 sm:p-6">
                {/* ─── TAB 1: DASHBOARD (Organization from A + Progression from B) ─── */}
                {activeTab === "dashboard" && (
                  <div className="space-y-6">
                    {/* Option B: Guided Progression Onboarding Ribbon (with simultaneous stage progress note) */}
                    <div
                      style={{ background: bgCard, borderColor: borderRule }}
                      className="rounded-xl border p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold mb-2">
                        <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                          Guided Career Progression (Option B Stepper):
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Returning users have direct access anywhere; 6 applications occupy stages simultaneously
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { step: "1. Prepare Evidence", detail: "Master Resume (94 ATS)", active: false, done: true, tab: "resumes" },
                          { step: "2. Target Match", detail: "Lattice Works (88% Match)", active: false, done: true, tab: "jobs" },
                          { step: "3. Tailor & Review", detail: "Draft v1.2 (3 bullets pending)", active: true, done: false, tab: "resumes" },
                          { step: "4. Track Journey", detail: "6 Live Applications (1 Int Nov 10)", active: false, done: false, tab: "applications" },
                        ].map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveTab(s.tab as ActiveTabOption)}
                            className={`rounded-lg p-2.5 text-left border transition-all ${
                              s.active
                                ? "border-blue-500 bg-blue-600/15 text-white"
                                : s.done
                                ? "border-emerald-500/30 bg-emerald-500/5 text-slate-300"
                                : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 text-xs font-bold">
                              {s.done && <CheckCircle2 size={12} className="text-emerald-400" />}
                              <span>{s.step}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{s.detail}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Urgent Action / Interview Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 text-xs text-purple-200">
                      <div className="flex items-center gap-2.5">
                        <Clock size={16} className="text-purple-400 shrink-0" />
                        <div>
                          <strong className="text-white">Upcoming Interview in 3 Days:</strong> Horizon Analytics (Principal PM)
                          <div className="text-[11px] text-purple-300 mt-0.5">
                            Thursday, Nov 10 @ 2:00 PM PST • Round 2 Architecture & Case Study with VP Marcus Vance
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("applications");
                            setSelectedAppId("app-horizon-analytics");
                          }}
                          className="rounded bg-purple-600 px-3 py-1.5 font-bold text-white hover:bg-purple-700 text-xs"
                        >
                          View Interview Dossier →
                        </button>
                      </div>
                    </div>

                    {/* In-Progress Tailoring Alert with Direct Return Jump */}
                    <div
                      style={{ background: bgCard, borderColor: borderRule }}
                      className="rounded-xl border p-4 shadow-sm flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">In-Progress Tailoring Draft</span>
                        <h3 className="text-sm font-bold text-white mt-0.5">Lattice Works — Senior Product Manager</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Match Score: 88% (Base 94% minus 6% penalty for unverified Kafka telemetry requirement)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedResumeId("resume-avery-tailored-lattice");
                            setHybridViewMode("editor");
                            setActiveTab("resumes");
                          }}
                          className="rounded bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-700"
                        >
                          Open in Resume Studio →
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTriggerTailoring("job-match-lattice")}
                          className="rounded border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                        >
                          Pre-Gen Review Gate
                        </button>
                      </div>
                    </div>

                    {/* 4 Metric Cards (Option A organization) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Active Applications", val: AVERY_APPLICATIONS.length.toString(), sub: "1 Interviewing, 1 Preparing" },
                        { label: "Job Matches", val: AVERY_JOB_MATCHES.length.toString(), sub: "Top: 88% (Lattice Works)" },
                        { label: "ATS Base Health", val: "94/100", sub: "Master Resume Complete" },
                        { label: "Generations Remaining", val: AVERY_CHEN_USER.creditsRemaining.toString(), sub: `${AVERY_CHEN_USER.plan} Plan` },
                      ].map((m, idx) => (
                        <div
                          key={idx}
                          style={{ background: bgCard, borderColor: borderRule }}
                          className="rounded-xl border p-4 shadow-sm"
                        >
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{m.label}</div>
                          <div className="text-xl font-bold mt-1 text-white">{m.val}</div>
                          <div className="text-[10px] text-emerald-400 mt-0.5">{m.sub}</div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Access Free Tools Grid */}
                    <div
                      style={{ background: bgCard, borderColor: borderRule }}
                      className="rounded-xl border p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-white">Quick Standalone Career Tools</h3>
                        <button
                          type="button"
                          onClick={() => setIsToolsDrawerOpen(true)}
                          className="text-xs text-blue-400 hover:underline font-semibold"
                        >
                          Explore all 22 tools →
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {[
                          { title: "ATS Resume Scanner", desc: "Scan keyword density and parser readability" },
                          { title: "Bullet Impact Optimizer", desc: "Rewrite bullets with quantified metrics" },
                          { title: "Salary Benchmark Calculator", desc: "Compare Seattle PM compensation bands" },
                        ].map((t, idx) => (
                          <div
                            key={idx}
                            onClick={() => setIsToolsDrawerOpen(true)}
                            className="cursor-pointer rounded-lg border border-slate-700/60 bg-slate-900/40 p-3 hover:border-blue-500 transition-colors"
                          >
                            <span className="font-bold text-white block">{t.title}</span>
                            <span className="text-[11px] text-slate-400 mt-1 block">{t.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── TAB 2: RESUME STUDIO & DOCUMENT WORKSPACE (Option C) ─── */}
                {activeTab === "resumes" && (
                  <div>
                    {hybridViewMode === "library" ? (
                      renderResumesView(bgCard, borderRule, textMuted, setSelectedResumeId, selectedResumeId)
                    ) : (
                      <div className="space-y-4">
                        {/* Return Context Banner if jumped from an application */}
                        {returnContext && (
                          <div className="flex items-center justify-between rounded-lg bg-blue-900/30 border border-blue-500/50 p-2.5 text-xs text-blue-200">
                            <span>
                              Working on tailored resume attached to <strong>{returnContext.label}</strong>.
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTab(returnContext.fromTab);
                                if (returnContext.appId) setSelectedAppId(returnContext.appId);
                                setReturnContext(null);
                              }}
                              className="font-bold underline hover:text-white"
                            >
                              ← Return to Application (Changes preserved)
                            </button>
                          </div>
                        )}

                        {/* Option C Dedicated Document Workspace: Centered Paper Canvas + Right Assistant Drawer */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Centered Document Paper Canvas (col-span-8) */}
                          <div className="lg:col-span-8 flex justify-center">
                            <div
                              style={{
                                background: theme === "dark" ? "#141E33" : "#FAF9F6",
                                color: theme === "dark" ? "#F5F7FA" : "#111827",
                                borderColor: borderRule,
                                maxWidth: "720px",
                              }}
                              className="w-full rounded-xl border p-6 sm:p-8 shadow-xl"
                            >
                              {/* Resume Header & Identity */}
                              <div className="border-b pb-4 mb-4" style={{ borderColor: borderRule }}>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h1 className="text-xl font-bold tracking-tight">{AVERY_CHEN_USER.name}</h1>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                      {AVERY_CHEN_USER.location} • {AVERY_CHEN_USER.email} • linkedin.com/in/avery-chen-pm
                                    </p>
                                  </div>
                                  <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400">
                                    {activeResume.atsScore} ATS Score
                                  </span>
                                </div>
                                <div className="mt-2 text-xs font-semibold text-blue-400">
                                  {activeResume.title}
                                </div>
                              </div>

                              {/* Professional Summary */}
                              <div className="mb-5">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Professional Summary</span>
                                  <button
                                    type="button"
                                    onClick={() => setIsEditingBullet(!isEditingBullet)}
                                    className="text-[10px] text-blue-400 hover:underline"
                                  >
                                    {isEditingBullet ? "Done Editing" : "Edit Section"}
                                  </button>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-300">
                                  {activeResume.summary}
                                </p>
                              </div>

                              {/* Core Competencies (reflects review gate changes) */}
                              <div className="mb-5">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                                  Core Competencies & Skills
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {skillsList.map((skill) => (
                                    <span
                                      key={skill}
                                      className="rounded bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 text-xs text-slate-200"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Experience Section */}
                              <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                                  Professional Experience
                                </span>
                                {activeResume.experience.map((exp, idx) => (
                                  <div key={idx} className="mb-4 text-xs">
                                    <div className="flex justify-between font-bold text-white">
                                      <span>{exp.role} — {exp.company}</span>
                                      <span className="text-slate-400 text-[11px] font-normal">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-400">{exp.location}</div>
                                    <ul className="mt-2 list-disc pl-4 space-y-1.5 text-slate-300">
                                      {exp.bullets.map((b, bIdx) => (
                                        <li key={bIdx}>
                                          {bIdx === 0 && editedBullet ? editedBullet : b}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Assistant Drawer (col-span-4) */}
                          <div className="lg:col-span-4 space-y-4">
                            {/* ATS Analysis Panel */}
                            <div
                              style={{ background: bgCard, borderColor: borderRule }}
                              className="rounded-xl border p-5 shadow-sm space-y-3"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-white">ATS Match & Compatibility</span>
                                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                                  {activeResume.atsScore}/100
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400">
                                Target Role: <strong>Lattice Works (Senior PM)</strong>
                              </p>

                              {/* Demo Score Attribution Note */}
                              <div className="rounded bg-slate-900/60 border border-slate-800 p-2.5 text-[11px] text-slate-300">
                                <strong className="text-white block mb-0.5">Illustrative Demo Scoring:</strong>
                                Master base earns 94 ATS. This tailored variant scores 88% due to a 6% deduction for the unverified Kafka requirement.
                              </div>

                              {/* Transparent Honest Gap Alert */}
                              <div className="rounded bg-amber-950/20 border border-amber-800/40 p-2.5 text-xs">
                                <div className="flex items-center gap-1 font-bold text-amber-400">
                                  <AlertTriangle size={13} /> Transparent Honest Gap
                                </div>
                                <p className="text-[11px] text-slate-300 mt-1">
                                  <strong>Kafka Event Stream Telemetry:</strong> Avery brings relational SQL and PostHog/Mixpanel foundation; system frames this honestly rather than inventing Kafka tenure.
                                </p>
                              </div>

                              <div className="pt-2">
                                <button
                                  type="button"
                                  onClick={() => handleTriggerTailoring("job-match-lattice")}
                                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700"
                                >
                                  Open GOV.UK Check Answers Gate →
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ─── TAB 3: APPLICATIONS PIPELINE (Option D: Board + Accessible List) ─── */}
                {activeTab === "applications" && (
                  <div className="space-y-6">
                    {/* View Switcher: Board vs. Accessible List Table */}
                    {applicationsViewMode === "board" ? (
                      /* Option D Kanban Board */
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        {[
                          { stage: "saved", title: "Saved (1)", color: "border-slate-500" },
                          { stage: "preparing", title: "Preparing (1)", color: "border-amber-500" },
                          { stage: "applied", title: "Applied (2)", color: "border-blue-500" },
                          { stage: "interview", title: "Interview (1)", color: "border-purple-500" },
                          { stage: "closed", title: "Closed (1)", color: "border-slate-700" },
                        ].map((col) => {
                          const appsInStage = AVERY_APPLICATIONS.filter(
                            (a) => a.stage === col.stage && (applicationsFilter === "all" || applicationsFilter === col.stage)
                          );
                          return (
                            <div
                              key={col.stage}
                              style={{ background: bgSurface, borderColor: borderRule }}
                              className="rounded-xl border p-3 min-h-[460px] flex flex-col justify-between"
                            >
                              <div>
                                <div className={`border-b pb-2 text-xs font-bold uppercase tracking-wider ${col.color}`}>
                                  {col.title}
                                </div>
                                <div className="mt-3 space-y-2.5">
                                  {appsInStage.map((app) => (
                                    <div
                                      key={app.id}
                                      onClick={() => setSelectedAppId(app.id)}
                                      style={{
                                        background: bgCard,
                                        borderColor: selectedAppId === app.id ? "#3B82F6" : borderRule,
                                      }}
                                      className={`cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500 transition-all ${
                                        selectedAppId === app.id ? "ring-2 ring-blue-500" : ""
                                      }`}
                                    >
                                      <div className="flex justify-between items-start">
                                        <span className="font-bold text-xs">{app.companyName}</span>
                                        <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] text-blue-400 font-semibold">
                                          {app.matchScore}%
                                        </span>
                                      </div>
                                      <div className="text-[11px] text-slate-300 mt-1">{app.roleTitle}</div>
                                      <div className="mt-2 text-[10px] text-slate-400">
                                        Follow-up: {app.followUpDue}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="text-center pt-2">
                                <button
                                  type="button"
                                  onClick={() => handleTriggerTailoring("job-match-lattice")}
                                  className="text-[10px] text-blue-400 hover:underline"
                                >
                                  + Add to {col.stage}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Accessible List View Table */
                      <div
                        style={{ background: bgCard, borderColor: borderRule }}
                        className="rounded-xl border overflow-hidden shadow-sm"
                      >
                        <table className="w-full text-left text-xs">
                          <thead style={{ background: bgSurface }} className="border-b text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <tr>
                              <th className="p-3.5">Company & Role</th>
                              <th className="p-3.5">Stage</th>
                              <th className="p-3.5">Match Score</th>
                              <th className="p-3.5">Linked Resume</th>
                              <th className="p-3.5">Follow-up Due</th>
                              <th className="p-3.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {AVERY_APPLICATIONS.filter(
                              (a) => applicationsFilter === "all" || applicationsFilter === a.stage
                            ).map((app) => (
                              <tr
                                key={app.id}
                                onClick={() => setSelectedAppId(app.id)}
                                className={`cursor-pointer hover:bg-slate-800/40 transition-colors ${
                                  selectedAppId === app.id ? "bg-blue-600/10" : ""
                                }`}
                              >
                                <td className="p-3.5 font-bold text-white">
                                  {app.companyName}
                                  <div className="text-[11px] font-normal text-slate-400">{app.roleTitle}</div>
                                </td>
                                <td className="p-3.5">
                                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                                    app.stage === "interview"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : app.stage === "preparing"
                                      ? "bg-amber-500/20 text-amber-400"
                                      : app.stage === "applied"
                                      ? "bg-emerald-500/20 text-emerald-400"
                                      : "bg-slate-700 text-slate-300"
                                  }`}>
                                    {app.stage}
                                  </span>
                                </td>
                                <td className="p-3.5 font-semibold text-blue-400">{app.matchScore}%</td>
                                <td className="p-3.5 text-slate-300 font-mono text-[11px]">{app.resumeVersionId}</td>
                                <td className="p-3.5 text-slate-400">{app.followUpDue}</td>
                                <td className="p-3.5 text-right">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedAppId(app.id);
                                      setSelectedResumeId(app.resumeVersionId);
                                      setReturnContext({
                                        fromTab: "applications",
                                        label: `${app.companyName} (${app.roleTitle})`,
                                        appId: app.id,
                                      });
                                      setHybridViewMode("editor");
                                      setActiveTab("resumes");
                                    }}
                                    className="text-blue-400 hover:underline font-semibold"
                                  >
                                    Edit Resume →
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Option D Application Dossier Drawer */}
                    <div
                      style={{ background: bgCard, borderColor: borderRule }}
                      className="rounded-xl border p-5 shadow-lg"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: borderRule }}>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Selected Opportunity Dossier</span>
                          <h3 className="text-base font-bold text-white">{activeApp.companyName} — {activeApp.roleTitle}</h3>
                          <p className="text-xs text-slate-400">{activeApp.location} • {activeApp.salaryRange}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400">
                            Match Score: {activeApp.matchScore}%
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedResumeId(activeApp.resumeVersionId);
                              setReturnContext({
                                fromTab: "applications",
                                label: `${activeApp.companyName} (${activeApp.roleTitle})`,
                                appId: activeApp.id,
                              });
                              setHybridViewMode("editor");
                              setActiveTab("resumes");
                            }}
                            className="rounded bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow"
                          >
                            Open Linked Resume in Editor →
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="rounded-lg border p-3" style={{ borderColor: borderRule, background: bgSurface }}>
                          <span className="font-bold text-slate-300 block mb-1">Attached Tailored Resume</span>
                          <span className="text-blue-400 font-medium">{activeApp.resumeVersionId}</span>
                          <p className="text-[11px] text-slate-400 mt-1">3 tailored bullets generated with impact facts.</p>
                        </div>
                        <div className="rounded-lg border p-3 border-amber-500/30 bg-amber-500/5">
                          <span className="font-bold text-amber-400 block mb-1">Honest Gap Acknowledgment</span>
                          <span className="text-slate-200 font-medium">Kafka Event Stream Telemetry</span>
                          <p className="text-[11px] text-slate-400 mt-1">Framed as adjacent streaming experience; no claims fabricated.</p>
                        </div>
                        <div className="rounded-lg border p-3" style={{ borderColor: borderRule, background: bgSurface }}>
                          <span className="font-bold text-slate-300 block mb-1">Timeline & Follow-up</span>
                          <span className="text-slate-200 font-medium">Follow-up due: {activeApp.followUpDue}</span>
                          <p className="text-[11px] text-slate-400 mt-1">Notes: {activeApp.notes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── TAB 4: JOB MATCHES ─── */}
                {activeTab === "jobs" && renderJobsView(bgCard, borderRule, textMuted, handleTriggerTailoring)}

                {/* ─── TAB 5: STANDALONE TOOLS ─── */}
                {activeTab === "tools" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-base font-bold text-white">Standalone Free Utilities Catalog (22 Tools)</h2>
                        <p className="text-xs text-slate-400">Instant single-purpose utilities without account creation or signup gates.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsToolsDrawerOpen(true)}
                        className="rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        Open Fast Slide-Over Drawer →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {[
                        { name: "ATS Resume Checker", category: "Checker", desc: "Scan keyword density and format compliance" },
                        { name: "Bullet Impact Optimizer", category: "Generator", desc: "Rewrite bullets with quantified metrics" },
                        { name: "Cover Letter Generator", category: "Generator", desc: "Craft role-tailored cover letter drafts" },
                        { name: "Salary Benchmark Calculator", category: "Market Intel", desc: "Compare Seattle & Remote compensation bands" },
                        { name: "LinkedIn Headline Generator", category: "Generator", desc: "Create role-optimized bio headlines" },
                        { name: "Skill Gap Identifier", category: "Checker", desc: "Find missing keywords against target JD" },
                      ].map((tool, idx) => (
                        <div
                          key={idx}
                          style={{ background: bgCard, borderColor: borderRule }}
                          className="rounded-xl border p-4 shadow-sm hover:border-blue-500 transition-colors"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{tool.category}</span>
                          <h4 className="font-bold text-sm text-white mt-1">{tool.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-1">{tool.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── TAB 6: SETTINGS (Option A split between Profile & Account) ─── */}
                {activeTab === "settings" && (
                  <div style={{ background: bgCard, borderColor: borderRule }} className="rounded-xl border p-6 max-w-3xl">
                    <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: borderRule }}>
                      <div>
                        <h2 className="text-base font-bold text-white">Profile, Evidence & Settings</h2>
                        <p style={{ color: textMuted }} className="text-xs mt-1">
                          Cleanly distinguishing professional career evidence from security credentials and billing.
                        </p>
                      </div>
                      <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-400 capitalize">
                        {settingsTab} Tab
                      </span>
                    </div>

                    {settingsTab === "profile" && (
                      <div className="mt-5 space-y-4 text-xs">
                        <div>
                          <label className="font-bold block text-slate-300">Candidate Name & Target Title</label>
                          <input
                            type="text"
                            defaultValue={`${AVERY_CHEN_USER.name} — ${AVERY_CHEN_USER.targetTitle}`}
                            className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold block text-slate-300">Primary Location & Commute Scope</label>
                          <input
                            type="text"
                            defaultValue={AVERY_CHEN_USER.location}
                            className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold block text-slate-300">Verified Raw Evidence Summary</label>
                          <textarea
                            defaultValue="5+ years PM experience scaling distributed data platforms and activation funnels. Led 14 engineers across 2 enterprise releases."
                            rows={3}
                            className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                          />
                        </div>
                      </div>
                    )}

                    {settingsTab === "account" && (
                      <div className="mt-5 space-y-4 text-xs">
                        <div>
                          <label className="font-bold block text-slate-300">Account Email</label>
                          <input
                            type="email"
                            defaultValue={AVERY_CHEN_USER.email}
                            disabled
                            className="mt-1 w-full rounded border border-slate-800 bg-slate-900 p-2 text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="font-bold block text-slate-300">Two-Factor Authentication (2FA)</label>
                          <div className="mt-1 flex items-center justify-between rounded border border-slate-700 bg-slate-800 p-3">
                            <span className="text-slate-300">Authenticator App (TOTP)</span>
                            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400">Enabled</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {settingsTab === "billing" && (
                      <div className="mt-5 space-y-4 text-xs">
                        <div className="rounded border border-slate-700 bg-slate-800 p-4">
                          <span className="font-bold text-white block">Current Subscription: {AVERY_CHEN_USER.plan} Tier</span>
                          <p className="text-slate-300 text-[11px] mt-1">
                            Fixed-term access through {AVERY_CHEN_USER.planExpiry}. Includes 12 remaining generation credits.
                          </p>
                        </div>
                      </div>
                    )}

                    {settingsTab === "notifications" && (
                      <div className="mt-5 space-y-3 text-xs">
                        <div className="rounded border border-slate-700 bg-slate-800 p-3 flex justify-between items-center">
                          <span className="text-slate-200">Daily Match Alert Digest (RFC 8058 compliant)</span>
                          <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400">Active</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 4. Mobile 5-Item Thumb Bottom Navigation Bar (44px min targets) */}
              {viewport === "mobile" && (
                <nav
                  style={{ background: bgSurface, borderColor: borderRule }}
                  className="sticky bottom-0 z-20 flex h-16 w-full items-center justify-around border-t px-2 shadow-2xl"
                >
                  {[
                    { tab: "dashboard", label: "Overview", icon: Layout },
                    { tab: "resumes", label: "Studio", icon: FileText },
                    { tab: "applications", label: `Apps (${AVERY_APPLICATIONS.length})`, icon: Briefcase },
                    { tab: "jobs", label: "Matches", icon: Target },
                    { tab: "tools", label: "Tools", icon: Layers },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.tab || (item.tab === "tools" && isToolsDrawerOpen);
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          if (item.tab === "tools") {
                            setIsToolsDrawerOpen(true);
                          } else {
                            setActiveTab(item.tab as ActiveTabOption);
                          }
                        }}
                        className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg px-2 text-[10px] font-bold transition-all ${
                          isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* PRESERVED ALTERNATIVE OPTIONS (For Reference & Comparison) */}
          {/* ========================================================================= */}
          {/* OPTION A: THE FAMILIAR WORKSPACE (Persistent Sidebar) */}
          {/* ========================================================================= */}
          {option === "A" && (
            <div className="flex h-full min-h-[750px]">
              {/* Persistent Sidebar */}
              <aside
                style={{
                  width: viewport === "mobile" ? "72px" : "250px",
                  background: bgSurface,
                  borderColor: borderRule,
                }}
                className="flex flex-col justify-between border-r p-3 transition-all"
              >
                <div>
                  {/* Brand Lockup */}
                  <div className="mb-6 flex items-center gap-2.5 px-2 pt-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 font-bold text-white text-xs">
                      R
                    </div>
                    {viewport !== "mobile" && (
                      <span className="font-bold tracking-tight text-sm">RoleSharp</span>
                    )}
                  </div>

                  {/* Sidebar Nav Sections */}
                  <nav className="space-y-4 text-xs">
                    <div>
                      {viewport !== "mobile" && (
                        <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider opacity-50">
                          Active Pipeline
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => setActiveTab("dashboard")}
                          className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 font-medium transition-colors ${
                            activeTab === "dashboard"
                              ? "bg-blue-600 text-white"
                              : "hover:bg-slate-500/10"
                          }`}
                        >
                          <Grid size={15} />
                          {viewport !== "mobile" && "Dashboard"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab("jobs")}
                          className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 font-medium transition-colors ${
                            activeTab === "jobs"
                              ? "bg-blue-600 text-white"
                              : "hover:bg-slate-500/10"
                          }`}
                        >
                          <Target size={15} />
                          {viewport !== "mobile" && (
                            <span className="flex w-full justify-between items-center">
                              Job Matches
                              <span className="rounded-full bg-blue-500/20 px-1.5 py-0.2 text-[10px] text-blue-400">
                                3
                              </span>
                            </span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab("applications")}
                          className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 font-medium transition-colors ${
                            activeTab === "applications"
                              ? "bg-blue-600 text-white"
                              : "hover:bg-slate-500/10"
                          }`}
                        >
                          <Briefcase size={15} />
                          {viewport !== "mobile" && "Application Tracker"}
                        </button>
                      </div>
                    </div>

                    <div>
                      {viewport !== "mobile" && (
                        <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider opacity-50">
                          Document Studio
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => setActiveTab("resumes")}
                          className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 font-medium transition-colors ${
                            activeTab === "resumes"
                              ? "bg-blue-600 text-white"
                              : "hover:bg-slate-500/10"
                          }`}
                        >
                          <FileText size={15} />
                          {viewport !== "mobile" && "Resume Library"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedJobId("job-match-lattice");
                            setIsReviewModalOpen(true);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 font-medium transition-colors hover:bg-slate-500/10"
                        >
                          <Sparkles size={15} />
                          {viewport !== "mobile" && "AI Tailoring Studio"}
                        </button>
                      </div>
                    </div>

                    <div>
                      {viewport !== "mobile" && (
                        <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider opacity-50">
                          Utilities & Tools
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => setIsToolsDrawerOpen(true)}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 font-medium transition-colors hover:bg-slate-500/10"
                        >
                          <Layers size={15} />
                          {viewport !== "mobile" && "Free Tools Hub"}
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Sidebar Bottom User Profile */}
                <div className="border-t border-slate-500/10 pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-xs hover:bg-slate-500/10"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-[11px] font-bold">
                      AC
                    </div>
                    {viewport !== "mobile" && (
                      <div className="text-left">
                        <div className="font-semibold leading-tight">{AVERY_CHEN_USER.name}</div>
                        <div className="text-[10px] text-slate-400">12 credits left</div>
                      </div>
                    )}
                  </button>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex flex-1 flex-col overflow-y-auto">
                {/* Option A Top Header */}
                <header
                  style={{ background: bgSurface, borderColor: borderRule }}
                  className="flex h-14 items-center justify-between border-b px-6"
                >
                  <div className="flex items-center gap-2 text-xs">
                    {viewport === "mobile" && (
                      <button
                        type="button"
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                        className="mr-2 flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-800 text-white"
                        title="Toggle Navigation Menu"
                      >
                        <Menu size={16} />
                      </button>
                    )}
                    <span className="opacity-60">RoleSharp</span>
                    <span>/</span>
                    <span className="font-semibold capitalize">{activeTab}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => handleTriggerTailoring("job-match-lattice")}
                      className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white shadow hover:bg-blue-700"
                    >
                      <Plus size={14} /> Tailor for Job
                    </button>
                  </div>
                </header>

                {/* Mobile Drawer Overlay for Option A */}
                {viewport === "mobile" && isMobileSidebarOpen && (
                  <div
                    style={{ background: bgSurface, borderColor: borderRule }}
                    className="border-b p-4 text-xs shadow-xl space-y-3"
                  >
                    <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: borderRule }}>
                      <span className="font-bold text-white">Navigation Menu</span>
                      <button type="button" onClick={() => setIsMobileSidebarOpen(false)} className="text-slate-400">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => { setActiveTab("dashboard"); setIsMobileSidebarOpen(false); }}
                        className="rounded p-2 text-left bg-slate-800 text-white"
                      >
                        Overview
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActiveTab("resumes"); setIsMobileSidebarOpen(false); }}
                        className="rounded p-2 text-left bg-slate-800 text-white"
                      >
                        Resumes (3)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActiveTab("jobs"); setIsMobileSidebarOpen(false); }}
                        className="rounded p-2 text-left bg-slate-800 text-white"
                      >
                        Job Matches (3)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActiveTab("applications"); setIsMobileSidebarOpen(false); }}
                        className="rounded p-2 text-left bg-slate-800 text-white"
                      >
                        Applications (6)
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* View Routing for Option A */}
                  {activeTab === "dashboard" && renderDashboardView(bgCard, borderRule, textMuted, handleTriggerTailoring)}
                  {activeTab === "landing" && renderLandingView(bgCard, borderRule, handleTriggerTailoring, setActiveTab)}
                  {activeTab === "auth" && renderAuthView(bgCard, borderRule, skillsList, editedSkill, setEditedSkill, handleAddSkill, handleRemoveSkill, setActiveTab)}
                  {activeTab === "profile" && renderProfileView(bgCard, borderRule, textMuted)}
                  {activeTab === "resumes" && renderResumesView(bgCard, borderRule, textMuted, setSelectedResumeId, selectedResumeId)}
                  {activeTab === "review" && renderReviewGateView(bgCard, borderRule, editedBullet, setEditedBullet, isEditingBullet, setIsEditingBullet, handleExecuteGeneration, generationSuccess, setActiveTab)}
                  {activeTab === "jobs" && renderJobsView(bgCard, borderRule, textMuted, handleTriggerTailoring)}
                  {activeTab === "applications" && renderApplicationsView(bgCard, borderRule, textMuted, setSelectedAppId, selectedAppId)}
                  {activeTab === "tools" && renderToolsView(bgCard, borderRule)}
                  {activeTab === "settings" && renderSettingsView(bgCard, borderRule, textMuted)}
                  {activeTab === "content" && renderContentLegalView(bgCard, borderRule)}
                  {activeTab === "admin" && renderAdminView(bgCard, borderRule)}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION B: THE CAREER JOURNEY (Prepare → Discover → Apply → Track) */}
          {/* ========================================================================= */}
          {option === "B" && (
            <div className="flex min-h-[750px] flex-col">
              {/* Top Life-Stage Navigation Bar */}
              <header
                style={{ background: bgSurface, borderColor: borderRule }}
                className="border-b px-6 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white text-sm">
                      R
                    </div>
                    <div>
                      <span className="font-bold text-sm tracking-tight">RoleSharp</span>
                      <span className="ml-2 text-xs text-slate-400">Career Journey</span>
                    </div>
                  </div>

                  {/* 4 Life-Stage Tabs */}
                  <div className="flex rounded-lg border border-slate-700/50 bg-slate-800/40 p-1 text-xs">
                    {[
                      { key: "resumes", label: "1. Prepare Evidence" },
                      { key: "jobs", label: "2. Discover Roles" },
                      { key: "tailor", label: "3. Tailor & Apply" },
                      { key: "applications", label: "4. Track Journey" },
                    ].map((step) => (
                      <button
                        key={step.key}
                        type="button"
                        onClick={() => {
                          setActiveTab(step.key as ActiveTabOption);
                          if (step.key === "tailor") {
                            setIsReviewModalOpen(true);
                          }
                        }}
                        className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                          activeTab === step.key
                            ? "bg-blue-600 text-white shadow font-semibold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {step.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setIsToolsDrawerOpen(true)}
                      className="rounded border border-slate-700 px-2.5 py-1 text-slate-300 hover:bg-slate-800"
                    >
                      Tools Hub
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("settings")}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-xs font-bold"
                    >
                      AC
                    </button>
                  </div>
                </div>

                {/* Direct Return Banner for Avery Chen */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-blue-900/30 px-3 py-2 text-xs text-blue-300 border border-blue-700/50">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-blue-400" />
                    <span>
                      <strong>Direct Return:</strong> Active draft for <strong>Lattice Works (Senior PM)</strong> • 88% Match.
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTriggerTailoring("job-match-lattice")}
                      className="font-bold text-white underline hover:text-blue-200"
                    >
                      Open Pre-Gen Review Gate →
                    </button>
                    <span className="opacity-40">|</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("applications")}
                      className="text-slate-300 hover:underline"
                    >
                      Interview Nov 10 →
                    </button>
                  </div>
                </div>
              </header>

              {/* Main Content Area for Option B */}
              <div className="p-6">
                {activeTab === "tailor" && (
                  <div style={{ background: bgCard, borderColor: borderRule }} className="rounded-xl border p-6">
                    <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: borderRule }}>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Stage 3 Workbench</span>
                        <h2 className="text-base font-bold">Tailoring Resume for Lattice Works</h2>
                        <p className="text-xs text-slate-400">Senior Product Manager • Seattle, WA • Base: Avery Chen Master (94 ATS)</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTriggerTailoring("job-match-lattice")}
                        className="rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        Launch Pre-Gen Review Gate →
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="rounded-lg border p-4" style={{ borderColor: borderRule, background: bgSurface }}>
                        <span className="font-bold text-slate-200 block mb-2">Requirements Overlap</span>
                        <ul className="space-y-1.5 text-slate-300">
                          <li>✓ Onboarding Experiment Design (28% weight)</li>
                          <li>✓ User Interviews & Qualitative Research (24% weight)</li>
                          <li>✓ SQL & Cohort Analytics (22% weight)</li>
                          <li>✓ Roadmap Ownership & OKRs (20% weight)</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border p-4 border-amber-500/30 bg-amber-500/5">
                        <span className="font-bold text-amber-400 block mb-2">Transparent Honest Gap</span>
                        <p className="text-slate-300">
                          ⚠ <strong>Kafka Event Stream Telemetry:</strong> Avery brings strong PostHog/Mixpanel & relational SQL foundation; system frames this honestly rather than hallucinating Kafka tenure.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "dashboard" && renderDashboardView(bgCard, borderRule, textMuted, handleTriggerTailoring)}
                {activeTab === "landing" && renderLandingView(bgCard, borderRule, handleTriggerTailoring, setActiveTab)}
                {activeTab === "auth" && renderAuthView(bgCard, borderRule, skillsList, editedSkill, setEditedSkill, handleAddSkill, handleRemoveSkill, setActiveTab)}
                {activeTab === "profile" && renderProfileView(bgCard, borderRule, textMuted)}
                {activeTab === "resumes" && renderResumesView(bgCard, borderRule, textMuted, setSelectedResumeId, selectedResumeId)}
                {activeTab === "review" && renderReviewGateView(bgCard, borderRule, editedBullet, setEditedBullet, isEditingBullet, setIsEditingBullet, handleExecuteGeneration, generationSuccess, setActiveTab)}
                {activeTab === "jobs" && renderJobsView(bgCard, borderRule, textMuted, handleTriggerTailoring)}
                {activeTab === "applications" && renderApplicationsView(bgCard, borderRule, textMuted, setSelectedAppId, selectedAppId)}
                {activeTab === "tools" && renderToolsView(bgCard, borderRule)}
                {activeTab === "settings" && renderSettingsView(bgCard, borderRule, textMuted)}
                {activeTab === "content" && renderContentLegalView(bgCard, borderRule)}
                {activeTab === "admin" && renderAdminView(bgCard, borderRule)}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION C: THE RESUME-FIRST STUDIO (Document Anchored) */}
          {/* ========================================================================= */}
          {option === "C" && (
            <div className="flex min-h-[750px] flex-col">
              {/* Slim Top Bar */}
              <header
                style={{ background: bgSurface, borderColor: borderRule }}
                className="flex h-13 items-center justify-between border-b px-6 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 font-bold text-white text-xs">
                    R
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold">Studio:</span>
                    <select
                      value={selectedResumeId}
                      onChange={(e) => setSelectedResumeId(e.target.value)}
                      className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white"
                    >
                      {AVERY_RESUMES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title} ({r.atsScore} ATS)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                    ATS Score: {activeResume.atsScore}/100
                  </span>
                  <button
                    type="button"
                    onClick={() => handleTriggerTailoring("job-match-lattice")}
                    className="rounded-md bg-blue-600 px-3 py-1 font-medium text-white hover:bg-blue-700"
                  >
                    Tailor for Job
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-xs font-bold"
                  >
                    AC
                  </button>
                </div>
              </header>

              {/* Studio Canvas with Split Assistant Drawer */}
              <div className="flex flex-1">
                {/* Center Document Paper Surface */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div
                    style={{
                      background: theme === "dark" ? "#111A29" : "#FFFFFF",
                      color: theme === "dark" ? "#F8FAFC" : "#111827",
                      borderColor: borderRule,
                      maxWidth: "780px",
                    }}
                    className="mx-auto rounded-xl border p-8 shadow-xl"
                  >
                    {/* Resume Header */}
                    <div className="border-b border-slate-500/20 pb-4">
                      <h1 className="text-2xl font-bold tracking-tight">{AVERY_CHEN_USER.name}</h1>
                      <p className="text-xs text-slate-400 mt-1">
                        {activeResume.targetRole || AVERY_CHEN_USER.currentTitle} • {AVERY_CHEN_USER.location} • {AVERY_CHEN_USER.email}
                      </p>
                    </div>

                    {/* Summary */}
                    <div className="mt-5">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-500">Professional Summary</h2>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{activeResume.summary}</p>
                    </div>

                    {/* Skills */}
                    <div className="mt-5">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-500">Core Competencies</h2>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {skillsList.map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-slate-700/40 px-2 py-0.5 text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="mt-6">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-500">Verified Experience</h2>
                      {activeResume.experience.map((exp, i) => (
                        <div key={i} className="mt-3">
                          <div className="flex justify-between text-xs font-bold">
                            <span>{exp.role} — {exp.company}</span>
                            <span className="text-slate-400 font-normal">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <ul className="mt-1.5 list-disc pl-4 space-y-1 text-xs text-slate-300">
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Assistant Inspector */}
                {viewport !== "mobile" && (
                  <aside
                    style={{ width: "320px", background: bgSurface, borderColor: borderRule }}
                    className="border-l p-4 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider opacity-60">Career Assistant</h3>
                      <div className="mt-3 space-y-3 text-xs">
                        <div className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
                          <div className="font-semibold text-emerald-400">Match Evidence Analysis</div>
                          <p className="mt-1 text-[11px] text-slate-300">
                            Avery's master resume matches 94% of the Senior PM requirements at Lattice Works.
                          </p>
                          <button
                            type="button"
                            onClick={() => handleTriggerTailoring("job-match-lattice")}
                            className="mt-2 w-full rounded bg-blue-600 py-1 text-center font-bold text-white text-xs hover:bg-blue-700"
                          >
                            Open Review Gate
                          </button>
                        </div>

                        <div className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
                          <div className="font-semibold">Linked Opportunities</div>
                          <div className="mt-2 space-y-1.5">
                            {AVERY_APPLICATIONS.slice(0, 3).map((app) => (
                              <div key={app.id} className="flex justify-between text-[11px]">
                                <span>{app.companyName}</span>
                                <span className="text-slate-400 capitalize">{app.stage}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsToolsDrawerOpen(true)}
                      className="w-full rounded border border-slate-700 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                    >
                      Open Free Tools Catalog →
                    </button>
                  </aside>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION D: APPLICATION-FIRST WORKSPACE (Opportunity Anchored) */}
          {/* ========================================================================= */}
          {option === "D" && (
            <div className="flex min-h-[750px] flex-col">
              {/* Option D Header */}
              <header
                style={{ background: bgSurface, borderColor: borderRule }}
                className="flex h-14 items-center justify-between border-b px-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white text-sm">
                    R
                  </div>
                  <span className="font-bold text-sm tracking-tight">Applications Board</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("resumes")}
                    className="text-slate-300 hover:underline"
                  >
                    Master Resumes ({AVERY_RESUMES.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsToolsDrawerOpen(true)}
                    className="text-slate-300 hover:underline"
                  >
                    Tools Hub
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTriggerTailoring("job-match-lattice")}
                    className="rounded bg-blue-600 px-3 py-1 font-medium text-white hover:bg-blue-700"
                  >
                    + Add Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-xs font-bold"
                  >
                    AC
                  </button>
                </div>
              </header>

              {/* Kanban Application Pipeline */}
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold">Active Applications Lifecycle</h2>
                  <span className="text-xs text-slate-400">Derived from Avery Chen's 6 live records</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {[
                    { stage: "saved", title: "Saved (1)", color: "border-slate-500" },
                    { stage: "preparing", title: "Preparing (1)", color: "border-amber-500" },
                    { stage: "applied", title: "Applied (2)", color: "border-blue-500" },
                    { stage: "interview", title: "Interview (1)", color: "border-purple-500" },
                    { stage: "closed", title: "Closed (1)", color: "border-slate-700" },
                  ].map((col) => {
                    const appsInStage = AVERY_APPLICATIONS.filter((a) => a.stage === col.stage);
                    return (
                      <div
                        key={col.stage}
                        style={{ background: bgSurface, borderColor: borderRule }}
                        className="rounded-xl border p-3 min-h-[480px] flex flex-col justify-between"
                      >
                        <div>
                          <div className={`border-b pb-2 text-xs font-bold uppercase tracking-wider ${col.color}`}>
                            {col.title}
                          </div>
                          <div className="mt-3 space-y-2.5">
                            {appsInStage.map((app) => (
                              <div
                                key={app.id}
                                onClick={() => {
                                  setSelectedAppId(app.id);
                                  setSelectedJobId(app.companyName === "Lattice Works" ? "job-match-lattice" : "job-match-northstar");
                                }}
                                style={{ background: bgCard, borderColor: selectedAppId === app.id ? "#3B82F6" : borderRule }}
                                className={`cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500 transition-all ${
                                  selectedAppId === app.id ? "ring-1 ring-blue-500" : ""
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <span className="font-bold text-xs">{app.companyName}</span>
                                  <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] text-blue-400 font-semibold">
                                    {app.matchScore}%
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-300 mt-1">{app.roleTitle}</div>
                                <div className="mt-2 text-[10px] text-slate-400">
                                  Follow-up: {app.followUpDue}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-center pt-2">
                          <button
                            type="button"
                            onClick={() => handleTriggerTailoring("job-match-lattice")}
                            className="text-[10px] text-blue-400 hover:underline"
                          >
                            + Add to {col.stage}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Application Dossier Expansion Drawer for Option D */}
                <div
                  style={{ background: bgCard, borderColor: borderRule }}
                  className="mt-6 rounded-xl border p-5 shadow-lg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: borderRule }}>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Selected Opportunity Dossier</span>
                      <h3 className="text-base font-bold">{activeApp.companyName} — {activeApp.roleTitle}</h3>
                      <p className="text-xs text-slate-400">{activeApp.location} • {activeApp.salaryRange}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400">
                        Match Score: {activeApp.matchScore}%
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTriggerTailoring(activeApp.companyName === "Lattice Works" ? "job-match-lattice" : "job-match-northstar")}
                        className="rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        Open Pre-Gen Review Gate →
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="rounded-lg border p-3" style={{ borderColor: borderRule, background: bgSurface }}>
                      <span className="font-bold text-slate-300 block mb-1">Attached Tailored Resume</span>
                      <span className="text-blue-400 font-medium">{activeApp.resumeVersionId}</span>
                      <p className="text-[11px] text-slate-400 mt-1">3 tailored bullets generated with impact facts.</p>
                    </div>
                    <div className="rounded-lg border p-3 border-amber-500/30 bg-amber-500/5">
                      <span className="font-bold text-amber-400 block mb-1">Honest Gap Acknowledgment</span>
                      <span className="text-slate-200 font-medium">Kafka Event Stream Telemetry</span>
                      <p className="text-[11px] text-slate-400 mt-1">Framed as adjacent streaming experience; no claims fabricated.</p>
                    </div>
                    <div className="rounded-lg border p-3" style={{ borderColor: borderRule, background: bgSurface }}>
                      <span className="font-bold text-slate-300 block mb-1">Timeline & Follow-up</span>
                      <span className="text-slate-200 font-medium">Follow-up due: {activeApp.followUpDue}</span>
                      <p className="text-[11px] text-slate-400 mt-1">Notes: {activeApp.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION E: THE COMPACT HYBRID (Minimal Top Rail + Tools Hub Drawer) */}
          {/* ========================================================================= */}
          {option === "E" && (
            <div className="flex min-h-[750px] flex-col">
              {/* Ultra-Slim 48px Top Rail */}
              <header
                style={{ background: bgSurface, borderColor: borderRule }}
                className="flex h-12 items-center justify-between border-b px-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 font-bold text-white text-[11px]">
                      R
                    </div>
                    <span className="font-bold text-xs tracking-tight">RoleSharp</span>
                  </div>

                  {/* 3 Core Minimal Tabs */}
                  <nav className="flex items-center gap-1 text-xs">
                    {[
                      { id: "dashboard", label: "Overview" },
                      { id: "resumes", label: "Studio" },
                      { id: "applications", label: "Tracker" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as ActiveTabOption)}
                        className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                          activeTab === tab.id
                            ? "bg-slate-700/60 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setIsToolsDrawerOpen(true)}
                    className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800/80 px-2 py-1 text-slate-300 hover:bg-slate-700"
                  >
                    <Layers size={13} />
                    <span>Tools Hub (22)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold"
                  >
                    AC
                  </button>
                </div>
              </header>

              {/* Secondary Contextual Sub-Nav Bar with Version Switcher */}
              <div
                style={{ background: bgCard, borderColor: borderRule }}
                className="flex h-10 items-center justify-between border-b px-5 text-[11px]"
              >
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2">Versions:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedResumeId("resume-avery-master");
                      setActiveTab("resumes");
                    }}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedResumeId === "resume-avery-master"
                        ? "bg-blue-600 text-white shadow font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Master Resume (94 ATS)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedResumeId("resume-avery-tailored-lattice");
                      setActiveTab("resumes");
                    }}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedResumeId === "resume-avery-tailored-lattice"
                        ? "bg-blue-600 text-white shadow font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    ● Lattice Works (88% Match)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedResumeId("resume-avery-tailored-northstar");
                      setActiveTab("resumes");
                    }}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedResumeId === "resume-avery-tailored-northstar"
                        ? "bg-blue-600 text-white shadow font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Northstar Labs (89% Match)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTriggerTailoring("job-match-lattice")}
                    className="rounded border border-dashed border-slate-600 px-2 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    + New Tailored Version
                  </button>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTriggerTailoring("job-match-lattice")}
                    className="text-blue-400 hover:underline font-semibold text-xs"
                  >
                    Pre-Gen Review Gate →
                  </button>
                </div>
              </div>

              {/* Main Content Area for Option E */}
              <div className="flex-1 p-6">
                {activeTab === "dashboard" && renderDashboardView(bgCard, borderRule, textMuted, handleTriggerTailoring)}
                {activeTab === "landing" && renderLandingView(bgCard, borderRule, handleTriggerTailoring, setActiveTab)}
                {activeTab === "auth" && renderAuthView(bgCard, borderRule, skillsList, editedSkill, setEditedSkill, handleAddSkill, handleRemoveSkill, setActiveTab)}
                {activeTab === "profile" && renderProfileView(bgCard, borderRule, textMuted)}
                {activeTab === "resumes" && renderResumesView(bgCard, borderRule, textMuted, setSelectedResumeId, selectedResumeId)}
                {activeTab === "review" && renderReviewGateView(bgCard, borderRule, editedBullet, setEditedBullet, isEditingBullet, setIsEditingBullet, handleExecuteGeneration, generationSuccess, setActiveTab)}
                {activeTab === "jobs" && renderJobsView(bgCard, borderRule, textMuted, handleTriggerTailoring)}
                {activeTab === "applications" && renderApplicationsView(bgCard, borderRule, textMuted, setSelectedAppId, selectedAppId)}
                {activeTab === "tools" && renderToolsView(bgCard, borderRule)}
                {activeTab === "settings" && renderSettingsView(bgCard, borderRule, textMuted)}
                {activeTab === "content" && renderContentLegalView(bgCard, borderRule)}
                {activeTab === "admin" && renderAdminView(bgCard, borderRule)}
              </div>

              {/* Mobile 5-Item Thumb Bottom Navigation Bar (44px min targets) */}
              {viewport === "mobile" && (
                <nav
                  style={{ background: bgSurface, borderColor: borderRule }}
                  className="sticky bottom-0 z-20 flex h-16 w-full items-center justify-around border-t px-2 shadow-2xl"
                >
                  {[
                    { tab: "dashboard", label: "Overview", icon: Layout },
                    { tab: "resumes", label: "Studio", icon: FileText },
                    { tab: "applications", label: "Apps (6)", icon: Briefcase },
                    { tab: "jobs", label: "Matches", icon: Target },
                    { tab: "tools", label: "Tools (22)", icon: Layers },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.tab || (item.tab === "tools" && isToolsDrawerOpen);
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          if (item.tab === "tools") {
                            setIsToolsDrawerOpen(true);
                          } else {
                            setActiveTab(item.tab as ActiveTabOption);
                          }
                        }}
                        className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg px-2 text-[10px] font-bold transition-all ${
                          isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHARED MODAL 1: GOV.UK "CHECK ANSWERS" PRE-GENERATION REVIEW GATE */}
          {/* ========================================================================= */}
          {isReviewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
              <div
                style={{
                  background: bgSurface,
                  color: textPrimary,
                  borderColor: borderRule,
                  maxWidth: "680px",
                }}
                className="w-full rounded-2xl border p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <div className="flex items-start justify-between border-b border-slate-500/20 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Pre-Generation Review Gate (GOV.UK Review Pattern)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Verify and adjust your evidence before committing generation credits. No values will be lost.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="rounded p-1 hover:bg-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Target Role & Match */}
                <div className="mt-4 rounded-lg bg-blue-950/30 border border-blue-800/40 p-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-blue-300">Target Role: Senior Product Manager @ Lattice Works</span>
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 font-bold text-blue-400">94% Match</span>
                  </div>
                </div>

                {/* Honest Gap surfaced for Avery Chen */}
                <div className="mt-3 rounded-lg bg-amber-950/20 border border-amber-800/40 p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <AlertTriangle size={14} /> Honest Competency Gap (Transparent Baseline)
                  </div>
                  <p className="mt-1 text-slate-300 text-[11px]">
                    {activeJob.honestGap.missingCompetency}: {activeJob.honestGap.recommendation}
                  </p>
                </div>

                {/* Skills Section with inline editing & addition */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Target Skills & Competencies</span>
                    <span className="text-slate-400 text-[11px]">{skillsList.length} skills included</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {skillsList.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 rounded bg-slate-700/60 px-2.5 py-1 text-xs"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-400 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="mt-2.5 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add another skill..."
                      value={editedSkill}
                      onChange={(e) => setEditedSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                      className="flex-1 rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="rounded bg-slate-700 px-3 py-1.5 text-xs font-medium hover:bg-slate-600"
                    >
                      + Add skill
                    </button>
                  </div>
                </div>

                {/* Bullet Proof Section with In-Place Edit */}
                <div className="mt-5 border-t border-slate-500/20 pt-4">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Key Experience Evidence (Fieldnote Software)</span>
                    <button
                      type="button"
                      onClick={() => setIsEditingBullet(!isEditingBullet)}
                      className="text-blue-400 hover:underline text-xs"
                    >
                      {isEditingBullet ? "Save Edit" : "Edit Section"}
                    </button>
                  </div>

                  {isEditingBullet ? (
                    <div className="mt-2">
                      <textarea
                        rows={3}
                        value={editedBullet}
                        onChange={(e) => setEditedBullet(e.target.value)}
                        className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingBullet(false)}
                        className="mt-1 rounded bg-emerald-600 px-3 py-1 text-xs font-bold text-white"
                      >
                        Confirm Edit
                      </button>
                    </div>
                  ) : (
                    <p className="mt-2 rounded bg-slate-800/60 p-2.5 text-xs text-slate-300 border border-slate-700/50">
                      "{editedBullet}"
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-500/20 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="rounded px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel / Keep Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteGeneration}
                    disabled={generationSuccess}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {generationSuccess ? (
                      <>
                        <CheckCircle2 size={16} className="text-emerald-400 animate-spin" /> Tailoring Generated!
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} /> Generate Tailored Resume (1 credit)
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHARED MODAL 2: TOOLS HUB CATALOG DRAWER */}
          {/* ========================================================================= */}
          {isToolsDrawerOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
              <div
                style={{ background: bgSurface, borderColor: borderRule }}
                className="w-full max-w-3xl rounded-2xl border p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">Free Standalone Tools Hub (22 Tools)</h3>
                    <p className="text-xs text-slate-400">All tools are free, accessible, and require no account.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsToolsDrawerOpen(false)}
                    className="rounded p-1 hover:bg-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { name: "ATS Resume Checker", desc: "Scan keyword density and format compliance", href: "/checker" },
                    { name: "Bullet Point Generator", desc: "Turn duties into metric-backed achievements", href: "/resume-bullet-points-generator" },
                    { name: "Skill Gap Analyzer", desc: "Compare existing skills against role posting", href: "/skill-gap" },
                    { name: "Resume Match Scorer", desc: "Score two drafts against one posting", href: "/resume-match" },
                    { name: "Executive Summary Generator", desc: "Synthesize 5+ years into 3 crisp lines", href: "/resume-summary-generator" },
                    { name: "Salary Range Estimator", desc: "Live market compensation benchmarks", href: "/salaries" },
                    { name: "30-60-90 Day Plan Generator", desc: "First 90 days strategy document", href: "/30-60-90-day-plan-generator" },
                    { name: "Interview Question Rehearsal", desc: "Role-specific behavioral drills", href: "/interview-questions" },
                  ].map((tool, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3 hover:border-blue-500 cursor-pointer"
                    >
                      <div className="font-bold text-white">{tool.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{tool.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHARED MODAL 3: LANGUAGE PICKER */}
          {/* ========================================================================= */}
          {isLanguageModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
              <div
                style={{ background: bgSurface, borderColor: borderRule }}
                className="w-full max-w-sm rounded-xl border p-5 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <h3 className="text-sm font-bold text-white">Select Language</h3>
                  <button
                    type="button"
                    onClick={() => setIsLanguageModalOpen(false)}
                    className="rounded p-1 hover:bg-slate-700"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mt-3 space-y-1 text-xs">
                  {["English (US)", "English (UK)", "Español", "Français", "Deutsch", "日本語", "العربية (RTL)"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageModalOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded p-2 text-left hover:bg-slate-700/50"
                    >
                      <span>{lang}</span>
                      {selectedLanguage === lang && <CheckCircle2 size={14} className="text-blue-500" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ── REUSABLE VIEW COMPONENT RENDERERS ──

function renderDashboardView(
  bgCard: string,
  borderRule: string,
  textMuted: string,
  handleTriggerTailoring: (id: string) => void
) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div
        style={{ background: bgCard, borderColor: borderRule }}
        className="rounded-xl border p-5 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Good evening, Avery Chen</h2>
            <p className="text-xs text-slate-400 mt-1">
              Active Target: <strong>Senior Product Manager @ Lattice Works</strong> (Seattle, WA)
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleTriggerTailoring("job-match-lattice")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700"
          >
            Review & Tailor for Lattice Works →
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Applications", val: "6", sub: "1 Interviewing • Horizon Nov 10" },
          { label: "Job Matches", val: "3", sub: "Top: 88% Match (Lattice Works)" },
          { label: "ATS Health", val: "94/100", sub: "Master Resume" },
          { label: "Generations Remaining", val: "12", sub: "Premium Plan" },
        ].map((m, idx) => (
          <div
            key={idx}
            style={{ background: bgCard, borderColor: borderRule }}
            className="rounded-xl border p-4 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{m.label}</div>
            <div className="text-xl font-bold mt-1 text-white">{m.val}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Top Matches Preview */}
      <div
        style={{ background: bgCard, borderColor: borderRule }}
        className="rounded-xl border p-5 shadow-sm"
      >
        <h3 className="text-sm font-bold mb-3">Top Evidence-Matched Roles</h3>
        <div className="space-y-3">
          {AVERY_JOB_MATCHES.map((job) => (
            <div
              key={job.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700/50 p-3 hover:border-blue-500 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{job.roleTitle}</span>
                  <span className="text-xs text-slate-400">@ {job.companyName}</span>
                  <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400">
                    {job.matchScore}% Match
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {job.location} • {job.salaryRange} • Top: {job.transparentMatchReasons[0]?.competency}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleTriggerTailoring(job.id)}
                className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Tailor Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderResumesView(
  bgCard: string,
  borderRule: string,
  textMuted: string,
  setSelectedResumeId: (id: string) => void,
  selectedResumeId: string
) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold">Resume Library (4 Versions)</h2>
          <p className="text-xs text-slate-400">Master resume, job-specific tailored copies, and drafts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AVERY_RESUMES.map((res) => (
          <div
            key={res.id}
            onClick={() => setSelectedResumeId(res.id)}
            style={{
              background: bgCard,
              borderColor: selectedResumeId === res.id ? "#3B82F6" : borderRule,
            }}
            className={`cursor-pointer rounded-xl border p-5 shadow-sm transition-all ${
              selectedResumeId === res.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-sm text-white">{res.title}</span>
                <div className="text-xs text-slate-400 mt-0.5">Template: {res.template}</div>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                {res.atsScore} ATS
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-300 line-clamp-2">{res.summary}</p>

            <div className="mt-4 flex flex-wrap gap-1">
              {res.skills.slice(0, 4).map((s) => (
                <span key={s} className="rounded bg-slate-700/50 px-2 py-0.5 text-[10px]">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center border-t border-slate-700/40 pt-3 text-[11px] text-slate-400">
              <span>Modified: {new Date(res.lastModified).toLocaleDateString()}</span>
              <span className="font-bold text-blue-400 hover:underline">Select & Edit →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderJobsView(
  bgCard: string,
  borderRule: string,
  textMuted: string,
  handleTriggerTailoring: (id: string) => void
) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold">Job Matches with Transparent Explanations</h2>
        <p className="text-xs text-slate-400">Roles scored directly against Avery Chen's verified experience.</p>
      </div>

      <div className="space-y-4">
        {AVERY_JOB_MATCHES.map((job) => (
          <div
            key={job.id}
            style={{ background: bgCard, borderColor: borderRule }}
            className="rounded-xl border p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">{job.roleTitle}</h3>
                  <span className="text-xs text-slate-400">@ {job.companyName}</span>
                  <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-400">
                    {job.matchScore}% Match
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {job.location} • {job.salaryRange} • Posted {job.postedDaysAgo} days ago
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleTriggerTailoring(job.id)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700"
              >
                Enter Tailoring Flow
              </button>
            </div>

            {/* Transparent Match Reasons */}
            <div className="mt-4 border-t border-slate-700/40 pt-3">
              <div className="text-xs font-semibold text-slate-300 mb-2">Transparent Match Attribution:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {job.transparentMatchReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-1.5 rounded bg-slate-800/40 p-2">
                    <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-white">{r.competency} ({r.weightPercent}%)</span>
                      <p className="text-[11px] text-slate-400">{r.contribution}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Honest Gap Notice */}
              <div className="mt-3 rounded bg-amber-950/20 border border-amber-800/30 p-2.5 text-xs flex items-start gap-2">
                <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-amber-300">Honest Competency Gap: {job.honestGap.missingCompetency}</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">{job.honestGap.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderApplicationsView(
  bgCard: string,
  borderRule: string,
  textMuted: string,
  setSelectedAppId: (id: string) => void,
  selectedAppId: string
) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold">Applications Tracker (6 Live Records)</h2>
        <p className="text-xs text-slate-400">Tracking stages, follow-up deadlines, and submitted versions.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {AVERY_APPLICATIONS.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelectedAppId(app.id)}
            style={{
              background: bgCard,
              borderColor: selectedAppId === app.id ? "#3B82F6" : borderRule,
            }}
            className={`cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
              selectedAppId === app.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-bold text-sm text-white">{app.companyName}</span>
                <span className="text-xs text-slate-400 ml-2">— {app.roleTitle}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-400">
                  {app.matchScore}% Match
                </span>
                <span
                  className={`rounded px-2.5 py-0.5 text-xs font-bold uppercase ${
                    app.stage === "interview"
                      ? "bg-purple-500/20 text-purple-400"
                      : app.stage === "preparing"
                      ? "bg-amber-500/20 text-amber-400"
                      : app.stage === "applied"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {app.stage}
                </span>
              </div>
            </div>

            <div className="mt-2 text-xs text-slate-300">{app.notes}</div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-700/40 pt-2 text-[11px] text-slate-400">
              <span>Follow-up Due: <strong>{app.followUpDue}</strong></span>
              <span>Version: <code className="text-slate-300">{app.resumeVersionId}</code></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderSettingsView(bgCard: string, borderRule: string, textMuted: string) {
  return (
    <div style={{ background: bgCard, borderColor: borderRule }} className="rounded-xl border p-6 max-w-2xl">
      <h2 className="text-base font-bold">Account & Profile Settings</h2>
      <p style={{ color: textMuted }} className="text-xs mt-1">
        Distinguishing professional career evidence from security and plan settings.
      </p>

      <div className="mt-5 space-y-4 text-xs">
        <div>
          <label className="font-bold block text-slate-300">Full Name</label>
          <input
            type="text"
            defaultValue={AVERY_CHEN_USER.name}
            className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
          />
        </div>
        <div>
          <label className="font-bold block text-slate-300">Email Address</label>
          <input
            type="email"
            defaultValue={AVERY_CHEN_USER.email}
            disabled
            className="mt-1 w-full rounded border border-slate-800 bg-slate-900 p-2 text-slate-400"
          />
        </div>
        <div>
          <label className="font-bold block text-slate-300">Current Location</label>
          <input
            type="text"
            defaultValue={AVERY_CHEN_USER.location}
            className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
          />
        </div>
        <div className="pt-2">
          <span className="font-bold block text-slate-300">Active Subscription</span>
          <p className="text-slate-400 text-[11px] mt-0.5">
            {AVERY_CHEN_USER.plan} Plan • Valid through {AVERY_CHEN_USER.planExpiry} • 12 credits remaining
          </p>
        </div>
      </div>
    </div>
  );
}

// ── ADDITIONAL REUSABLE SCREEN FAMILY RENDERERS ──

function renderLandingView(
  bgCard: string,
  borderRule: string,
  handleTriggerTailoring: (id: string) => void,
  setActiveTab: (tab: ActiveTabOption) => void
) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Public Landing Hero */}
      <div className="rounded-2xl border p-8 md:p-12 text-center relative overflow-hidden" style={{ background: bgCard, borderColor: borderRule }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 mb-4">
          <span>EVIDENCE-LED RESUME & CAREER INTELLIGENCE</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Your resume, sharpened for <span className="text-blue-400">one exact job.</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Start with the work you have. See what the ATS can read, what the role needs, and every change before it is made.
        </p>

        {/* Static Tagline & Quote Reveal */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span className="font-bold text-slate-200">Evidence, made visible.</span>
          <span>•</span>
          <span>No card required</span>
          <span>•</span>
          <span>PDF, DOCX or text</span>
          <span>•</span>
          <span>You review every change</span>
        </div>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("auth")}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all"
          >
            Check my resume free →
          </button>
          <button
            type="button"
            onClick={() => handleTriggerTailoring("job-match-lattice")}
            className="rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-bold text-slate-200 hover:bg-slate-700 transition-all"
          >
            Tailor to a job (Demo)
          </button>
        </div>
      </div>

      {/* 3-Step Proof Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { step: "01", title: "SOURCE", sub: "Read the record", desc: "Experience, metrics, and achievements remain authentic. Never hallucinate skills." },
          { step: "02", title: "EXPLAIN", sub: "Test against the role", desc: "Gaps stay transparently visible with explicit rationale before committing." },
          { step: "03", title: "CONTROL", sub: "Approve the action", desc: "Every word is reviewed and edited by you. Nothing leaves without human sign-off." },
        ].map((item) => (
          <div key={item.step} className="rounded-xl border p-5" style={{ background: bgCard, borderColor: borderRule }}>
            <div className="text-xs font-mono font-bold text-blue-400">{item.step} • {item.title}</div>
            <div className="text-sm font-bold text-white mt-1">{item.sub}</div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Live Sample Evidence Report Card */}
      <div className="rounded-xl border p-6" style={{ background: bgCard, borderColor: borderRule }}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: borderRule }}>
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase">Interactive Sample Report</span>
            <h3 className="text-base font-bold text-white">Product Manager · Northwind Platform</h3>
            <p className="text-xs text-slate-400">Illustrative parser benchmark based on verified Avery Chen master base.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-blue-400">82</div>
              <div className="text-[10px] text-slate-400">ATS Score</div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("review")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              See Explanation & Edit →
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <span>✓</span>
            <span>Leadership scope is clearly supported (Led team of 14 engineers)</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <span>⚠</span>
            <span>Add experimentation methods from the role brief (Framed transparently)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderAuthView(
  bgCard: string,
  borderRule: string,
  skillsList: string[],
  editedSkill: string,
  setEditedSkill: (s: string) => void,
  handleAddSkill: () => void,
  handleRemoveSkill: (s: string) => void,
  setActiveTab: (tab: ActiveTabOption) => void
) {
  return (
    <div className="max-w-xl mx-auto py-6 space-y-6">
      <div className="rounded-2xl border p-6 md:p-8" style={{ background: bgCard, borderColor: borderRule }}>
        <div className="text-center mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg mb-3">
            R
          </div>
          <h2 className="text-xl font-bold text-white">Welcome to RoleSharp 2.0</h2>
          <p className="text-xs text-slate-400 mt-1">
            Authenticated as <strong>{AVERY_CHEN_USER.name}</strong> ({AVERY_CHEN_USER.email})
          </p>
        </div>

        {/* Onboarding Wizard Simulation */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-200 block mb-1">Target Role Title</label>
            <input
              type="text"
              defaultValue={AVERY_CHEN_USER.targetTitle}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-200 block mb-1">Current Company & Years Experience</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                defaultValue={AVERY_CHEN_USER.currentCompany}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
              />
              <input
                type="text"
                defaultValue={`${AVERY_CHEN_USER.yearsOfExperience} Years`}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-200 block mb-1">
              Core Competencies (Brief Rule: One initial field with "+ Add skill")
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={editedSkill}
                onChange={(e) => setEditedSkill(e.target.value)}
                placeholder="Type a verified skill..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800 p-2 text-white text-xs"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-lg bg-blue-600 px-3 py-2 font-bold text-white hover:bg-blue-700 text-xs shrink-0"
              >
                + Add skill
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-800 border border-slate-700 px-2 py-1 text-[11px] text-slate-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-400 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Demo Account: Premium Plan Active</span>
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700 text-xs"
            >
              Continue to Workspace →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderProfileView(bgCard: string, borderRule: string, _textMuted: string) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-xl border p-6" style={{ background: bgCard, borderColor: borderRule }}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: borderRule }}>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{AVERY_CHEN_USER.name}</h2>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                Verified Candidate
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {AVERY_CHEN_USER.location} • {AVERY_CHEN_USER.currentTitle} at {AVERY_CHEN_USER.currentCompany}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Master Resume Baseline</span>
            <span className="text-lg font-bold text-blue-400">94 / 100 ATS</span>
          </div>
        </div>

        {/* Verified Impact Metrics */}
        <div className="mt-6">
          <h3 className="text-sm font-bold text-white mb-3">12 Verified Career Impact Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {[
              { category: "Product Execution", metric: "42% latency reduction across 2.4M daily telemetry events" },
              { category: "Product Execution", metric: "Zero SLA regressions while scaling streaming pipelines to 18 enterprise accounts" },
              { category: "Leadership & Scope", metric: "Directly led multi-disciplinary team of 14 software and data engineers" },
              { category: "Business Outcomes", metric: "28% contract expansion across 64 enterprise accounts" },
              { category: "Financial Stewardship", metric: "Managed $1.2M cloud infrastructure budget, delivering 18% cost efficiency" },
              { category: "User Activation", metric: "Improved onboarding activation 12% across two quarterly release cycles" },
            ].map((m, idx) => (
              <div key={idx} className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
                <span className="text-[10px] font-mono text-blue-400 block font-bold">{m.category}</span>
                <span className="text-slate-200 mt-1 block font-medium">{m.metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Academic Credentials */}
        <div className="mt-6 border-t border-slate-700/40 pt-4">
          <h3 className="text-sm font-bold text-white mb-2">Education</h3>
          <div className="text-xs text-slate-300">
            <strong>{AVERY_CHEN_USER.education.degree} in {AVERY_CHEN_USER.education.field}</strong>
            <p className="text-slate-400">{AVERY_CHEN_USER.education.institution} • Class of {AVERY_CHEN_USER.education.graduationYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderReviewGateView(
  bgCard: string,
  borderRule: string,
  editedBullet: string,
  setEditedBullet: (b: string) => void,
  isEditingBullet: boolean,
  setIsEditingBullet: (e: boolean) => void,
  handleExecuteGeneration: () => void,
  generationSuccess: boolean,
  setActiveTab: (tab: ActiveTabOption) => void
) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="rounded-xl border p-6 md:p-8" style={{ background: bgCard, borderColor: borderRule }}>
        <div className="border-b pb-4 mb-6" style={{ borderColor: borderRule }}>
          <span className="text-xs font-mono font-bold text-blue-400 uppercase">GOV.UK Pattern Check Answers</span>
          <h2 className="text-xl font-bold text-white mt-1">Review Tailoring Scope Before Generation</h2>
          <p className="text-xs text-slate-400 mt-1">
            Targeting: <strong>Lattice Works — Senior Product Manager</strong> (Distributed Data Platforms)
          </p>
        </div>

        {/* 4 Check Answers Rows */}
        <div className="divide-y divide-slate-800 text-xs">
          <div className="py-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <span className="font-bold text-slate-400 block">1. Target Role & Scope</span>
              <span className="text-white mt-0.5 block">Senior Product Manager • Distributed Data Platforms, Seattle / Hybrid</span>
            </div>
            <span className="text-blue-400 font-bold">Verified</span>
          </div>

          <div className="py-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <span className="font-bold text-slate-400 block">2. Hard Skills Emphasized</span>
              <span className="text-white mt-0.5 block">Spark Streaming, Real-time Data pipelines, gRPC, PRD Roadmaps</span>
            </div>
            <span className="text-blue-400 font-bold">Matched</span>
          </div>

          <div className="py-3 flex flex-wrap items-start justify-between gap-2 bg-amber-500/5 p-2 rounded">
            <div>
              <span className="font-bold text-amber-400 block">3. Honest Gap Acknowledgment</span>
              <span className="text-slate-200 mt-0.5 block">
                ⚠ <strong>Apache Kafka Telemetry:</strong> Gap acknowledged honestly. Framed as: 
                <em>"Extensive architectural experience with streaming pipelines; ramping on native Kafka connectors."</em>
              </span>
            </div>
            <span className="text-amber-400 font-bold">Honest</span>
          </div>

          <div className="py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-400">4. Tailored Experience Bullet (In-Place Edit)</span>
              <button
                type="button"
                onClick={() => setIsEditingBullet(!isEditingBullet)}
                className="text-blue-400 hover:underline font-bold text-xs"
              >
                {isEditingBullet ? "Save Edit" : "Edit Bullet ✎"}
              </button>
            </div>
            {isEditingBullet ? (
              <textarea
                value={editedBullet}
                onChange={(e) => setEditedBullet(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-blue-500 bg-slate-900 p-2.5 text-white text-xs"
              />
            ) : (
              <p className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3 text-slate-200 italic">
                "{editedBullet}"
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("resumes")}
            className="text-xs font-semibold text-slate-400 hover:text-white"
          >
            ← Back to Document Studio
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={generationSuccess}
              onClick={handleExecuteGeneration}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-bold text-white text-xs hover:bg-blue-700 shadow-md transition-all"
            >
              {generationSuccess ? "✓ Generation Complete!" : "Execute Generation (0 Demo Credits) →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderToolsView(bgCard: string, borderRule: string) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-white">Standalone Career Utilities Hub</h2>
        <p className="text-xs text-slate-400 mt-1">
          22 free standalone career tools accessible directly without application state overhead.
        </p>
      </div>

      {/* Interactive Tool Runner: ATS Scanner & Bullet Optimizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-5" style={{ background: bgCard, borderColor: borderRule }}>
          <span className="text-xs font-mono font-bold text-blue-400 uppercase">Utility #1: Free ATS Scanner</span>
          <h3 className="text-sm font-bold text-white mt-1">Quick Document Parse</h3>
          <p className="text-xs text-slate-400 mt-1">Drop a resume to test parser compliance before tailoring.</p>
          <div className="mt-4 rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center">
            <span className="text-xs text-slate-300 block font-medium">Drop PDF, DOCX, or paste text</span>
            <span className="text-[10px] text-slate-500 block mt-1">Safe local parser simulation</span>
            <button
              type="button"
              onClick={() => {}}
              className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
            >
              Scan Sample Document
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-5" style={{ background: bgCard, borderColor: borderRule }}>
          <span className="text-xs font-mono font-bold text-blue-400 uppercase">Utility #2: Bullet Optimizer</span>
          <h3 className="text-sm font-bold text-white mt-1">Metric Enhancer</h3>
          <p className="text-xs text-slate-400 mt-1">Strengthen passive job descriptions with quantifiable evidence.</p>
          <div className="mt-4 space-y-2 text-xs">
            <div className="rounded bg-slate-900/80 p-2.5 border border-slate-800 text-slate-400">
              <span className="font-bold text-slate-300 block mb-0.5">Input bullet:</span>
              "Responsible for managing the team and working on queries."
            </div>
            <div className="rounded bg-blue-950/30 p-2.5 border border-blue-800/40 text-blue-200">
              <span className="font-bold text-blue-400 block mb-0.5">RoleSharp Enhanced Output:</span>
              "Spearheaded real-time query optimizer resulting in 42% query execution speed improvement across 2.4M daily events."
            </div>
          </div>
        </div>
      </div>

      {/* Complete 22 Tools Catalog */}
      <div className="rounded-xl border p-6" style={{ background: bgCard, borderColor: borderRule }}>
        <h3 className="text-sm font-bold text-white mb-4">Complete 22 Utilities Directory</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
          {[
            "ATS Resume Scanner", "Bullet Impact Optimizer", "Cover Letter Generator", "LinkedIn Headline Writer",
            "Salary Benchmark Explorer", "Skills Gap Matcher", "Interview Flash Prep", "Portfolio Builder",
            "Cold Email Drafter", "Follow-Up Tracker", "JD Keyword Extractor", "Executive Bio Formatter",
            "Reference Prep Generator", "Offer Comparison Matrix", "Counter-Offer Simulator", "30-60-90 Day Plan Generator",
            "Resignation Letter Writer", "AI Humanizer", "Embed ATS Checker", "Job Clipper",
            "Career Map Planner", "Application Queue Inspector"
          ].map((tool, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {}}
              className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-2.5 text-left hover:border-blue-500 hover:bg-slate-800 transition-colors"
            >
              <span className="font-semibold text-slate-200 block text-[11px]">{tool}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Standalone Utility</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderContentLegalView(bgCard: string, borderRule: string) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="rounded-xl border p-6" style={{ background: bgCard, borderColor: borderRule }}>
        <h2 className="text-lg font-bold text-white">Content, Knowledge & Legal Resources</h2>
        <p className="text-xs text-slate-400 mt-1">
          Career methodology articles, salary intelligence reports, and legal commitments.
        </p>

        {/* Editorial Articles */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-300">Featured Guides & Salary Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
              <span className="text-[10px] font-mono text-blue-400 block">CAREER INTELLIGENCE</span>
              <span className="font-bold text-white block mt-1">2026 ATS Trends: Why Keyword Stuffing Fails</span>
              <p className="text-slate-400 text-[11px] mt-1">
                Modern applicant tracking systems score verified evidence and metric density over raw keyword frequency.
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
              <span className="text-[10px] font-mono text-blue-400 block">COMPENSATION BENCHMARK</span>
              <span className="font-bold text-white block mt-1">Senior Product Manager Seattle Baseline</span>
              <p className="text-slate-400 text-[11px] mt-1">
                Verified salary bands ranging from $185,000 to $225,000 across distributed data platform employers.
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Privacy Commitments */}
        <div className="mt-6 border-t border-slate-700/40 pt-4 text-xs space-y-2">
          <h3 className="text-sm font-bold text-slate-300">Legal Compliance & Candidate Protection</h3>
          <p className="text-slate-400">
            <strong>Privacy Commitment:</strong> Candidate resume evidence is encrypted at rest and in transit. RoleSharp never monetizes or sells candidate PII to third-party data brokers.
          </p>
          <p className="text-slate-400">
            <strong>Fair Billing Terms:</strong> Premium is sold as fixed-term access (valid through May 15, 2027) with no surprise auto-renewals or hidden fee escalations.
          </p>
        </div>
      </div>
    </div>
  );
}

function renderAdminView(bgCard: string, borderRule: string) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="rounded-xl border p-6" style={{ background: bgCard, borderColor: borderRule }}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: borderRule }}>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-purple-500/20 px-2 py-0.5 text-xs font-bold text-purple-400">
                Staff & Operations Console
              </span>
              <h2 className="text-lg font-bold text-white">System Health & Candidate Ledger</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Internal operator interface (strictly separated from candidate-facing navigation).
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400">Status: All Systems Operational</span>
        </div>

        {/* Operational Metrics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { label: "Active Candidates", val: "1,420", sub: "+14% this month" },
            { label: "Generation Uptime", val: "99.4%", sub: "Zero queue stalls" },
            { label: "Background Queue", val: "12 in-flight", sub: "Avg latency 420ms" },
            { label: "Security Remediations", val: "85/85", sub: "Fail-closed RBAC" },
          ].map((kpi, idx) => (
            <div key={idx} className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{kpi.label}</span>
              <span className="text-lg font-bold text-white block mt-1">{kpi.val}</span>
              <span className="text-[10px] text-emerald-400">{kpi.sub}</span>
            </div>
          ))}
        </div>

        {/* Candidate Audit Row */}
        <div className="mt-6 border-t border-slate-700/40 pt-4 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Audit Ledger (Candidate: Avery Chen)</h3>
          <div className="rounded bg-slate-900 p-3 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
            <div>[2026-11-07 14:22:10 UTC] Session authenticated (RBAC: CANDIDATE_PREMIUM)</div>
            <div>[2026-11-07 14:24:05 UTC] Tailoring generated for job-match-lattice (Deduction: 6% Kafka gap acknowledged)</div>
            <div>[2026-11-07 14:26:18 UTC] Audit receipt recorded: IDEMPOTENCY_OK (Credits Remaining: 12)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
