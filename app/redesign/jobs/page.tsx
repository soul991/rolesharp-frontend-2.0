"use client";

import Link from "next/link";
import { WorkspaceLayout } from "@/components/redesign/WorkspaceLayout";
import { useRedesignStore } from "@/lib/redesign-store";
import {
  Briefcase,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  MapPin,
  Clock,
} from "lucide-react";

export default function RedesignJobsPage() {
  const { jobMatches, theme } = useRedesignStore();
  const isLight = theme === "light";

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
              <Briefcase size={14} />
              <span>Jobs &amp; Fit Workspace</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Curated Role Matches
            </h1>
            <p className="text-xs sm:text-sm mt-1" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
              Transparent percentage match reasoning with explicit gap notifications before tailoring.
            </p>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-6">
          {jobMatches.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border p-6 sm:p-7 transition-all"
              style={{
                background: isLight ? "#FAF9F6" : "#0C213A",
                borderColor: isLight ? "#E2DDD4" : "#1B3654",
                boxShadow: isLight
                  ? "0 10px 25px -8px rgba(0, 0, 0, 0.05)"
                  : "0 16px 36px -12px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b"
                style={{ borderColor: isLight ? "#E2DDD4" : "#182C44" }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-xl font-bold tracking-tight"
                      style={{ fontFamily: "var(--font-display)", color: isLight ? "#10243E" : "#EFF5FF" }}
                    >
                      {job.roleTitle}
                    </h2>
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: isLight ? "#E8EEF8" : "#163150",
                        color: isLight ? "#123B7A" : "#9FC3F2",
                      }}
                    >
                      {job.companyName}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs mt-2" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                    <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign size={13} /> {job.salaryRange}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> Posted {job.postedDaysAgo} days ago</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-[#059669]">
                      {job.matchScore}%
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                      Calculated Fit
                    </span>
                  </div>
                  <Link
                    href="/redesign/review"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-xs shadow-sm transition-all hover:translate-y-[-1px]"
                    style={{
                      background: isLight ? "#123B7A" : "#9FC3F2",
                      color: isLight ? "#FFFFFF" : "#071A33",
                    }}
                  >
                    <span>Tailor Resume</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Transparent Breakdown Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
                {/* Match Reasons */}
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                    Transparent Match Weighting
                  </span>
                  <div className="space-y-2">
                    {job.transparentMatchReasons.map((reason, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border text-xs flex items-start justify-between gap-3 transition-colors"
                        style={{
                          background: isLight ? "#FFFFFF" : "#112642",
                          borderColor: isLight ? "#E2DDD4" : "#1B3654",
                        }}
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-sm" style={{ color: isLight ? "#10243E" : "#EFF5FF" }}>
                              {reason.competency}
                            </span>
                            <p className="mt-0.5 text-xs" style={{ color: isLight ? "#52647A" : "#9FB0C7" }}>
                              {reason.contribution}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold shrink-0 text-sm" style={{ color: isLight ? "#123B7A" : "#9FC3F2" }}>
                          +{reason.weightPercent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Honest Gap */}
                <div className="lg:col-span-5 space-y-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    style={{ color: isLight ? "#854600" : "#F6C75B" }}
                  >
                    <AlertTriangle size={13} />
                    <span>Honest Competency Gap</span>
                  </span>
                  <div
                    className="p-4 rounded-xl border-t-2 text-xs space-y-2 transition-colors"
                    style={{
                      background: isLight ? "#FFF7E6" : "#241D12",
                      borderTopColor: "#E3A737",
                      color: isLight ? "#854600" : "#FDE68A",
                    }}
                  >
                    <span className="font-bold text-sm block">
                      {job.honestGap.missingCompetency}
                    </span>
                    <p className="leading-relaxed opacity-90">{job.honestGap.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
