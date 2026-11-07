import test from "node:test";
import assert from "node:assert/strict";
import {
  AVERY_CHEN_USER,
  AVERY_RESUMES,
  AVERY_APPLICATIONS,
  AVERY_JOB_MATCHES,
} from "../lib/fictional-demo-dataset";
import { TOOL_WORKSPACES, toolWorkspaceForPath } from "../lib/tool-workspaces";

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

test("Commit 17c50e4 tool workspaces define the six canonical task suites", () => {
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
