import test from "node:test";
import assert from "node:assert/strict";
import {
  AVERY_CHEN_USER,
  AVERY_RESUMES,
  AVERY_APPLICATIONS,
  AVERY_JOB_MATCHES,
  AVERY_VERIFIED_METRICS,
} from "../lib/fictional-demo-dataset";
import {
  TOOL_WORKSPACES,
  toolWorkspaceForPath,
  CANONICAL_WORKSPACE_ALIASES,
  resolveWorkspaceSlug,
} from "../lib/tool-workspaces";

test("Avery Chen demo dataset conforms to canonical specification", () => {
  assert.equal(AVERY_CHEN_USER.name, "Avery Chen");
  assert.equal(AVERY_CHEN_USER.targetTitle, "Senior Product Manager");
  assert.equal(AVERY_CHEN_USER.targetCompany, "Lattice Works");
  assert.equal(AVERY_CHEN_USER.creditsRemaining, 12);
  assert.equal(AVERY_CHEN_USER.plan, "Premium");

  // 4 resumes: Master (94), Tailored Lattice (88), Tailored Northstar (89), Draft Harbor (78)
  assert.equal(AVERY_RESUMES.length, 4);
  const master = AVERY_RESUMES.find((r) => r.type === "master");
  assert.ok(master);
  assert.equal(master.atsScore, 94);

  const tailoredLattice = AVERY_RESUMES.find((r) => r.id === "resume-avery-tailored-lattice");
  assert.ok(tailoredLattice);
  assert.equal(tailoredLattice.atsScore, 88);
  assert.ok(tailoredLattice.honestGap);
  assert.equal(tailoredLattice.honestGap.requiredSkill, "Kafka Event Stream Telemetry");

  // 6 applications: 4 active + 1 interview + 1 closed
  assert.equal(AVERY_APPLICATIONS.length, 6);
  const interviewApp = AVERY_APPLICATIONS.find((a) => a.stage === "interview");
  assert.ok(interviewApp);
  assert.equal(interviewApp.companyName, "Horizon Analytics");
  assert.equal(interviewApp.roleTitle, "Principal Product Manager");
  assert.equal(interviewApp.matchScore, 91);
});

test("Avery Chen verified evidence metrics anchor exactly 12 candidate facts", () => {
  assert.equal(AVERY_VERIFIED_METRICS.length, 12);
  for (const item of AVERY_VERIFIED_METRICS) {
    assert.ok(item.metric && item.metric.length > 0, "Metric title must be non-empty");
    assert.ok(item.context && item.context.length > 0, "Metric context must be non-empty");
  }
});

test("Applications Tracker dynamic ATS score lookup maintains valid link to resume library", () => {
  for (const app of AVERY_APPLICATIONS) {
    const linkedResume = AVERY_RESUMES.find((r) => r.id === app.resumeVersionId);
    assert.ok(linkedResume, `Linked resume ${app.resumeVersionId} must exist for application ${app.id}`);
    assert.equal(typeof linkedResume.atsScore, "number");
    assert.ok(linkedResume.atsScore >= 70 && linkedResume.atsScore <= 100);
  }
});

test("Commit 17c50e4 tool workspaces define the six canonical task suites and route aliases", () => {
  assert.equal(TOOL_WORKSPACES.length, 6);
  const ids = TOOL_WORKSPACES.map((w) => w.id);
  assert.deepEqual(ids, ["resume", "fit", "linkedin", "letters", "interview", "offers"]);

  // Route resolvers for key paths
  assert.equal(toolWorkspaceForPath("/build")?.id, "resume");
  assert.equal(toolWorkspaceForPath("/checker")?.id, "resume");
  assert.equal(toolWorkspaceForPath("/resume-match")?.id, "fit");
  assert.equal(toolWorkspaceForPath("/linkedin-checker")?.id, "linkedin");
  assert.equal(toolWorkspaceForPath("/cover-letter-generator")?.id, "letters");
  assert.equal(toolWorkspaceForPath("/interview-prep")?.id, "interview");
  assert.equal(toolWorkspaceForPath("/salaries")?.id, "offers");

  // Canonical workspace alias resolution
  assert.equal(CANONICAL_WORKSPACE_ALIASES["resume"], "resume-studio");
  assert.equal(CANONICAL_WORKSPACE_ALIASES["fit"], "jobs-fit");
  assert.equal(CANONICAL_WORKSPACE_ALIASES["interview"], "interview-practice");
  assert.equal(CANONICAL_WORKSPACE_ALIASES["offers"], "salary-offers");

  assert.equal(resolveWorkspaceSlug("resume"), "resume-studio");
  assert.equal(resolveWorkspaceSlug("fit"), "jobs-fit");
  assert.equal(resolveWorkspaceSlug("resume-studio"), "resume-studio");
  assert.equal(resolveWorkspaceSlug("jobs-fit"), "jobs-fit");
});

test("Curated Job Matches provide transparent percentage weighting and honest gaps", () => {
  assert.ok(AVERY_JOB_MATCHES.length >= 1);
  const latticeMatch = AVERY_JOB_MATCHES.find((j) => j.id === "job-match-lattice");
  assert.ok(latticeMatch);
  assert.equal(latticeMatch.matchScore, 88);
  assert.ok(latticeMatch.transparentMatchReasons.length > 0);
  assert.ok(latticeMatch.honestGap);
  assert.equal(latticeMatch.honestGap.missingCompetency, "Kafka Event Stream Telemetry");
});
