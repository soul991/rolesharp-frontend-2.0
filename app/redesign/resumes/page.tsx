"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  FileText,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Plus,
  Edit2,
  Check,
} from "lucide-react";

export default function RedesignResumesPage() {
  const {
    resumes,
    activeResumeId,
    setActiveResumeId,
    updateResumeBullet,
    addSkillToResume,
    theme,
  } = useRedesignStore();

  const isLight = theme === "light";
  const activeResume = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const [editingBullet, setEditingBullet] = useState<{ exp: number; bullet: number } | null>(null);
  const [bulletDraft, setBulletDraft] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);

  const handleStartEdit = (expIdx: number, bIdx: number, initialText: string) => {
    setEditingBullet({ exp: expIdx, bullet: bIdx });
    setBulletDraft(initialText);
  };

  const handleSaveBullet = () => {
    if (editingBullet) {
      updateResumeBullet(activeResume.id, editingBullet.exp, editingBullet.bullet, bulletDraft);
      setEditingBullet(null);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkillToResume(activeResume.id, newSkill.trim());
      setNewSkill("");
      setShowSkillInput(false);
    }
  };

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-inherit">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-1">
              <FileText size={14} /> Resume Studio • Document Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              {activeResume.title}
            </h1>
            <p className={`text-xs mt-0.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Template: <span className="font-mono uppercase font-semibold text-blue-500">{activeResume.template}</span> • Centered 680px paper canvas • Last modified {new Date(activeResume.lastModified).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/redesign/review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all hover:scale-[1.02]"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
              }}
            >
              <Sparkles size={15} /> Tailor for Role &amp; Review Gate
            </Link>
          </div>
        </div>

        {/* Resume Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b"
          style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
        >
          {resumes.map((r) => {
            const isSelected = r.id === activeResume.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveResumeId(r.id)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-all"
                style={{
                  background: isSelected
                    ? isLight
                      ? "#FFFFFF"
                      : "#132A4A"
                    : isLight
                    ? "#FAF9F6"
                    : "#0C213A",
                  borderColor: isSelected
                    ? isLight
                      ? "#123B7A"
                      : "#5B9BFF"
                    : isLight
                    ? "#E5DFD5"
                    : "#1B3654",
                  color: isSelected
                    ? isLight
                      ? "#123B7A"
                      : "#9FC3F2"
                    : isLight
                    ? "#52647A"
                    : "#9FB0C7",
                  fontWeight: isSelected ? 700 : 500,
                }}
              >
                <span className="truncate max-w-[200px]">{r.title}</span>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold"
                  style={{
                    background: r.atsScore >= 90 ? "rgba(5, 150, 105, 0.15)" : "rgba(59, 130, 246, 0.15)",
                    color: r.atsScore >= 90 ? "#059669" : "#3B82F6",
                  }}
                >
                  {r.atsScore} ATS
                </span>
              </button>
            );
          })}
        </div>

        {/* Honest Gap Notice (If Tailored) */}
        {activeResume.honestGap && (
          <div
            className="p-4 rounded-xl border flex items-start gap-3 transition-colors"
            style={{
              background: isLight ? "#FFF7ED" : "#1B221E",
              borderColor: isLight ? "#F59E0B" : "#B45309",
              color: isLight ? "#78350F" : "#FDE68A",
            }}
          >
            <AlertTriangle size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold font-mono uppercase tracking-wider text-[#F59E0B]">
                Transparent Unsupported Skill Gap: {activeResume.honestGap.requiredSkill}
              </span>
              <p className="leading-relaxed opacity-90">{activeResume.honestGap.explanation}</p>
            </div>
          </div>
        )}

        {/* Main Canvas & Inspection Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Centered 680px Paper Canvas (Section 4 & 8) */}
          <div className="lg:col-span-8 flex justify-center">
            <div
              className="w-full max-w-[680px] rounded-2xl border p-8 sm:p-12 shadow-2xl transition-all min-h-[900px]"
              style={{
                background: "#FBFAF9",
                borderColor: isLight ? "#E2DDD4" : "#D5DFEA",
                color: "#10243E",
                boxShadow: "0 20px 45px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* Document Header */}
              <div className="border-b border-inherit pb-6 mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
                  Avery Chen
                </h2>
                <p className="text-xs sm:text-sm font-medium text-blue-500 mt-1">
                  Senior Product Manager • Seattle, WA • avery@rolesharp.example • (206) 555-0192
                </p>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  {activeResume.summary}
                </p>
              </div>

              {/* Skills Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Core Competencies
                  </h3>
                  <button
                    onClick={() => setShowSkillInput(!showSkillInput)}
                    className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1"
                  >
                    <Plus size={13} /> Add skill
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeResume.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-800"
                          : "bg-slate-900 border-slate-800 text-slate-200"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Single Add Skill Input Gate */}
                {showSkillInput && (
                  <form onSubmit={handleAddSkill} className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Distributed Tracing"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className={`flex-1 px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isLight
                          ? "bg-white border-slate-300 text-slate-900"
                          : "bg-slate-900 border-slate-800 text-white"
                      }`}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>

              {/* Work Experience with In-Place Bullet Editing */}
              <div className="space-y-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-inherit pb-1.5">
                  Professional Experience
                </h3>

                {activeResume.experience.map((exp, expIdx) => (
                  <div key={expIdx} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-bold text-sm font-display text-inherit">
                        {exp.role} <span className="text-blue-500">@ {exp.company}</span>
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {exp.startDate} – {exp.endDate} • {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => {
                        const isEditingThis =
                          editingBullet?.exp === expIdx && editingBullet?.bullet === bIdx;

                        return (
                          <li
                            key={bIdx}
                            className={`group relative pl-4 rounded-lg p-2 transition-colors ${
                              isEditingThis
                                ? isLight
                                  ? "bg-blue-50/80 border border-blue-300"
                                  : "bg-blue-950/40 border border-blue-500/40"
                                : "hover:bg-slate-500/5"
                            }`}
                          >
                            <span className="absolute left-1 top-2.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {isEditingThis ? (
                              <div className="space-y-2">
                                <textarea
                                  rows={3}
                                  value={bulletDraft}
                                  onChange={(e) => setBulletDraft(e.target.value)}
                                  className={`w-full p-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isLight
                                      ? "bg-white border-slate-300 text-slate-900"
                                      : "bg-slate-900 border-slate-800 text-white"
                                  }`}
                                />
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setEditingBullet(null)}
                                    className="px-2.5 py-1 rounded text-xs text-slate-400 hover:text-slate-200"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleSaveBullet}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                                  >
                                    <Check size={13} /> Save Bullet
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-3">
                                <span className={isLight ? "text-slate-700" : "text-slate-300"}>
                                  {bullet}
                                </span>
                                <button
                                  onClick={() => handleStartEdit(expIdx, bIdx, bullet)}
                                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-500 transition-opacity p-1"
                                  title="Edit bullet"
                                >
                                  <Edit2 size={13} />
                                </button>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mt-8 pt-6 border-t border-inherit">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Education &amp; Credentials
                </h3>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold">
                    Bachelor of Science, Information Systems • Northbridge University
                  </span>
                  <span className="font-mono text-slate-500">2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Rail: ATS Audit & Next Steps */}
          <div className="lg:col-span-4 space-y-6">
            {/* ATS Score Card */}
            <div
              className="rounded-2xl border p-5 transition-colors"
              style={{
                background: isLight ? "#FBFAF9" : "#0C213A",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b"
                style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-75">
                  ATS Parse Readiness
                </span>
                <span className="text-xs font-bold font-mono text-[#059669]">Verified</span>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div>
                  <div className="text-4xl font-extrabold font-display"
                    style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                  >
                    {activeResume.atsScore}%
                  </div>
                  <p className={`text-xs mt-0.5 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                    Overall parsing compatibility
                  </p>
                </div>
                <div
                  className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-sm font-mono"
                  style={{
                    borderColor: isLight ? "#123B7A" : "#5B9BFF",
                    color: isLight ? "#123B7A" : "#9FC3F2",
                  }}
                >
                  {activeResume.atsScore}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between opacity-80">
                  <span>Standard Header Structure</span>
                  <CheckCircle2 size={14} className="text-[#059669]" />
                </div>
                <div className="flex items-center justify-between opacity-80">
                  <span>Metrics in 100% of Bullets</span>
                  <CheckCircle2 size={14} className="text-[#059669]" />
                </div>
                <div className="flex items-center justify-between opacity-80">
                  <span>Chronological Consistency</span>
                  <CheckCircle2 size={14} className="text-[#059669]" />
                </div>
                <div className="flex items-center justify-between opacity-80">
                  <span>Keyword Density Alignment</span>
                  <span className="font-mono font-semibold text-[#5B9BFF]">89% Match</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t" style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}>
                <Link
                  href="/redesign/review"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                  style={{
                    background: isLight ? "#123B7A" : "#9FC3F2",
                    color: isLight ? "#FFFFFF" : "#071A33",
                  }}
                >
                  <span>Proceed to Review Gate</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Export Capabilities */}
            <div
              className="rounded-2xl border p-5 transition-colors"
              style={{
                background: isLight ? "#FBFAF9" : "#0C213A",
                borderColor: isLight ? "#E5DFD5" : "#1B3654",
              }}
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider opacity-75 mb-3">
                Export ATS-Safe Formats
              </h3>
              <div className="space-y-2">
                {["PDF (ATS Vector Native)", "DOCX (Word Standard)", "Plain UTF-8 Text"].map(
                  (format) => (
                    <button
                      key={format}
                      onClick={() => {}}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-colors hover:scale-[1.01]"
                      style={{
                        background: isLight ? "#FFFFFF" : "#112642",
                        borderColor: isLight ? "#E5DFD5" : "#1B3654",
                        color: isLight ? "#10243E" : "#EFF5FF",
                      }}
                    >
                      <span>{format}</span>
                      <Download size={13} className="opacity-60" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
