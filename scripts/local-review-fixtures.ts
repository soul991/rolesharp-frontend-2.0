import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { scryptSync, randomBytes } from "node:crypto";
import {
  AVERY_CHEN_USER,
  AVERY_RESUMES,
  AVERY_APPLICATIONS,
  AVERY_JOB_MATCHES,
  AVERY_NOTIFICATIONS,
  DEMO_REFERENCE_DATE,
} from "../lib/fictional-demo-dataset";

// Security assertion: Never runnable in production
if (process.env.NODE_ENV === "production" && process.env.LOCAL_DEV_MODE !== "true") {
  console.error("FATAL: local-review-fixtures is strictly disabled in production.");
  process.exit(1);
}

const SCRYPT = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 } as const;

function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pw, salt, 64, SCRYPT).toString("hex");
  return `${salt}:${hash}`;
}

const LOCAL_DIR = join(process.cwd(), ".local");
const STORE_FILE = join(LOCAL_DIR, "dev-store.json");
const FIXTURES_FILE = join(LOCAL_DIR, "fictional-review-data.json");

export const FICTIONAL_WORKSPACE = {
  referenceDate: DEMO_REFERENCE_DATE,
  user: AVERY_CHEN_USER,
  resumes: AVERY_RESUMES,
  applications: AVERY_APPLICATIONS,
  jobs: AVERY_JOB_MATCHES,
  notifications: AVERY_NOTIFICATIONS,
  campaign: {
    status: "active",
    targetRole: AVERY_CHEN_USER.targetTitle,
    targetCompany: AVERY_CHEN_USER.targetCompany,
    targetLocations: ["Seattle, WA", "Remote · US"],
    autoApply: false,
    dailyMatchesReceived: 3,
  },
};

async function readStore() {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf8"));
  } catch {
    return { users: [], resumes: [] };
  }
}

async function seed() {
  console.log("Seeding local review environment fixtures for Avery Chen...");
  await mkdir(LOCAL_DIR, { recursive: true });

  const store = await readStore();

  const passwordHash = hashPassword("RoleSharp-Demo-2026!");

  const devUser = {
    id: AVERY_CHEN_USER.id,
    name: AVERY_CHEN_USER.name,
    email: AVERY_CHEN_USER.email,
    passwordHash,
    premiumUntil: "2027-05-15T23:59:59.000Z",
    premiumSource: "paid",
    emailVerifiedAt: new Date().toISOString(),
    credits: AVERY_CHEN_USER.creditsRemaining,
    inviteCode: "averychen",
    createdAt: "2026-06-01T10:00:00.000Z",
  };

  const existingIdx = store.users.findIndex((u: any) => u.email === AVERY_CHEN_USER.email);
  if (existingIdx >= 0) {
    store.users[existingIdx] = devUser;
  } else {
    store.users.push(devUser);
  }

  // Ensure resumes exist
  for (const resume of AVERY_RESUMES) {
    const devResume = {
      id: resume.id,
      userId: AVERY_CHEN_USER.id,
      candidateName: AVERY_CHEN_USER.name,
      atsScore: resume.atsScore,
      template: resume.template,
      premiumUnlock: true,
      creditUsed: true,
      companyName: resume.targetCompany ?? "Fieldnote Software",
      roleTitle: resume.targetRole ?? "Product Manager",
      jdText: resume.summary,
      createdAt: resume.lastModified,
      content: {
        basics: {
          name: AVERY_CHEN_USER.name,
          email: AVERY_CHEN_USER.email,
          location: AVERY_CHEN_USER.location,
          title: resume.targetRole ?? AVERY_CHEN_USER.currentTitle,
          summary: resume.summary,
        },
        skills: resume.skills,
        experience: resume.experience.map((exp) => ({
          company: exp.company,
          position: exp.role,
          startDate: exp.startDate,
          endDate: exp.endDate,
          summary: exp.bullets[0] ?? "",
          highlights: exp.bullets,
        })),
        education: [
          {
            institution: AVERY_CHEN_USER.education.institution,
            area: AVERY_CHEN_USER.education.field,
            studyType: AVERY_CHEN_USER.education.degree,
            startDate: "2017",
            endDate: String(AVERY_CHEN_USER.education.graduationYear),
          },
        ],
      },
    };

    const rIdx = store.resumes.findIndex((r: any) => r.id === resume.id);
    if (rIdx >= 0) {
      store.resumes[rIdx] = devResume;
    } else {
      store.resumes.push(devResume);
    }
  }

  await writeFile(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
  await writeFile(FIXTURES_FILE, JSON.stringify(FICTIONAL_WORKSPACE, null, 2), "utf8");

  console.log("✓ Fictional user seeded: " + AVERY_CHEN_USER.email);
  console.log("✓ Fictional user name: " + AVERY_CHEN_USER.name + " (" + AVERY_CHEN_USER.location + ")");
  console.log("✓ Fictional resumes & applications written to .local/");
}

async function reset() {
  console.log("Resetting local review environment fixtures...");
  await mkdir(LOCAL_DIR, { recursive: true });

  const store = await readStore();
  store.users = store.users.filter((u: any) => u.email !== AVERY_CHEN_USER.email && u.id !== AVERY_CHEN_USER.id);
  store.resumes = store.resumes.filter((r: any) => r.userId !== AVERY_CHEN_USER.id);

  await writeFile(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
  try {
    const { rm } = await import("node:fs/promises");
    await rm(FIXTURES_FILE, { force: true });
  } catch {}

  console.log("✓ Fictional user and review fixtures cleared from local store.");
}

async function main() {
  const command = process.argv[2] ?? "seed";
  if (command === "reset") {
    await reset();
  } else {
    await seed();
  }
}

void main();
