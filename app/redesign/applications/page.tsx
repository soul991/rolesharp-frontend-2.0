"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import { DemoApplication } from "@/lib/fictional-demo-dataset";
import {
  Layers,
  Table as TableIcon,
  LayoutGrid,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";

const STAGES: Array<DemoApplication["stage"]> = [
  "saved",
  "preparing",
  "applied",
  "interview",
  "closed",
];

export default function RedesignApplicationsPage() {
  const {
    applications,
    resumes,
    updateApplicationStage,
    updateApplicationNotes,
    theme,
  } = useRedesignStore();

  const isLight = theme === "light";
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedApp, setSelectedApp] = useState<DemoApplication | null>(null);

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b transition-colors"
          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
        >
          <div>
            <div
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              <Layers size={14} />
              <span>Applications Pipeline &amp; Tracker</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Application Tracker
            </h1>
            <p className="text-xs sm:text-sm mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              Dual-view pipeline with linked resume versions, follow-up deadlines, and complete interview notes.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div
            className="flex items-center gap-1 border rounded-lg p-1 transition-colors self-start sm:self-center"
            style={{
              background: isLight ? "#FAF9F6" : "#0A182C",
              borderColor: isLight ? "#E2DDD4" : "#1B3654",
            }}
          >
            <button
              onClick={() => setViewMode("kanban")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all"
              style={{
                background: viewMode === "kanban" ? (isLight ? "#123B7A" : "#9FC3F2") : "transparent",
                color: viewMode === "kanban" ? (isLight ? "#FFFFFF" : "#071A33") : (isLight ? "#52647A" : "#9FB0C7"),
              }}
            >
              <LayoutGrid size={14} /> Kanban Board
            </button>
            <button
              onClick={() => setViewMode("table")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all"
              style={{
                background: viewMode === "table" ? (isLight ? "#123B7A" : "#9FC3F2") : "transparent",
                color: viewMode === "table" ? (isLight ? "#FFFFFF" : "#071A33") : (isLight ? "#52647A" : "#9FB0C7"),
              }}
            >
              <TableIcon size={14} /> Accessible Table
            </button>
          </div>
        </div>

        {/* =========================================================================
            KANBAN BOARD VIEW
            ========================================================================= */}
        {viewMode === "kanban" ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4 items-start">
            {STAGES.map((stage) => {
              const stageApps = applications.filter((a) => a.stage === stage);
              return (
                <div
                  key={stage}
                  className="rounded-2xl border p-3.5 flex flex-col gap-3 min-w-[220px] transition-colors"
                  style={{
                    background: isLight ? "#FAF9F6" : "#0C213A",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                  }}
                >
                  <div
                    className="flex items-center justify-between pb-2.5 border-b"
                    style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: isLight ? "#10243E" : "#EFF5FF" }}
                    >
                      {stage}
                    </span>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full font-bold"
                      style={{
                        background: isLight ? "#E8EEF8" : "#132A4A",
                        color: isLight ? "#123B7A" : "#9FC3F2",
                      }}
                    >
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[380px]">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className="p-4 rounded-xl border cursor-pointer transition-all hover:translate-y-[-1px] hover:shadow-md"
                        style={{
                          background: selectedApp?.id === app.id
                            ? isLight ? "#EAF2FF" : "#132A4A"
                            : isLight ? "#FFFFFF" : "#112642",
                          borderColor: selectedApp?.id === app.id
                            ? isLight ? "#123B7A" : "#9FC3F2"
                            : isLight ? "#E2DDD4" : "#1B3654",
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className="font-bold text-sm tracking-tight leading-snug"
                            style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                          >
                            {app.companyName}
                          </span>
                          <span
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0"
                            style={{
                              background: isLight ? "#E8EEF8" : "#163150",
                              color: isLight ? "#123B7A" : "#9FC3F2",
                            }}
                          >
                            {app.matchScore}%
                          </span>
                        </div>

                        <p className="text-xs mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                          {app.roleTitle}
                        </p>

                        <div className="mt-3 pt-2.5 border-t flex items-center justify-between text-[11px]"
                          style={{ borderColor: isLight ? "#F0ECE6" : "#182C44", color: isLight ? "#52647A" : "#9FB0C7" }}
                        >
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {app.followUpDue}
                          </span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {resumes.find((r) => r.id === app.resumeVersionId)?.atsScore ?? app.matchScore} ATS
                          </span>
                        </div>
                      </div>
                    ))}

                    {stageApps.length === 0 && (
                      <div
                        className="h-28 rounded-xl border border-dashed flex items-center justify-center text-xs opacity-50"
                        style={{ borderColor: isLight ? "#D5DFEA" : "#1B3654" }}
                      >
                        No active records
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* =========================================================================
              ACCESSIBLE TABLE VIEW
              ========================================================================= */
          <div
            className="rounded-2xl border overflow-hidden transition-colors shadow-sm"
            style={{
              background: isLight ? "#FAF9F6" : "#0C213A",
              borderColor: isLight ? "#E2DDD4" : "#1B3654",
            }}
          >
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr
                  className="border-b text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: isLight ? "#F3F0EB" : "#091B30",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                    color: isLight ? "#52647A" : "#9FB0C7",
                  }}
                >
                  <th className="p-4 font-bold">Company &amp; Role</th>
                  <th className="p-4 font-bold">Stage</th>
                  <th className="p-4 font-bold">Linked Resume Version</th>
                  <th className="p-4 font-bold">Match Fit</th>
                  <th className="p-4 font-bold">Next Follow-Up</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody
                className="divide-y"
                style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}
              >
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-slate-500/5 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-bold text-sm" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                        {app.companyName}
                      </p>
                      <p className="text-xs" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                        {app.roleTitle} · {app.location}
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] ${
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
                    </td>
                    <td className="p-4 font-medium" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                      {app.resumeVersionId}
                    </td>
                    <td className="p-4 font-mono font-bold">
                      {app.matchScore}%
                    </td>
                    <td className="p-4" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                      {app.followUpDue}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                        }}
                        className="px-3 py-1 rounded-lg border text-xs font-semibold hover:underline"
                        style={{
                          borderColor: isLight ? "#E2DDD4" : "#1B3654",
                          color: isLight ? "#123B7A" : "#9FC3F2",
                        }}
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================================================================
            SLIDE-OVER APPLICATION DOSSIER DRAWER
            ========================================================================= */}
        {selectedApp && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
            onClick={() => setSelectedApp(null)}
          >
            <div
              className="w-full max-w-lg h-full p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl transition-all"
              style={{
                background: isLight ? "#FAF9F6" : "#0C213A",
                color: isLight ? "#10243E" : "#EFF5FF",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-start justify-between pb-4 border-b"
                style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                    Application Dossier
                  </span>
                  <h2
                    className="text-2xl font-bold tracking-tight mt-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {selectedApp.companyName}
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                    {selectedApp.roleTitle} · {selectedApp.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 rounded-lg opacity-60 hover:opacity-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Stage Modifier */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  Pipeline Stage
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        updateApplicationStage(selectedApp.id, s);
                        setSelectedApp({ ...selectedApp, stage: s });
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs uppercase font-bold border transition-all text-center"
                      style={{
                        background: selectedApp.stage === s
                          ? isLight ? "#123B7A" : "#9FC3F2"
                          : isLight ? "#FFFFFF" : "#112642",
                        borderColor: selectedApp.stage === s
                          ? isLight ? "#123B7A" : "#9FC3F2"
                          : isLight ? "#E2DDD4" : "#1B3654",
                        color: selectedApp.stage === s
                          ? isLight ? "#FFFFFF" : "#071A33"
                          : isLight ? "#52647A" : "#9FB0C7",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div
                className="grid grid-cols-2 gap-3 p-4 rounded-xl border text-xs"
                style={{
                  background: isLight ? "#F3F0EB" : "#112642",
                  borderColor: isLight ? "#E2DDD4" : "#1B3654",
                }}
              >
                <div>
                  <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Match Compatibility</span>
                  <p className="font-mono font-bold text-base text-[#059669]">
                    {selectedApp.matchScore}%
                  </p>
                </div>
                <div>
                  <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Salary Band</span>
                  <p className="font-bold text-base text-inherit">
                    {selectedApp.salaryRange}
                  </p>
                </div>
                <div>
                  <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Follow-up Due</span>
                  <p className="font-semibold text-inherit">
                    {selectedApp.followUpDue}
                  </p>
                </div>
                <div>
                  <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>Application Date</span>
                  <p className="font-semibold text-inherit">
                    {selectedApp.appliedDate || "In Preparation"}
                  </p>
                </div>
              </div>

              {/* Linked Resume Version */}
              <div
                className="p-4 rounded-xl border space-y-2"
                style={{
                  background: isLight ? "#FFFFFF" : "#112642",
                  borderColor: isLight ? "#E2DDD4" : "#1B3654",
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                    Linked Resume Version
                  </span>
                  <span className="text-[#059669] font-bold font-mono">
                    {resumes.find((r) => r.id === selectedApp.resumeVersionId)?.atsScore ?? selectedApp.matchScore} ATS
                  </span>
                </div>
                <p className="font-bold text-sm" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                  {selectedApp.resumeVersionId}
                </p>
                <Link
                  href="/redesign/resumes"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline pt-1"
                  style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                >
                  <span>Open in Resume Studio Canvas</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Notes Editor */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  Interview &amp; Strategy Notes
                </label>
                <textarea
                  rows={4}
                  value={selectedApp.notes}
                  onChange={(e) => {
                    const newNotes = e.target.value;
                    setSelectedApp({ ...selectedApp, notes: newNotes });
                    updateApplicationNotes(selectedApp.id, newNotes);
                  }}
                  className="w-full p-3 rounded-xl border text-xs focus:outline-none leading-relaxed"
                  style={{
                    background: isLight ? "#FFFFFF" : "#112642",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                />
              </div>

              {/* Actions */}
              <div
                className="pt-4 border-t flex items-center justify-between"
                style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
              >
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ color: isLight ? "#52647A" : "#9FB0C7" }}
                >
                  Close Dossier
                </button>
                <Link
                  href="/redesign/review"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-xs shadow-sm transition-all hover:translate-y-[-1px]"
                  style={{
                    background: isLight ? "#123B7A" : "#9FC3F2",
                    color: isLight ? "#FFFFFF" : "#071A33",
                  }}
                >
                  <span>Re-tailor for Role</span>
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
