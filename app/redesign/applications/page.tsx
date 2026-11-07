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
          <div
            className="flex items-center gap-1 border rounded-lg p-1 transition-colors self-start sm:self-center"
            style={{
              background: isLight ? "#F3F0EB" : "#0E2138",
              borderColor: isLight ? "#E5DFD5" : "#1B3654",
            }}
          >
            <button
              onClick={() => setViewMode("kanban")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all"
              style={{
                background: viewMode === "kanban" ? (isLight ? "#123B7A" : "#9FC3F2") : "transparent",
                color: viewMode === "kanban" ? (isLight ? "#FFFFFF" : "#071A33") : (isLight ? "#52647A" : "#9FB0C7"),
              }}
            >
              <LayoutGrid size={14} /> Kanban Board
            </button>
            <button
              onClick={() => setViewMode("table")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all"
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
                  className="rounded-xl border p-3 flex flex-col gap-3 min-w-[220px] transition-colors"
                  style={{
                    background: isLight ? "#FBFAF9" : "#0C213A",
                    borderColor: isLight ? "#E5DFD5" : "#1B3654",
                  }}
                >
                  <div className="flex items-center justify-between pb-2 border-b"
                    style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-75">
                      {stage}
                    </span>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded font-bold"
                      style={{
                        background: isLight ? "#E8EEF8" : "#163150",
                        color: isLight ? "#123B7A" : "#9FC3F2",
                      }}
                    >
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[400px]">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className="p-3.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md"
                        style={{
                          background: selectedApp?.id === app.id
                            ? isLight ? "#EAF2FF" : "#132A4A"
                            : isLight ? "#FFFFFF" : "#112642",
                          borderColor: selectedApp?.id === app.id
                            ? isLight ? "#123B7A" : "#5B9BFF"
                            : isLight ? "#E5DFD5" : "#1B3654",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-xs truncate">{app.companyName}</span>
                          <span className="text-[10px] font-mono font-bold text-[#059669]">
                            {app.matchScore}%
                          </span>
                        </div>

                        <p className="text-xs font-medium truncate mb-2" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                          {app.roleTitle}
                        </p>

                        <div className={`space-y-1 text-[11px] ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                          <p className="flex items-center gap-1">
                            <Clock size={11} /> Due: {app.followUpDue}
                          </p>
                          <p className="flex items-center gap-1">
                            <DollarSign size={11} /> {app.salaryRange}
                          </p>
                        </div>

                        {app.stage === "interview" && (
                          <div className="mt-2 pt-2 border-t flex items-center gap-1 text-[10px] font-bold text-[#F59E0B]"
                            style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
                          >
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
            className="rounded-2xl border overflow-x-auto transition-colors"
            style={{
              background: isLight ? "#FBFAF9" : "#0C213A",
              borderColor: isLight ? "#E5DFD5" : "#1B3654",
            }}
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b font-mono uppercase tracking-wider opacity-75"
                  style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
                >
                  <th scope="col" className="p-4">Company &amp; Role</th>
                  <th scope="col" className="p-4">Pipeline Stage</th>
                  <th scope="col" className="p-4">Match Score</th>
                  <th scope="col" className="p-4">Linked Resume</th>
                  <th scope="col" className="p-4">Follow-Up Due</th>
                  <th scope="col" className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-slate-500/5 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-sm text-inherit">{app.companyName}</div>
                      <div className="font-medium mt-0.5" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
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
              className="w-full max-w-lg h-full overflow-y-auto p-6 sm:p-8 border-l space-y-6 shadow-2xl transition-all"
              style={{
                background: isLight ? "#FBFAF9" : "#0C213A",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b"
                style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
              >
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                  >
                    Application Dossier
                  </span>
                  <h2 className="text-2xl font-bold font-display mt-0.5 tracking-tight">
                    {selectedApp.companyName}
                  </h2>
                  <p className={`text-xs mt-1 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                    {selectedApp.roleTitle} • {selectedApp.location}
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
                <label className="block text-xs font-mono font-bold uppercase tracking-wider opacity-75 mb-2">
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
                      className="px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold border transition-all"
                      style={{
                        background: selectedApp.stage === s
                          ? isLight ? "#123B7A" : "#9FC3F2"
                          : isLight ? "#FFFFFF" : "#112642",
                        borderColor: selectedApp.stage === s
                          ? isLight ? "#123B7A" : "#5B9BFF"
                          : isLight ? "#E5DFD5" : "#1B3654",
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
                  borderColor: isLight ? "#E5DFD5" : "#1B3654",
                }}
              >
                <div>
                  <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Match Compatibility</span>
                  <p className="font-mono font-bold text-base text-[#059669]">
                    {selectedApp.matchScore}%
                  </p>
                </div>
                <div>
                  <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Salary Band</span>
                  <p className="font-mono font-bold text-base text-inherit">
                    {selectedApp.salaryRange}
                  </p>
                </div>
                <div>
                  <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Follow-up Due</span>
                  <p className="font-mono font-semibold text-inherit">
                    {selectedApp.followUpDue}
                  </p>
                </div>
                <div>
                  <span className={isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}>Application Date</span>
                  <p className="font-mono font-semibold text-inherit">
                    {selectedApp.appliedDate || "In Preparation"}
                  </p>
                </div>
              </div>

              {/* Linked Resume Version */}
              <div
                className="p-4 rounded-xl border space-y-2"
                style={{
                  background: isLight ? "#FFFFFF" : "#112642",
                  borderColor: isLight ? "#E5DFD5" : "#1B3654",
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold uppercase tracking-wider opacity-75">
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
                  style={{ color: isLight ? "#123B7A" : "#5B9BFF" }}
                >
                  <span>Open in Resume Studio Canvas</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Notes Editor */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider opacity-75 mb-1.5">
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
                  className="w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  style={{
                    background: isLight ? "#FFFFFF" : "#0E2138",
                    borderColor: isLight ? "#E5DFD5" : "#1B3654",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t flex items-center justify-between"
                style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
              >
                <button
                  onClick={() => setSelectedApp(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${isLight ? "text-[#52647A] hover:text-[#10243E]" : "text-[#9FB0C7] hover:text-white"}`}
                >
                  Close Dossier
                </button>
                <Link
                  href="/redesign/review"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
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
