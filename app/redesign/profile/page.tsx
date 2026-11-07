"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import { AVERY_VERIFIED_METRICS } from "@/lib/fictional-demo-dataset";
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Plus,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function RedesignProfilePage() {
  const { user, theme } = useRedesignStore();
  const isLight = theme === "light";

  const [skills, setSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setShowSkillInput(false);
    }
  };

  return (
    <WorkspaceLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-inherit">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-500 mb-1">
              <User size={14} /> Career Profile &amp; Grounded Evidence
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              {user.name}
            </h1>
            <p className={`text-xs mt-0.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {user.currentTitle} @ {user.currentCompany} • Target: {user.targetTitle} @ {user.targetCompany}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <ShieldCheck size={14} /> 12 Verified Evidence Anchors
            </span>
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="rounded-2xl border p-6 sm:p-8 transition-colors"
          style={{
            background: isLight ? "#FBFAF9" : "#0C213A",
            borderColor: isLight ? "#E5DFD5" : "#1B3654",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b"
            style={{ borderColor: isLight ? "#E5DFD5" : "#182C44" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md shrink-0"
                style={{
                  background: isLight ? "#123B7A" : "#9FC3F2",
                  color: isLight ? "#FFFFFF" : "#071A33",
                }}
              >
                AC
              </div>
              <div>
                <h2 className="text-xl font-bold font-display tracking-tight">{user.name}</h2>
                <p className="text-xs font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>{user.email}</p>
                <p className={`text-xs mt-0.5 ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>
                  {user.location} • {user.yearsOfExperience} Years Experience
                </p>
              </div>
            </div>

            <Link
              href="/redesign/resumes"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold shadow-md transition-all hover:scale-[1.02] self-start sm:self-center"
              style={{
                background: isLight ? "#123B7A" : "#9FC3F2",
                color: isLight ? "#FFFFFF" : "#071A33",
              }}
            >
              <span>Open Master Resume</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 12 Verified Impact Metrics Grid */}
          <div className="mt-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider opacity-75 mb-3">
              Verified Impact Metrics (Grounded Evidence)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVERY_VERIFIED_METRICS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border text-xs space-y-1 transition-colors"
                  style={{
                    background: isLight ? "#FFFFFF" : "#112642",
                    borderColor: isLight ? "#E5DFD5" : "#1B3654",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[#059669] font-bold font-mono">
                    <CheckCircle2 size={13} /> {item.metric}
                  </div>
                  <p className={`text-[11px] leading-tight ${isLight ? "text-[#52647A]" : "text-[#9FB0C7]"}`}>{item.context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Single Input Gate */}
          <div className="mt-8 pt-6 border-t border-inherit">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Core Competencies
              </h3>
              {!showSkillInput && (
                <button
                  onClick={() => setShowSkillInput(true)}
                  className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1"
                >
                  <Plus size={13} /> Add skill
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-800"
                      : "bg-slate-900 border-slate-800 text-slate-200"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {showSkillInput && (
              <form onSubmit={handleAddSkill} className="mt-3 flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="e.g. Telemetry Instrumentation"
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
                <button
                  type="button"
                  onClick={() => setShowSkillInput(false)}
                  className="px-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>

          {/* Education */}
          <div className="mt-8 pt-6 border-t border-inherit">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Education &amp; Degrees
            </h3>
            <div
              className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/40 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="font-bold text-inherit">{user.education.degree} in {user.education.field}</p>
                  <p className="text-slate-400">{user.education.institution}</p>
                </div>
              </div>
              <span className="font-mono font-semibold text-slate-500">Class of {user.education.graduationYear}</span>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
