"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, FolderCog, Search, Star, Wrench } from "lucide-react";
import { skills } from "@/constant/skills";
import { cn } from "@/lib/utils";
import { FinderStatusBar, SidebarGroup, SidebarItem } from "../finder-chrome";
import { skillTileClass } from "@/components/skill-tile";

type Group = "All" | "Frontend" | "Backend" | "Data" | "Tools" | "Cloud";

const GROUPS: Record<Group, string[]> = {
  All: skills.map((skill) => skill.title),
  Frontend: ["React", "NextJs", "Tailwind", "CSS 3", "HTML 5", "Figma", "Javascript"],
  Backend: ["Node", "Express", "Rest API", "Redux"],
  Data: ["Postgresql", "Mongo DB", "Neon DB", "Prisma"],
  Tools: ["Docker", "Vscode", "Postman", "Typescript"],
  Cloud: ["AWS", "Docker"],
};

export default function SkillsWindow() {
  const [group, setGroup] = useState<Group>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const allowed = new Set(GROUPS[group]);
    const q = query.trim().toLowerCase();
    return skills.filter(
      (skill) =>
        allowed.has(skill.title) &&
        (!q || skill.title.toLowerCase().includes(q)),
    );
  }, [group, query]);

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="mac-scroll hidden w-[178px] shrink-0 overflow-y-auto border-r border-black/10 bg-zinc-100/70 px-2 py-3 md:block">
        <SidebarGroup title="Toolbox">
          {(Object.keys(GROUPS) as Group[]).map((name) => {
            const Icon =
              name === "Cloud"
                ? Star
                : name === "Tools"
                  ? Wrench
                  : name === "Data"
                    ? FolderCog
                    : Cpu;
            return (
              <SidebarItem
                key={name}
                icon={<Icon className="h-3.5 w-3.5" />}
                label={name}
                active={group === name}
                onClick={() => setGroup(name)}
              />
            );
          })}
        </SidebarGroup>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-black/10 bg-zinc-100/85 px-4">
          <h2 className="text-[13px] font-semibold text-zinc-700">{group}</h2>
          <label className="ml-auto flex h-6 w-32 items-center gap-1.5 rounded-md bg-white/80 px-2 ring-1 ring-black/5 transition-all duration-200 focus-within:w-44 focus-within:ring-blue-400/60">
            <Search className="h-3 w-3 shrink-0 text-zinc-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter"
              className="w-full min-w-0 bg-transparent text-[12px] text-zinc-700 outline-none placeholder:text-zinc-400"
            />
          </label>
        </div>

        <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-white px-4 py-4">
          <motion.div layout className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
            {visible.map((skill, index) => (
              <motion.button
                key={skill.title}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 24,
                  delay: Math.min(index * 0.025, 0.4),
                }}
                whileHover={{ y: -3 }}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-xl p-3 ring-1 ring-black/5 transition-colors",
                  "bg-zinc-50 hover:bg-white hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)]",
                )}
              >
                <Image
                  src={skill.icon}
                  alt={skill.title}
                  width={44}
                  height={44}
                  className={cn(
                    "h-11 w-11 rounded-[10px] object-cover shadow-sm transition-transform duration-300 group-hover:scale-110",
                    skillTileClass(skill.title),
                  )}
                />
                <span className="text-center text-[11.5px] font-medium leading-tight text-zinc-700">
                  {skill.title}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {visible.length === 0 && (
            <p className="py-10 text-center text-[13px] text-zinc-400">
              Nothing here yet.
            </p>
          )}
        </div>

        <FinderStatusBar>
          {visible.length} of {skills.length} technologies installed
        </FinderStatusBar>
      </div>
    </div>
  );
}
