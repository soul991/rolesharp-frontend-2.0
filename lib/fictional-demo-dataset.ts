/**
 * RoleSharp 2.0 Unified Fictional Demo Dataset
 * 
 * Implements Section 8 of the RoleSharp redesign specification.
 * Demo User: Avery Chen (Seattle, WA)
 * Reference Demo Date: 2026-11-07
 */

export const DEMO_REFERENCE_DATE = "2026-11-07";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  location: string;
  currentTitle: string;
  currentCompany: string;
  targetTitle: string;
  targetCompany: string;
  yearsOfExperience: number;
  education: {
    degree: string;
    field: string;
    institution: string;
    graduationYear: number;
  };
  skills: string[];
  creditsRemaining: number;
  plan: "Free" | "Premium" | "Student";
  planExpiry: string;
}

export interface DemoResume {
  id: string;
  title: string;
  type: "master" | "tailored" | "draft";
  targetJobId?: string;
  targetRole?: string;
  targetCompany?: string;
  atsScore: number;
  template: string;
  lastModified: string;
  status: "complete" | "draft" | "review_needed";
  summary: string;
  skills: string[];
  honestGap?: {
    requiredSkill: string;
    explanation: string;
    status: "unsupported_gap";
  };
  experience: Array<{
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }>;
}

export interface DemoApplication {
  id: string;
  companyName: string;
  roleTitle: string;
  stage: "saved" | "preparing" | "applied" | "interview" | "closed";
  matchScore: number;
  appliedDate?: string;
  followUpDue: string;
  interviewDate?: string;
  resumeVersionId: string;
  notes: string;
  salaryRange: string;
  location: string;
}

export interface DemoJobMatch {
  id: string;
  companyName: string;
  roleTitle: string;
  location: string;
  salaryRange: string;
  matchScore: number;
  transparentMatchReasons: Array<{
    competency: string;
    contribution: string;
    weightPercent: number;
  }>;
  honestGap: {
    missingCompetency: string;
    recommendation: string;
  };
  postedDaysAgo: number;
  status: "new" | "saved" | "applied";
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "match" | "interview" | "limit" | "system";
  actionHref?: string;
}

export interface VerifiedEvidenceMetric {
  metric: string;
  context: string;
}

export const AVERY_VERIFIED_METRICS: VerifiedEvidenceMetric[] = [
  { metric: "12% Activation Lift", context: "Fieldnote onboarding release experiment" },
  { metric: "24 Customer Interviews", context: "Trial-to-paid hesitation research" },
  { metric: "100% P0 Delivery", context: "Engineering sprint commitments met on time" },
  { metric: "45,000 MAU Telemetry", context: "Northbridge Labs funnel drop-off analysis" },
  { metric: "8% Week-4 Retention Gain", context: "Growth engineering squad cohort optimization" },
  { metric: "5 Years SaaS PM Experience", context: "Verified product lifecycle tenure" },
  { metric: "14 Days TTFV Reduction", context: "Onboarding workflow consolidation experiment" },
  { metric: "94 ATS Parse Score", context: "Canonical Master Product Resume benchmark" },
  { metric: "38 Relational SQL Models", context: "Daily user telemetry dashboard queries" },
  { metric: "18 PRDs & Specifications", context: "Cross-functional feature delivery documentation" },
  { metric: "Zero PII Telemetry Leaks", context: "Strict compliance with privacy standards" },
  { metric: "2 Major Platform Releases", context: "Multi-tier web platform launch leadership" },
];

export const AVERY_CHEN_USER: DemoUser = {
  id: "user-avery-chen-2026",
  name: "Avery Chen",
  email: "avery@rolesharp.example",
  location: "Seattle, WA",
  currentTitle: "Product Manager",
  currentCompany: "Fieldnote Software",
  targetTitle: "Senior Product Manager",
  targetCompany: "Lattice Works",
  yearsOfExperience: 5,
  education: {
    degree: "Bachelor of Science",
    field: "Information Systems",
    institution: "Northbridge University",
    graduationYear: 2021,
  },
  skills: [
    "Roadmapping",
    "SQL",
    "User research",
    "Experiment design",
    "Product analytics",
  ],
  creditsRemaining: 12,
  plan: "Premium",
  planExpiry: "2027-05-15",
};

