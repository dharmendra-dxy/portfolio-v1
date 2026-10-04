"use client";

import { Eye, FileText } from "lucide-react";
import { profile } from "@/constant/profile";
import { AppScreen, Row, Section } from "../ios-ui";

export default function ResumeApp({ onBack }: { onBack: () => void }) {
  const resume =
    profile.socials.find((social) => social.url.includes("drive.google"))?.url ??
    "#";

  return (
    <AppScreen title="Résumé" onBack={onBack}>
      <div className="mx-4 mt-3 flex flex-col items-center rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
          <FileText className="h-9 w-9" />
        </span>
        <p className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-zinc-900">
          {profile.name.replace(" ", "")}_CV.pdf
        </p>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          PDF · Updated {new Date().getFullYear()}
        </p>

        <a
          href={resume.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#007aff] py-3 text-[16px] font-semibold text-white active:opacity-70"
        >
          <Eye className="h-4 w-4" />
          Open résumé
        </a>
      </div>

      <Section
        title="On this device"
        footer="The desktop and macOS versions of this portfolio are one tap away on the web."
      >
        <Row
          icon={<span className="text-[13px] font-bold">/</span>}
          tint="bg-zinc-800"
          title="Classic portfolio"
          subtitle="The original single-page layout"
        />
        <Row
          icon={<span className="text-[13px] font-bold">⌘</span>}
          tint="bg-zinc-700"
          title="macOS desktop"
          subtitle="Draggable windows, dock and Spotlight"
        />
        <Row
          icon={<span className="text-[13px] font-bold">◎</span>}
          tint="bg-blue-500"
          title="iPhone"
          subtitle="You are here"
        />
      </Section>
    </AppScreen>
  );
}
