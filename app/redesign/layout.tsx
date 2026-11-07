import type { Metadata } from "next";
import { RedesignStoreProvider } from "@/lib/redesign-store";
import "@/app/application-desk.css";

export const metadata: Metadata = {
  title: "RoleSharp 2.0 — Restored Workspace",
  description: "Evidence-led career workspace. Grounded resumes, transparent matching, and explainable tools.",
};

export default function RedesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RedesignStoreProvider>
      <div className="min-h-screen font-sans antialiased">
        {children}
      </div>
    </RedesignStoreProvider>
  );
}