export const AVERY_RESUMES: DemoResume[] = [
  {
    id: "resume-avery-master",
    title: "Master Product Resume (2026 Canonical)",
    type: "master",
    atsScore: 94,
    template: "signal",
    lastModified: "2026-11-05T14:20:00Z",
    status: "complete",
    summary:
      "Customer-centric Product Manager with 5 years of verified experience driving user onboarding experiments, data-informed roadmapping, and cross-functional feature delivery for high-growth SaaS platforms.",
    skills: [
      "Roadmapping",
      "SQL",
      "User research",
      "Experiment design",
      "Product analytics",
      "A/B Testing",
      "Qualitative Interviews",
      "Cohort Analysis",
      "Cross-functional Leadership",
    ],
    experience: [
      {
        role: "Product Manager",
        company: "Fieldnote Software",
        location: "Seattle, WA",
        startDate: "2021-09",
        endDate: "Present",
        bullets: [
          "Led onboarding experiments improving activation 12% across two major releases.",
          "Interviewed 24 customers about trial friction, distilling feedback into core roadmap epics.",
          "Partnered with engineering and design on quarterly roadmap priorities and sprint commitments.",
          "Authored comprehensive SQL queries and Metabase dashboards tracking user cohort retention."
        ],
      },
      {
        role: "Associate Product Specialist",
        company: "Northbridge Labs",
        location: "Seattle, WA",
        startDate: "2021-06",
        endDate: "2021-08",
        bullets: [
          "Analyzed funnel telemetry data across 45,000 monthly active users to isolate drop-off points.",
          "Synthesized competitive benchmark reports comparing automated workflow UX patterns."
        ],
      },
    ],
  },
  {
    id: "resume-avery-tailored-lattice",
    title: "Tailored — Senior PM @ Lattice Works",
    type: "tailored",
    targetJobId: "job-match-lattice",
    targetRole: "Senior Product Manager",
    targetCompany: "Lattice Works",
    atsScore: 88,
    template: "signal",
    lastModified: "2026-11-06T18:15:00Z",
    status: "complete",
    summary:
      "Senior Product Manager candidate with deep specialization in activation funnels, trial-to-paid conversion experimentation, and qualitative user research. Built to meet Lattice Works' onboarding roadmap mandates.",
    skills: [
      "Roadmapping",
      "SQL",
      "User research",
      "Experiment design",
      "Product analytics",
      "Onboarding Architecture",
      "A/B Testing",
    ],
    honestGap: {
      requiredSkill: "Kafka Event Stream Telemetry",
      explanation:
        "Lattice Works requires real-time Kafka event pipeline observability; Avery brings strong relational SQL and event tracking (Mixpanel/PostHog) but no direct Kafka cluster instrumentation experience.",
      status: "unsupported_gap",
    },
    experience: [
      {
        role: "Product Manager (Onboarding & Activation)",
        company: "Fieldnote Software",
        location: "Seattle, WA",
        startDate: "2021-09",
        endDate: "Present",
        bullets: [
          "Led onboarding experiments improving activation 12% across two releases through frictionless signup steps.",
          "Interviewed 24 customers about trial friction, converting research into high-impact feature specifications.",
          "Partnered with engineering and design on quarterly roadmap priorities, delivering 100% of P0 commitments on time.",
          "Engineered daily SQL telemetry pipelines measuring new user time-to-first-value (TTFV)."
        ],
      },
    ],
  },
  {
    id: "resume-avery-tailored-northstar",
    title: "Tailored — Lead Growth PM @ Northstar Labs",
    type: "tailored",
    targetJobId: "job-match-northstar",
    targetRole: "Lead Growth Product Manager",
    targetCompany: "Northstar Labs",
    atsScore: 89,
    template: "editorial",
    lastModified: "2026-11-04T11:45:00Z",
    status: "complete",
    summary:
      "Growth Product Manager specializing in experimentation design, funnel optimization, and cross-functional execution across product, marketing, and engineering squads.",
    skills: [
      "Experiment design",
      "Product analytics",
      "SQL",
      "User research",
      "Funnel Optimization",
    ],
    experience: [
      {
        role: "Product Manager",
        company: "Fieldnote Software",
        location: "Seattle, WA",
        startDate: "2021-09",
        endDate: "Present",
        bullets: [
          "Led onboarding experiments improving activation 12% across two releases.",
          "Interviewed 24 customers about trial friction to identify user hesitation triggers.",
          "Collaborated closely with growth engineering to increase week-4 cohort retention by 8%."
        ],
      },
    ],
  },
  {
    id: "resume-avery-draft-harbor",
    title: "Draft — Technical PM @ Harbor Systems",
    type: "draft",
    targetJobId: "job-match-harbor",
    targetRole: "Technical Product Manager",
    targetCompany: "Harbor Systems",
    atsScore: 78,
    template: "signal",
    lastModified: "2026-11-07T09:30:00Z",
    status: "draft",
    summary:
      "Technical Product Manager candidate with hands-on SQL analytics and API workflow background.",
    skills: [
      "SQL",
      "Roadmapping",
      "User research",
    ],
    experience: [
      {
        role: "Product Manager",
        company: "Fieldnote Software",
        location: "Seattle, WA",
        startDate: "2021-09",
        endDate: "Present",
        bullets: [
          "Partnered with engineering and design on quarterly roadmap priorities.",
          "Maintained relational database query library supporting product analytics."
        ],
      },
    ],
  },
];

