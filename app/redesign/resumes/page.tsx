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
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b transition-colors"
          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
        >
          <div>
            <div
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              <FileText size={14} />
              <span>Resume Studio · Document Workspace</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {activeResume.title}
            </h1>
            <p className="text-xs mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              Template:{" "}
              <span className="font-semibold uppercase" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                {activeResume.template}
              </span>{" "}
              · ATS Vector Optimized · Last saved {activeResume.lastModified.slice(0, 10)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/redesign/review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all hover:translate-y-[-1px]"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
              }}
            >
              <Sparkles size={15} />
              <span>Tailor for Role &amp; Review Gate</span>
            </Link>
          </div>
        </div>

        {/* Resume Selector Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 border-b"
          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
        >
          {resumes.map((r) => {
            const isSelected = r.id === activeResume.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveResumeId(r.id)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-all"
                style={{
                  background: isSelected
                    ? isLight
                      ? "#FFFFFF"
                      : "#112642"
                    : isLight
                    ? "#FAF9F6"
                    : "#0C213A",
                  borderColor: isSelected
                    ? isLight
                      ? "#123B7A"
                      : "#9FC3F2"
                    : isLight
                    ? "#E2DDD4"
                    : "#1B3654",
                  color: isSelected
                    ? isLight
                      ? "#123B7A"
                      : "#9FC3F2"
                    : isLight
                    ? "#52647A"
                    : "#9FB0C7",
                  fontWeight: isSelected ? 700 : 500,
                  boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                }}
              >
                <span className="truncate max-w-[200px]">{r.title}</span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: r.atsScore >= 90 ? "rgba(5, 150, 105, 0.15)" : "rgba(18, 59, 122, 0.15)",
                    color: r.atsScore >= 90 ? (isLight ? "#047857" : "#34D399") : (isLight ? "#123B7A" : "#9FC3F2"),
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
            className="p-4 rounded-xl border-t-2 flex items-start gap-3 transition-colors"
            style={{
              background: isLight ? "#FFF7E6" : "#241D12",
              borderTopColor: "#E3A737",
              color: isLight ? "#854600" : "#FDE68A",
            }}
          >
            <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: isLight ? "#854600" : "#F6C75B" }} />
            <div className="text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-inherit">
                Transparent Unsupported Skill Note: {activeResume.honestGap.requiredSkill}
              </span>
              <p className="leading-relaxed opacity-90">{activeResume.honestGap.explanation}</p>
            </div>
          </div>
        )}

        {/* Main Canvas & Inspection Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Centered Document Canvas */}
          <div className="lg:col-span-8 flex justify-center">
            <div
              className="w-full max-w-[680px] rounded-2xl border p-8 sm:p-12 shadow-xl transition-all min-h-[900px]"
              style={{
                background: "#FBFAF9",
                borderColor: "#D5DFEA",
                color: "#10243E",
                boxShadow: "0 16px 36px -10px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Document Header */}
              <div className="border-b border-[#D5DFEA] pb-6 mb-6">
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-[#10243E]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Avery Chen
                </h2>
                <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: "#123B7A" }}>
                  Senior Product Manager · Seattle, WA · avery@rolesharp.example · (206) 555-0192
                </p>
                <p className="text-xs text-[#52647A] mt-3 leading-relaxed">
                  {activeResume.summary}
                </p>
              </div>

              {/* Skills Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B7A]">
                    Core Competencies
                  </h3>
                  <button
                    onClick={() => setShowSkillInput(!showSkillInput)}
                    className="text-xs font-semibold hover:underline flex items-center gap-1"
                    style={{ color: "#123B7A" }}
                  >
                    <Plus size={13} /> Add skill
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeResume.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-lg border font-medium bg-[#FFFFFF] border-[#D5DFEA] text-[#10243E]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Add Skill Input Form */}
                {showSkillInput && (
                  <form onSubmit={handleAddSkill} className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Distributed Tracing"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-[#D5DFEA] bg-[#FFFFFF] text-xs font-medium text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg text-white text-xs font-bold bg-[#123B7A]"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>

              {/* Experience Section */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B7A]">
                  Professional Experience
                </h3>

                {activeResume.experience.map((exp, expIdx) => (
                  <div key={expIdx} className="space-y-2 border-b border-[#EAE5DC] pb-4 last:border-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h4 className="text-sm font-bold text-[#10243E]">{exp.role}</h4>
                        <p className="text-xs font-medium text-[#123B7A]">
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                      <span className="text-xs text-[#52647A] font-medium">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>

                    <ul className="space-y-2 mt-2">
                      {exp.bullets.map((bullet, bIdx) => {
                        const isEditing =
                          editingBullet?.exp === expIdx && editingBullet?.bullet === bIdx;

                        return (
                          <li
                            key={bIdx}
                            className="group text-xs leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#123B7A]"
                          >
                            {isEditing ? (
                              <div className="space-y-2 my-1">
                                <textarea
                                  value={bulletDraft}
                                  onChange={(e) => setBulletDraft(e.target.value)}
                                  className="w-full p-2.5 text-xs rounded-lg border border-[#3B82F6] bg-white text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                                  rows={3}
                                />
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={handleSaveBullet}
                                    className="px-3 py-1 rounded bg-[#123B7A] text-white text-xs font-semibold flex items-center gap-1"
                                  >
                                    <Check size={12} /> Save
                                  </button>
                                  <button
                                    onClick={() => setEditingBullet(null)}
                                    className="px-3 py-1 rounded border border-[#D5DFEA] text-[#52647A] text-xs font-semibold"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-3">
                                <span className="text-[#10243E]">{bullet}</span>
                                <button
                                  onClick={() => handleStartEdit(expIdx, bIdx, bullet)}
                                  className="opacity-0 group-hover:opacity-100 text-[#52647A] hover:text-[#123B7A] transition-opacity p-1"
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
              <div className="mt-8 pt-6 border-t border-[#D5DFEA]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B7A] mb-2">
                  Education &amp; Credentials
                </h3>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-[#10243E]">
                    Bachelor of Science, Information Systems · Northbridge University
                  </span>
                  <span className="text-[#52647A]">2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Rail: ATS Audit & Export Options */}
          <div className="lg:col-span-4 space-y-6">
            {/* ATS Score Card */}
            <div
              className="rounded-2xl border p-6 transition-colors"
              style={{
                background: isLight ? "#FAF9F6" : "#0C213A",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <div
                className="flex items-center justify-between pb-3 border-b"
                style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
              >
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  ATS Parse Readiness
                </span>
                <span className="text-xs font-bold" style={{ color: isLight ? "#059669" : "#34D399" }}>
                  Verified
                </span>
              </div>

              <div className="my-5 flex items-center justify-between">
                <div>
                  <div
                    className="text-4xl font-extrabold"
                    style={{ fontFamily: "var(--font-display)", color: isLight ? "#123B7A" : "#9FC3F2" }}
                  >
                    {activeResume.atsScore}%
                  </div>
                  <p className="text-xs mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                    Overall parsing compatibility
                  </p>
                </div>
                <div
                  className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-sm font-mono"
                  style={{
                    borderColor: isLight ? "#123B7A" : "#9FC3F2",
                    color: isLight ? "#123B7A" : "#9FC3F2",
                  }}
                >
                  {activeResume.atsScore}
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                  <span>Standard Header Structure</span>
                  <CheckCircle2 size={14} className="text-[#059669]" />
                </div>
                <div className="flex items-center justify-between" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                  <span>Metrics in 100% of Bullets</span>
                  <CheckCircle2 size={14} className="text-[#059669]" />
                </div>
                <div className="flex items-center justify-between" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                  <span>Chronological Consistency</span>
                  <CheckCircle2 size={14} className="text-[#059669]" />
                </div>
                <div className="flex items-center justify-between" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                  <span>Keyword Density Alignment</span>
                  <span className="font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                    89% Match
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}>
                <Link
                  href="/redesign/review"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs shadow-sm transition-all hover:translate-y-[-1px]"
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
              className="rounded-2xl border p-6 transition-colors"
              style={{
                background: isLight ? "#FAF9F6" : "#0C213A",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
              }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                Export ATS-Safe Formats
              </h3>
              <div className="space-y-2.5">
                {["PDF (ATS Vector Native)", "DOCX (Word Standard)", "Plain UTF-8 Text"].map(
                  (format) => (
                    <button
                      key={format}
                      onClick={() => {}}
                      className="w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all hover:translate-x-0.5"
                      style={{
                        background: isLight ? "#FFFFFF" : "#112642",
                        borderColor: isLight ? "#E2DDD4" : "#1B3654",
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
