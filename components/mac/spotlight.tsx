"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";
import { profile } from "@/constant/profile";
import { skills } from "@/constant/skills";
import { works } from "@/constant/works";
import { experience } from "@/constant/experience";
import { WINDOW_CONFIG, type WindowId } from "./mac-config";

interface SpotlightProps {
  open: boolean;
  onClose: () => void;
  onOpenApp: (id: WindowId) => void;
}

interface Result {
  key: string;
  label: string;
  hint: string;
  group: string;
  action: () => void;
}

export default function Spotlight({ open, onClose, onOpenApp }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const apps: Result[] = (Object.keys(WINDOW_CONFIG) as WindowId[]).map((id) => ({
      key: `app-${id}`,
      label: WINDOW_CONFIG[id].title,
      hint: "Application",
      group: "Apps",
      action: () => onOpenApp(id),
    }));

    const projects: Result[] = works.map((work) => ({
      key: `work-${work.title}`,
      label: work.title,
      hint: work.description,
      group: "Projects",
      action: () => onOpenApp("projects"),
    }));

    const people: Result[] = experience.map((item) => ({
      key: `exp-${item.id}`,
      label: `${item.role} · ${item.company}`,
      hint: item.duration,
      group: "Experience",
      action: () => onOpenApp("experience"),
    }));

    const tech: Result[] = skills.map((skill) => ({
      key: `skill-${skill.title}`,
      label: skill.title,
      hint: "Technology",
      group: "Skills",
      action: () => onOpenApp("skills"),
    }));

    const web: Result[] = [
      {
        key: "web-email",
        label: profile.mail,
        hint: "Email address",
        group: "Internet",
        action: () => {
          window.location.href = `mailto:${profile.mail}`;
        },
      },
      {
        key: "web-github",
        label: "github.com/dharmendra-dxy",
        hint: "GitHub profile",
        group: "Internet",
        action: () => {
          window.open("https://github.com/dharmendra-dxy", "_blank");
        },
      },
      {
        key: "web-linkedin",
        label: "linkedin.com/in/dharmendra-dxy",
        hint: "LinkedIn profile",
        group: "Internet",
        action: () => {
          window.open("https://www.linkedin.com/in/dharmendra-dxy", "_blank");
        },
      },
    ];

    const all = [...apps, ...projects, ...people, ...tech, ...web];
    const q = query.trim().toLowerCase();
    if (!q) return all.slice(0, 10);
    return all
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.hint.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [query, onOpenApp]);

  useEffect(() => {
    setCursor((prev) => Math.min(prev, Math.max(0, results.length - 1)));
  }, [results.length]);

  if (!open) return null;

  const run = (item?: Result) => {
    const target = item ?? results[cursor];
    if (!target) return;
    onClose();
    target.action();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.14 }}
        className="absolute inset-0 z-[8500] flex items-start justify-center bg-black/12 pt-[16vh] backdrop-blur-[2px]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -8 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          onClick={(event) => event.stopPropagation()}
          className="mx-4 w-full max-w-[620px] overflow-hidden rounded-2xl border border-white/40 bg-white/85 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          style={{ WebkitBackdropFilter: "blur(34px) saturate(180%)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <svg
              viewBox="0 0 20 20"
              className="h-[17px] w-[17px] shrink-0 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="8.6" cy="8.6" r="5.4" />
              <path d="m12.7 12.7 4 4" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setCursor((c) => Math.min(c + 1, results.length - 1));
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setCursor((c) => Math.max(c - 1, 0));
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  run();
                } else if (event.key === "Escape") {
                  onClose();
                }
              }}
              placeholder="Spotlight Search"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-[17px] font-light text-zinc-800 outline-none placeholder:text-zinc-400"
            />
          </div>

          {results.length > 0 && (
            <div className="mac-scroll max-h-[46vh] overflow-y-auto border-t border-black/10 px-1.5 py-1.5">
              {results.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => run(item)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-[7px] text-left transition-colors ${
                    index === cursor
                      ? "bg-[#2f6fed] text-white"
                      : "text-zinc-700 hover:bg-black/5"
                  }`}
                >
                  <span
                    className={`shrink-0 rounded px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-wide ${
                      index === cursor
                        ? "bg-white/20 text-white/90"
                        : "bg-black/5 text-zinc-500"
                    }`}
                  >
                    {item.group}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                    {item.label}
                  </span>
                  <span
                    className={`hidden max-w-[45%] truncate text-[11.5px] sm:block ${
                      index === cursor ? "text-white/70" : "text-zinc-400"
                    }`}
                  >
                    {item.hint}
                  </span>
                  {index === cursor && (
                    <CornerDownLeft className="h-3 w-3 shrink-0 opacity-80" />
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