export const AVERY_APPLICATIONS: DemoApplication[] = [
  {
    id: "app-lattice-works",
    companyName: "Lattice Works",
    roleTitle: "Senior Product Manager",
    stage: "preparing",
    matchScore: 88,
    followUpDue: "2026-11-14",
    resumeVersionId: "resume-avery-tailored-lattice",
    notes: "Review honest Kafka telemetry gap before final submission. Resume tailored and scored.",
    salaryRange: "$165,000 – $185,000",
    location: "Seattle, WA · Hybrid",
  },
  {
    id: "app-northstar-labs",
    companyName: "Northstar Labs",
    roleTitle: "Lead Growth PM",
    stage: "applied",
    matchScore: 89,
    appliedDate: "2026-11-04",
    followUpDue: "2026-11-12",
    resumeVersionId: "resume-avery-tailored-northstar",
    notes: "Application packet submitted via company portal. Follow-up scheduled with hiring manager.",
    salaryRange: "$160,000 – $175,000",
    location: "Remote · US",
  },
  {
    id: "app-harbor-systems",
    companyName: "Harbor Systems",
    roleTitle: "Technical Product Manager",
    stage: "saved",
    matchScore: 82,
    followUpDue: "2026-11-18",
    resumeVersionId: "resume-avery-draft-harbor",
    notes: "Saved posting. Need to complete tailored draft and verify API integration evidence.",
    salaryRange: "$155,000 – $170,000",
    location: "Bellevue, WA · Onsite",
  },
  {
    id: "app-horizon-analytics",
    companyName: "Horizon Analytics",
    roleTitle: "Principal Product Manager",
    stage: "interview",
    matchScore: 91,
    appliedDate: "2026-10-25",
    interviewDate: "2026-11-10T14:00:00Z",
    followUpDue: "2026-11-11",
    resumeVersionId: "resume-avery-master",
    notes: "Round 2 Technical & Case Study interview scheduled with VP Product Marcus Vance.",
    salaryRange: "$175,000 – $195,000",
    location: "Seattle, WA · Hybrid",
  },
  {
    id: "app-beacon-cloud",
    companyName: "Beacon Cloud",
    roleTitle: "Staff Product Manager",
    stage: "applied",
    matchScore: 86,
    appliedDate: "2026-11-01",
    followUpDue: "2026-11-16",
    resumeVersionId: "resume-avery-master",
    notes: "Applied via referral from Northbridge alumni network. Awaiting recruiter response.",
    salaryRange: "$170,000 – $190,000",
    location: "Remote · US",
  },
  {
    id: "app-crestline-software",
    companyName: "Crestline Software",
    roleTitle: "Senior Product Manager",
    stage: "closed",
    matchScore: 76,
    appliedDate: "2026-10-15",
    followUpDue: "2026-10-30",
    resumeVersionId: "resume-avery-master",
    notes: "Role required 8+ years enterprise ERP experience. Politely withdrawn.",
    salaryRange: "$150,000 – $165,000",
    location: "Seattle, WA",
  },
];

