"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/constant/profile";
import { experience, totalExperience } from "@/constant/experience";
import { education } from "@/constant/education";
import { FinderStatusBar, WindowHint } from "../finder-chrome";

const SOCIAL_LABEL: Record<string, string> = {
  Linkedin: "LinkedIn",
  Github: "GitHub",
  Twitter: "X",
  Mail: "Email",
  FileText: "Résumé",
};

export default function AboutWindow() {
  const currentRole = experience[experience.length - 1];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-white">
        {/* Header card */}
        <div className="relative overflow-hidden border-b border-black/5 bg-gradient-to-br from-zinc-100 via-white to-sky-50">
          <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-rose-400/15 blur-3xl" />

          <div className="relative flex flex-col items-center gap-3 px-6 py-7 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative"
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={96}
                height={96}
                priority
                className="h-24 w-24 rounded-full object-cover shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)] ring-[3px] ring-white"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-[3px] ring-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </motion.div>

            <div>
              <h1 className="text-[19px] font-semibold tracking-tight text-zinc-900">
                {profile.name}
              </h1>
              <p className="text-[13px] text-zinc-500">{profile.handle}</p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-[11.5px] font-medium text-white shadow-sm">
              <Sparkles className="h-3 w-3" />
              {profile.title}
            </span>

            <p className="max-w-md text-[13px] leading-relaxed text-zinc-600">
              {profile.summary}
            </p>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-700 ring-1 ring-emerald-600/15">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </div>
          </div>
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-2 divide-x divide-black/5 border-b border-black/5 sm:grid-cols-4">
          {[
            { label: "Experience", value: `${totalExperience}`, icon: Briefcase },
            {
              label: "Currently",
              value: currentRole?.company ?? "—",
              icon: Sparkles,
            },
            {
              label: "Degree",
              value: education[0]?.percentage ?? "B.Tech",
              icon: GraduationCap,
            },
            { label: "Location", value: "India", icon: Phone },
          ].map((item) => (
            <div key={item.label} className="px-3 py-3 text-center">
              <item.icon className="mx-auto mb-1 h-3.5 w-3.5 text-zinc-400" />
              <p className="truncate text-[13px] font-semibold text-zinc-800">
                {item.value}
              </p>
              <p className="text-[11px] text-zinc-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Currently building with */}
        <div className="border-b border-black/5 px-5 py-4">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            Currently building with
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.currentWork.stack.map((item) => (
              <motion.span
                key={item.title}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 py-1 pl-1 pr-2.5 text-[12px] font-medium text-zinc-700 ring-1 ring-black/5"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] rounded-[5px] object-cover"
                />
                {item.title}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="px-5 py-4">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            Elsewhere on the web
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {profile.socials.map((social, index) => {
              const Icon = social.icon;
              const iconName =
                (Icon as unknown as { displayName?: string }).displayName ?? "";
              const label = SOCIAL_LABEL[iconName] ?? "Link";
              return (
                <motion.a
                  key={index}
                  href={social.url.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="group flex items-center justify-between gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-[12.5px] font-medium text-zinc-700 ring-1 ring-black/5 transition-colors hover:bg-zinc-100"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-zinc-500" />
                    {label}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-300 transition-colors group-hover:text-zinc-600" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Contact rows */}
        <div className="space-y-1.5 border-t border-black/5 px-5 py-4">
          {[
            { icon: Mail, label: "Email", value: profile.mail, href: `mailto:${profile.mail}` },
            {
              icon: Phone,
              label: "Phone",
              value: profile.contact,
              href: `tel:${profile.contact.replace(/\s/g, "")}`,
            },
          ].map((row) => (
            <a
              key={row.label}
              href={row.href}
              className="flex items-center gap-2.5 rounded-lg px-1 py-1 text-[13px] text-zinc-600 transition-colors hover:text-zinc-900"
            >
              <row.icon className="h-3.5 w-3.5 text-zinc-400" />
              <span className="w-14 text-zinc-400">{row.label}</span>
              <span className="truncate">{row.value}</span>
            </a>
          ))}
        </div>

        <div className="px-5 pb-5">
          <WindowHint>
            This desktop is fully interactive — drag windows, use the traffic
            lights, press <kbd className="rounded bg-zinc-200 px-1">⌘K</kbd> for
            Spotlight or double-click the title bar to zoom.
          </WindowHint>
        </div>
      </div>

      <FinderStatusBar>
        {profile.name} — {profile.title}
      </FinderStatusBar>
    </div>
  );
}
