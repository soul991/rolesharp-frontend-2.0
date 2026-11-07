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
  Calendar,
  DollarSign,
  FileText,
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-inherit">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-1">
              <Layers size={14} /> Applications Pipeline &amp; Tracker
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Application Tracker
            </h1>
            <p className={`text-xs mt-0.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Dual-view pipeline with linked resume versions, follow-up deadlines, and complete interview notes.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 border border-inherit rounded-xl p-1 bg-slate-500/5 self-start sm:self-center">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "kanban"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-inherit"
              }`}
            >
              <LayoutGrid size={14} /> Kanban Board
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "table"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-inherit"
              }`}
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
                  className={`rounded-xl border p-3 flex flex-col gap-3 min-w-[220px] transition-colors ${
                    isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-inherit">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      {stage}
                    </span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[400px]">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md ${
                          selectedApp?.id === app.id
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : isLight
                            ? "bg-white border-slate-200"
                            : "bg-slate-900/60 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-xs truncate">{app.companyName}</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-500">
                            {app.matchScore}%
                          </span>
                        </div>

                        <p className="text-xs text-blue-500 font-medium truncate mb-2">
                          {app.roleTitle}
                        </p>

                        <div className="space-y-1 text-[11px] text-slate-400">
                          <p className="flex items-center gap-1">
                            <Clock size={11} /> Due: {app.followUpDue}
                          </p>
                          <p className="flex items-center gap-1">
                            <DollarSign size={11} /> {app.salaryRange}
                          </p>
                        </div>

                        {app.stage === "interview" && (
                          <div className="mt-2 pt-2 border-t border-inherit flex items-center gap-1 text-[10px] font-bold text-amber-500">
                            <Calendar size={11} /> Interview: Nov 10 @ 2:00 PM
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* =========================================================================
              ACCESSIBLE SEMANTIC TABLE VIEW (Section 4 & 8)
              ========================================================================= */
          <div
            className={`rounded-2xl border overflow-x-auto transition-colors ${
              isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
            }`}
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-inherit font-mono uppercase tracking-wider text-slate-400">
                  <th scope="col" className="p-4">Company &amp; Role</th>
                  <th scope="col" className="p-4">Pipeline Stage</th>
                  <th scope="col" className="p-4">Match Score</th>
                  <th scope="col" className="p-4">Linked Resume</th>
                  <th scope="col" className="p-4">Follow-Up Due</th>
                  <th scope="col" className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-slate-500/5 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-sm text-inherit">{app.companyName}</div>
                      <div className="text-blue-500 font-medium mt-0.5">
                        {app.roleTitle} • {app.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
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
                    </td>
                    <td className="p-4 font-mono font-bold text-sm text-emerald-500">
                      {app.matchScore}%
                    </td>
                    <td className="p-4 font-mono text-slate-400">
                      <span className="flex items-center gap-1 hover:text-blue-500">
                        <FileText size={12} /> {app.resumeVersionId}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-400">
                      {app.followUpDue}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-inherit hover:bg-blue-500/10 hover:text-blue-500 font-semibold"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================================================================
            APPLICATION DOSSIER SLIDE-OVER DRAWER
            ========================================================================= */}
        {selectedApp && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
            onClick={() => setSelectedApp(null)}
          >
            <div
              className={`w-full max-w-lg h-full overflow-y-auto p-6 sm:p-8 border-l space-y-6 ${
                isLight ? "bg-[#FAF9F6] border-[#E2E0D8]" : "bg-[#0A1220] border-[#182334]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-inherit">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500">
                    Application Dossier
                  </span>
                  <h2 className="text-2xl font-bold font-display mt-0.5">
                    {selectedApp.companyName}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedApp.roleTitle} • {selectedApp.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Stage Modifier */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Pipeline Stage
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        updateApplicationStage(selectedApp.id, s);
                        setSelectedApp({ ...selectedApp, stage: s });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold border transition-all ${
                        selectedApp.stage === s
                          ? "bg-blue-600 text-white border-blue-500"
                          : isLight
                          ? "bg-white border-slate-200 text-slate-700"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-inherit bg-slate-500/5 text-xs">
                <div>
                  <span className="text-slate-400">Match Compatibility</span>
                  <p className="font-mono font-bold text-base text-emerald-500">
                    {selectedApp.matchScore}%
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Salary Band</span>
                  <p className="font-mono font-bold text-base text-inherit">
                    {selectedApp.salaryRange}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Follow-up Due</span>
                  <p className="font-mono font-semibold text-inherit">
                    {selectedApp.followUpDue}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Application Date</span>
                  <p className="font-mono font-semibold text-inherit">
                    {selectedApp.appliedDate || "In Preparation"}
                  </p>
                </div>
              </div>

              {/* Linked Resume Version */}
              <div className="p-4 rounded-xl border border-inherit space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-400">
                    Linked Resume Version
                  </span>
                  <span className="text-emerald-500 font-bold font-mono">
                    {resumes.find((r) => r.id === selectedApp.resumeVersionId)?.atsScore ?? selectedApp.matchScore} ATS
                  </span>
                </div>
                <p className="font-bold text-sm text-blue-500">{selectedApp.resumeVersionId}</p>
                <Link
                  href="/redesign/resumes"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-1"
                >
                  Open in Resume Studio Canvas <ArrowRight size={13} />
                </Link>
              </div>

              {/* Notes Editor */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
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
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed ${
                    isLight
                      ? "bg-white border-slate-300 text-slate-900"
                      : "bg-slate-900 border-slate-800 text-white"
                  }`}
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-inherit flex items-center justify-between">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close Dossier
                </button>
                <Link
                  href="/redesign/review"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500"
                >
                  Re-tailor for Role <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