export const AVERY_JOB_MATCHES: DemoJobMatch[] = [
  {
    id: "job-match-lattice",
    companyName: "Lattice Works",
    roleTitle: "Senior Product Manager",
    location: "Seattle, WA · Hybrid",
    salaryRange: "$165,000 – $185,000",
    matchScore: 88,
    postedDaysAgo: 2,
    status: "saved",
    transparentMatchReasons: [
      { competency: "Onboarding Experiment Design", contribution: "Direct match: 12% activation improvement across 2 releases", weightPercent: 28 },
      { competency: "Customer Research & User Interviews", contribution: "Direct match: 24 qualitative user interviews on friction", weightPercent: 24 },
      { competency: "SQL & Cohort Analytics", contribution: "Direct match: Custom cohort metrics & retention dashboards", weightPercent: 22 },
      { competency: "Roadmap Ownership", contribution: "Direct match: Quarterly OKR prioritization with engineering/design", weightPercent: 20 },
    ],
    honestGap: {
      missingCompetency: "Kafka Event Stream Telemetry",
      recommendation: "Acknowledge in review modal; highlight strong PostHog/Mixpanel & relational SQL foundation as equivalent telemetry grounding.",
    },
  },
  {
    id: "job-match-northstar",
    companyName: "Northstar Labs",
    roleTitle: "Lead Growth Product Manager",
    location: "Remote · US",
    salaryRange: "$160,000 – $175,000",
    matchScore: 89,
    postedDaysAgo: 4,
    status: "applied",
    transparentMatchReasons: [
      { competency: "Product Analytics & Funnels", contribution: "Strong evidence from 5 years of SaaS telemetry", weightPercent: 35 },
      { competency: "A/B Experimentation", contribution: "Proven activation lift", weightPercent: 30 },
      { competency: "Cross-functional Leadership", contribution: "Led quarterly roadmap with dev & UX", weightPercent: 24 },
    ],
    honestGap: {
      missingCompetency: "Multi-currency B2B billing engine experience",
      recommendation: "Demonstrate quick adaptation through Stripe API project background.",
    },
  },
  {
    id: "job-match-harbor",
    companyName: "Harbor Systems",
    roleTitle: "Technical Product Manager",
    location: "Bellevue, WA · Onsite",
    salaryRange: "$155,000 – $170,000",
    matchScore: 82,
    postedDaysAgo: 6,
    status: "new",
    transparentMatchReasons: [
      { competency: "SQL & Data Modeling", contribution: "Matches relational query experience", weightPercent: 32 },
      { competency: "Product Roadmapping", contribution: "Aligns with 5 years roadmap ownership", weightPercent: 28 },
      { competency: "Customer Research", contribution: "Aligns with user interview practice", weightPercent: 22 },
    ],
    honestGap: {
      missingCompetency: "Native Mobile SDK release cycle management",
      recommendation: "Highlight web-based continuous deployment rigor.",
    },
  },
];

export const AVERY_NOTIFICATIONS: DemoNotification[] = [
  {
    id: "notif-1",
    title: "New 94% Match: Senior Product Manager",
    message: "Lattice Works posted an opening matching your onboarding and experiment evidence.",
    timestamp: "2026-11-07T08:15:00Z",
    read: false,
    type: "match",
    actionHref: "/build?jobId=job-match-lattice",
  },
  {
    id: "notif-2",
    title: "Upcoming Interview Confirmed",
    message: "Round 2 Technical Review with Horizon Analytics scheduled for Nov 10 at 2:00 PM PST.",
    timestamp: "2026-11-06T16:30:00Z",
    read: false,
    type: "interview",
    actionHref: "/tracker",
  },
  {
    id: "notif-3",
    title: "Weekly Tailoring Allowance",
    message: "You have 12 tailoring credits remaining on your Premium account.",
    timestamp: "2026-11-05T09:00:00Z",
    read: true,
    type: "limit",
    actionHref: "/billing",
  },
];
