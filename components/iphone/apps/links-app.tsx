"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { SOCIAL_LINKS } from "@/constant/social";
import { profile } from "@/constant/profile";
import { AppScreen, Chevron, Pill, Row, Section } from "../ios-ui";

const ICONS: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  x: <Twitter className="h-4 w-4" />,
};

const TINTS: Record<string, string> = {
  github: "bg-zinc-900",
  linkedin: "bg-[#0A66C2]",
  x: "bg-zinc-900",
  leetcode: "bg-[#FFA116]",
};

export default function LinksApp({ onBack }: { onBack: () => void }) {
  return (
    <AppScreen title="Links" onBack={onBack}>
      <Section title="Profiles">
        {SOCIAL_LINKS.map((social) => (
          <Row
            key={social.id}
            icon={ICONS[social.icon] ?? <Twitter className="h-4 w-4" />}
            tint={TINTS[social.icon] ?? "bg-zinc-700"}
            title={social.label}
            subtitle={social.handle}
            href={social.href}
            accessory={<Chevron />}
          />
        ))}
      </Section>

      <Section
        title="Documents"
        footer="Opens the hosted PDF in a new tab."
      >
        {profile.socials
          .filter((social) => social.url.includes("drive.google"))
          .map((social) => (
            <Row
              key={social.url}
              icon={<span className="text-[13px] font-bold">PDF</span>}
              tint="bg-rose-500"
              title="Résumé"
              subtitle="Full-stack developer CV"
              href={social.url.trim()}
              accessory={<Chevron />}
            />
          ))}
      </Section>

      <div className="px-4 pt-4">
        <div className="rounded-2xl bg-white p-4">
          <p className="text-[15px] font-semibold text-zinc-900">Handy links</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Pill tone="blue">/</Pill>
            <Pill>/projects</Pill>
            <Pill>/mac</Pill>
            <Pill tone="green">/iphone</Pill>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
            This portfolio exists in three flavours — the classic site, a macOS
            desktop and this iPhone.
          </p>
        </div>
      </div>
    </AppScreen>
  );
}
