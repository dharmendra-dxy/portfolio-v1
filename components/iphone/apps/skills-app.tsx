"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { skills } from "@/constant/skills";
import { cn } from "@/lib/utils";
import { AppScreen } from "../ios-ui";
import { skillTileClass } from "@/components/skill-tile";

type Group = "All" | "Frontend" | "Backend" | "Data" | "Tools";

const GROUPS: Group[] = ["All", "Frontend", "Backend", "Data", "Tools"];

const GROUP_SETS: Record<Group, string[]> = {
  All: skills.map((skill) => skill.title),
  Frontend: ["React", "NextJs", "Tailwind", "CSS 3", "HTML 5", "Figma", "Javascript"],
  Backend: ["Node", "Express", "Rest API", "Redux"],
  Data: ["Postgresql", "Mongo DB", "Neon DB", "Prisma"],
  Tools: ["Docker", "Vscode", "Postman", "Typescript", "AWS"],
};

export default function SkillsApp({ onBack }: { onBack: () => void }) {
  const [group, setGroup] = useState<Group>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const allowed = new Set(GROUP_SETS[group]);
    const q = query.trim().toLowerCase();
    return skills.filter(
      (skill) => allowed.has(skill.title) && (!q || skill.title.toLowerCase().includes(q)),
    );
  }, [group, query]);

  const activeIndex = GROUPS.indexOf(group);

  return (
    <AppScreen title="Skills" onBack={onBack} bare>
      {/* Segmented control — the pill slides with a compositor-only transform */}
      <div className="sticky top-[88px] z-20 bg-[#f2f2f7] px-4 pt-2">
        <div className="relative flex rounded-lg bg-zinc-200/70 p-0.5">
          <span
            className="absolute inset-y-0.5 left-0.5 w-[calc((100%-4px)/5)] rounded-[7px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-transform duration-200 ease-out"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          {GROUPS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setGroup(name)}
              className="relative flex-1 rounded-[7px] px-1 py-1.5 text-[12px] font-medium"
            >
              <span className={group === name ? "text-zinc-900" : "text-zinc-500"}>
                {name}
              </span>
            </button>
          ))}
        </div>

        <label className="mt-2 flex h-9 items-center gap-2 rounded-xl bg-white px-3">
          <Search className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter technologies"
            className="w-full bg-transparent text-[16px] text-zinc-900 outline-none placeholder:text-zinc-400"
          />
        </label>
      </div>

      <div className="px-4 pt-3">
        <div className="grid grid-cols-3 gap-2.5">
          {visible.map((skill) => (
            <div
              key={skill.title}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-white px-1 py-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.icon}
                alt={skill.title}
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className={cn(
                  "h-11 w-11 rounded-[10px] object-cover",
                  skillTileClass(skill.title),
                )}
              />
              <span className="text-center text-[11px] font-medium leading-tight text-zinc-700">
                {skill.title}
              </span>
            </div>
          ))}
        </div>

        <p className="py-4 text-center text-[13px] text-zinc-400">
          {visible.length} of {skills.length} technologies
        </p>
      </div>
    </AppScreen>
  );
}
