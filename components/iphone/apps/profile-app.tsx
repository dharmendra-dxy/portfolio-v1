"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { profile } from "@/constant/profile";
import { experience } from "@/constant/experience";
import { AppScreen, Chevron, Pill, Row, Section } from "../ios-ui";

const SOCIAL_LABEL: Record<string, string> = {
  Linkedin: "LinkedIn",
  Github: "GitHub",
  Twitter: "X",
  Mail: "Email",
  FileText: "Résumé",
};

export default function ProfileApp({ onBack }: { onBack: () => void }) {
  const current = experience[experience.length - 1];

  return (
    <AppScreen title="Profile" onBack={onBack}>
      {/* Hero */}
      <div className="px-4 pt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="overflow-hidden rounded-2xl bg-white p-5 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <div className="relative mx-auto w-fit">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={96}
              height={96}
              priority
              className="h-24 w-24 rounded-full object-cover shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)]"
            />
            <span className="absolute bottom-0.5 right-0.5 h-5 w-5 rounded-full bg-emerald-500 ring-[3px] ring-white" />
          </div>

          <h2 className="mt-3 text-[22px] font-bold tracking-[-0.02em] text-zinc-900">
            {profile.name}
          </h2>
          <p className="text-[14px] text-zinc-500">{profile.handle}</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            <Pill tone="blue">
              <Sparkles className="h-3 w-3" />
              {profile.title}
            </Pill>
            <Pill tone="green">Open to work</Pill>
          </div>

          <p className="mt-3.5 text-left text-[15px] leading-relaxed text-zinc-700">
            {profile.summary}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            {profile.socials.map((social, index) => {
              const Icon = social.icon;
              const iconName =
                (Icon as unknown as { displayName?: string }).displayName ?? "";
              return (
                <a
                  key={index}
                  href={social.url.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={SOCIAL_LABEL[iconName] ?? "Link"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors active:bg-zinc-200"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Section title="Currently building with">
        <div className="flex flex-wrap gap-2 px-3 py-3">
          {profile.currentWork.stack.map((item) => (
            <span
              key={item.title}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 py-1 pl-1 pr-2.5 text-[13px] font-medium text-zinc-700"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={20}
                height={20}
                className="h-5 w-5 rounded-[5px] object-cover"
              />
              {item.title}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Now">
        <Row
          icon={<Sparkles className="h-4 w-4" />}
          tint="bg-emerald-500"
          title={current?.role ?? profile.title}
          subtitle={current ? `${current.company} · ${current.duration}` : undefined}
          accessory={<Chevron />}
        />
        <Row
          icon={<MapPin className="h-4 w-4" />}
          tint="bg-sky-500"
          title="India"
          subtitle="IST · Remote friendly"
        />
      </Section>

      <Section title="Contact">
        <Row
          icon={<Mail className="h-4 w-4" />}
          tint="bg-blue-500"
          title="Email"
          value={profile.mail}
          href={`mailto:${profile.mail}`}
        />
        <Row
          icon={<Phone className="h-4 w-4" />}
          tint="bg-zinc-500"
          title="Phone"
          value={profile.contact}
          href={`tel:${profile.contact.replace(/\s/g, "")}`}
        />
      </Section>

      <Section title="Elsewhere">
        {profile.socials.map((social, index) => {
          const Icon = social.icon;
          const iconName =
            (Icon as unknown as { displayName?: string }).displayName ?? "";
          return (
            <Row
              key={index}
              icon={
                iconName === "Github" ? (
                  <Github className="h-4 w-4" />
                ) : iconName === "Linkedin" ? (
                  <Linkedin className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )
              }
              tint="bg-zinc-800"
              title={SOCIAL_LABEL[iconName] ?? "Link"}
              value="Open"
              href={social.url.trim()}
            />
          );
        })}
      </Section>
    </AppScreen>
  );
}
