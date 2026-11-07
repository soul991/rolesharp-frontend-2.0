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
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b transition-colors"
          style={{ borderColor: isLight ? "#E2DDD4" : "#1B3654" }}
        >
          <div>
            <div
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              <User size={14} />
              <span>Career Profile &amp; Grounded Evidence</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {user.name}
            </h1>
            <p className="text-xs sm:text-sm mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              {user.currentTitle} @ {user.currentCompany} · Target: {user.targetTitle} @ {user.targetCompany}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: isLight ? "#ECFDF5" : "#0D2A22",
                color: isLight ? "#047857" : "#34D399",
                border: "1px solid rgba(52, 211, 153, 0.2)",
              }}
            >
              <ShieldCheck size={14} /> 12 Verified Evidence Anchors
            </span>
          </div>
        </div>

        {/* Profile Card */}
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
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-sm shrink-0"
                style={{
                  background: isLight ? "#123B7A" : "#9FC3F2",
                  color: isLight ? "#FFFFFF" : "#071A33",
                }}
              >
                AC
              </div>
              <div>
                <h2
                  className="text-xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                >
                  {user.name}
                </h2>
                <p className="text-xs font-semibold" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                  {user.email}
                </p>
                <p className="text-xs mt-0.5" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                  {user.location} · {user.yearsOfExperience} Years Verified Product Experience
                </p>
              </div>
            </div>

            <Link
              href="/redesign/resumes"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold shadow-sm transition-all hover:translate-y-[-1px] self-start sm:self-center"
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
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-3.5"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              Verified Impact Metrics (Grounded Evidence)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVERY_VERIFIED_METRICS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border text-xs space-y-1 transition-colors"
                  style={{
                    background: isLight ? "#FFFFFF" : "#112642",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold font-mono text-[#059669]">
                    <CheckCircle2 size={13} /> {item.metric}
                  </div>
                  <p className="text-[11px] leading-tight" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Single Input Gate */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}>
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
              >
                Core Competencies
              </h3>
              {!showSkillInput && (
                <button
                  onClick={() => setShowSkillInput(true)}
                  className="text-xs font-semibold hover:underline flex items-center gap-1"
                  style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
                >
                  <Plus size={13} /> Add skill
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors"
                  style={{
                    background: isLight ? "#FFFFFF" : "#112642",
                    borderColor: isLight ? "#E2DDD4" : "#1B3654",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {showSkillInput && (
              <form onSubmit={handleAddSkill} className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Distributed Tracing"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none"
                  style={{
                    background: isLight ? "#FFFFFF" : "#112642",
                    borderColor: isLight ? "#D5DFEA" : "#1B3654",
                    color: isLight ? "#10243E" : "#EFF5FF",
                  }}
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg text-white text-xs font-bold"
                  style={{
                    background: isLight ? "#123B7A" : "#9FC3F2",
                    color: isLight ? "#FFFFFF" : "#071A33",
                  }}
                >
                  Add
                </button>
              </form>
            )}
          </div>

          {/* Education */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}
            >
              Education &amp; Credentials
            </h3>
            <div className="flex items-baseline justify-between text-xs">
              <span className="font-semibold flex items-center gap-2" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                <GraduationCap size={15} style={{ color: isLight ? "#123B7A" : "#9FC3F2" }} />
                <span>Bachelor of Science, Information Systems · Northbridge University</span>
              </span>
              <span style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>2021</span>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
