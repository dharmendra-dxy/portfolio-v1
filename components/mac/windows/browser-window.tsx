"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Github,
  Linkedin,
  Lock,
  Mail,
  RefreshCw,
  Share2,
  Star,
} from "lucide-react";
import { profile } from "@/constant/profile";
import { works } from "@/constant/works";
import { FinderStatusBar } from "../finder-chrome";
import type { WindowId } from "../mac-config";

const BOOKMARKS = [
  { label: "About", target: "about" },
  { label: "Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Skills", target: "skills" },
  { label: "Contact", target: "contact" },
];

export default function BrowserWindow({
  onOpenApp,
}: {
  onOpenApp: (id: WindowId) => void;
}) {
  const [url, setUrl] = useState("dharmendra.dev");
  const [loading, setLoading] = useState(false);

  const go = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 550);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      {/* Toolbar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-black/10 bg-zinc-100/85 px-3">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-black/5"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-black/5"
            aria-label="Forward"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <label className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/85 px-3 ring-1 ring-black/5 transition-shadow focus-within:ring-blue-400/50">
          <Lock className="h-3 w-3 shrink-0 text-emerald-600" />
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") go();
            }}
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-center text-[12.5px] text-zinc-700 outline-none"
          />
        </label>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={go}
            className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-600"
            aria-label="Reload"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            className="hidden h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-600 sm:flex"
            aria-label="Share"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Bookmarks */}
      <div className="flex h-8 shrink-0 items-center gap-1 overflow-x-auto border-b border-black/5 bg-zinc-50/80 px-3 no-scrollbar">
        {BOOKMARKS.map((bookmark) => (
          <button
            key={bookmark.target}
            type="button"
            onClick={() => onOpenApp(bookmark.target as WindowId)}
            className="shrink-0 rounded-md px-2 py-[3px] text-[11.5px] font-medium text-zinc-600 transition-colors hover:bg-zinc-200/70"
          >
            {bookmark.label}
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 items-center gap-1 text-[11px] text-zinc-400 sm:flex">
          <Star className="h-3 w-3" />
          portfolio
        </span>
      </div>

      {/* Page */}
      <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-2xl px-6 py-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="text-[28px] font-bold tracking-tight text-zinc-900"
          >
            {profile.name}
          </motion.h1>
          <p className="mt-1 text-[13px] text-zinc-500">{profile.handle}</p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {[
              {
                icon: BookOpen,
                label: "Read the portfolio",
                href: "/",
                hint: "The classic layout",
              },
              {
                icon: Github,
                label: profile.socials[1]?.url.trim() ?? "",
                href: "https://github.com/dharmendra-dxy",
                hint: "Source & experiments",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/dharmendra-dxy",
                hint: "Professional profile",
              },
              {
                icon: Mail,
                label: "Say hello",
                href: `mailto:${profile.mail}`,
                hint: profile.mail,
              },
            ].map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 26, delay: 0.06 }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 rounded-xl bg-white p-3 text-left ring-1 ring-black/5 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.25)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                  <card.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-zinc-800">
                    {card.label}
                  </span>
                  <span className="block truncate text-[11.5px] text-zinc-400">
                    {card.hint}
                  </span>
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
            {works.map((work) => (
              <a
                key={work.title}
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-3 py-1 text-[11.5px] font-medium text-zinc-600 ring-1 ring-black/5 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                {work.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <FinderStatusBar>Secure connection · {url}</FinderStatusBar>
    </div>
  );
}
