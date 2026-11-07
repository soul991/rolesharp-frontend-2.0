"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import {
  AVERY_CHEN_USER,
  AVERY_RESUMES,
  AVERY_APPLICATIONS,
  AVERY_JOB_MATCHES,
  AVERY_NOTIFICATIONS,
  DemoUser,
  DemoResume,
  DemoApplication,
  DemoJobMatch,
  DemoNotification,
} from "./fictional-demo-dataset";

export type RedesignTheme = "dark" | "light";

interface RedesignStoreContextType {
  user: DemoUser;
  theme: RedesignTheme;
  toggleTheme: () => void;
  resumes: DemoResume[];
  applications: DemoApplication[];
  jobMatches: DemoJobMatch[];
  notifications: DemoNotification[];
  activeResumeId: string;
  setActiveResumeId: (id: string) => void;
  updateResumeBullet: (resumeId: string, expIndex: number, bulletIndex: number, newText: string) => void;
  addSkillToResume: (resumeId: string, skill: string) => void;
  updateApplicationStage: (appId: string, newStage: DemoApplication["stage"]) => void;
  updateApplicationNotes: (appId: string, notes: string) => void;
  deductCredit: () => boolean;
  addGeneratedResume: (newResume: DemoResume) => void;
  resetToBaseline: () => void;
}

const STORAGE_KEY = "rolesharp_redesign_v2_state";

const RedesignStoreContext = createContext<RedesignStoreContextType | null>(null);

export function RedesignStoreProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<RedesignTheme>("dark");
  const [user, setUser] = useState<DemoUser>(AVERY_CHEN_USER);
  const [resumes, setResumes] = useState<DemoResume[]>(AVERY_RESUMES);
  const [applications, setApplications] = useState<DemoApplication[]>(AVERY_APPLICATIONS);
  const [jobMatches, setJobMatches] = useState<DemoJobMatch[]>(AVERY_JOB_MATCHES);
  const [notifications, setNotifications] = useState<DemoNotification[]>(AVERY_NOTIFICATIONS);
  const [activeResumeId, setActiveResumeId] = useState<string>("resume-avery-tailored-lattice");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.user) setUser(parsed.user);
        if (parsed.resumes) setResumes(parsed.resumes);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.jobMatches) setJobMatches(parsed.jobMatches);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.activeResumeId) setActiveResumeId(parsed.activeResumeId);
      }
    } catch {
      // Fallback to baseline
    }
    setIsLoaded(true);
  }, []);

  // Sync theme to root class
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  // Persist state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          theme,
          user,
          resumes,
          applications,
          jobMatches,
          notifications,
          activeResumeId,
        })
      );
    } catch {
      // Ignore quota errors
    }
  }, [isLoaded, theme, user, resumes, applications, jobMatches, notifications, activeResumeId]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const updateResumeBullet = useCallback(
    (resumeId: string, expIndex: number, bulletIndex: number, newText: string) => {
      setResumes((prev) =>
        prev.map((r) => {
          if (r.id !== resumeId) return r;
          const updatedExp = [...r.experience];
          if (updatedExp[expIndex]) {
            const updatedBullets = [...updatedExp[expIndex].bullets];
            updatedBullets[bulletIndex] = newText;
            updatedExp[expIndex] = { ...updatedExp[expIndex], bullets: updatedBullets };
          }
          return { ...r, experience: updatedExp, lastModified: new Date().toISOString() };
        })
      );
    },
    []
  );

  const addSkillToResume = useCallback((resumeId: string, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setResumes((prev) =>
      prev.map((r) => {
        if (r.id !== resumeId) return r;
        if (r.skills.includes(trimmed)) return r;
        return {
          ...r,
          skills: [...r.skills, trimmed],
          lastModified: new Date().toISOString(),
        };
      })
    );
  }, []);

  const updateApplicationStage = useCallback(
    (appId: string, newStage: DemoApplication["stage"]) => {
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, stage: newStage } : a))
      );
    },
    []
  );

  const updateApplicationNotes = useCallback((appId: string, notes: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, notes } : a))
    );
  }, []);

  const deductCredit = useCallback(() => {
    if (user.creditsRemaining <= 0) return false;
    setUser((prev) => ({ ...prev, creditsRemaining: prev.creditsRemaining - 1 }));
    return true;
  }, [user.creditsRemaining]);

  const addGeneratedResume = useCallback((newResume: DemoResume) => {
    setResumes((prev) => {
      const filtered = prev.filter((r) => r.id !== newResume.id);
      return [newResume, ...filtered];
    });
    setActiveResumeId(newResume.id);
  }, []);

  const resetToBaseline = useCallback(() => {
    setTheme("dark");
    setUser(AVERY_CHEN_USER);
    setResumes(AVERY_RESUMES);
    setApplications(AVERY_APPLICATIONS);
    setJobMatches(AVERY_JOB_MATCHES);
    setNotifications(AVERY_NOTIFICATIONS);
    setActiveResumeId("resume-avery-tailored-lattice");
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <RedesignStoreContext.Provider
      value={{
        user,
        theme,
        toggleTheme,
        resumes,
        applications,
        jobMatches,
        notifications,
        activeResumeId,
        setActiveResumeId,
        updateResumeBullet,
        addSkillToResume,
        updateApplicationStage,
        updateApplicationNotes,
        deductCredit,
        addGeneratedResume,
        resetToBaseline,
      }}
    >
      {children}
    </RedesignStoreContext.Provider>
  );
}

export function useRedesignStore() {
  const context = useContext(RedesignStoreContext);
  if (!context) {
    throw new Error("useRedesignStore must be used within a RedesignStoreProvider");
  }
  return context;
}
