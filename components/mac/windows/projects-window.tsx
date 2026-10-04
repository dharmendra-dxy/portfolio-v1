"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { works } from "@/constant/works";
import { FinderStatusBar, FinderToolbar, SidebarGroup, SidebarItem } from "../finder-chrome";

export interface WorkItem {
  title: string;
  link?: string;
  github?: string;
  cover?: string;
  description: string;
  date: string;
  features?: string[];
  technologies?: { name: string; icon: string }[];
}

const ALL = "All Projects";

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export default function ProjectsWindow({
  onQuickLook,
}: {
  onQuickLook: (work: WorkItem) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(ALL);
  const [view, setView] = useState<"grid" | "list">("grid");

  const techFilters = useMemo(() => {
    const set = new Set<string>();
    works.forEach((work) =>
      work.technologies?.forEach((tech) => set.add(tech.name)),
    );
    return [ALL, ...Array.from(set)];
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return works.filter((work) => {
      const matchesFilter =
        filter === ALL ||
        work.technologies?.some((tech) => tech.name === filter);
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        work.title.toLowerCase().includes(q) ||
        work.description.toLowerCase().includes(q) ||
        work.technologies?.some((tech) => tech.name.toLowerCase().includes(q))
      );
    });
  }, [query, filter]);

  return (
    <div className="flex min-h-0 flex-1">
      {/* Sidebar */}
      <aside className="mac-scroll hidden w-[168px] shrink-0 overflow-y-auto border-r border-black/10 bg-zinc-100/70 px-2 py-3 md:block">
        <SidebarGroup title="Favourites">
          <SidebarItem
            icon={<Link2 className="h-3.5 w-3.5" />}
            label="Projects"
            active={filter === ALL}
            onClick={() => setFilter(ALL)}
          />
          {techFilters.slice(1).map((tech) => (
            <SidebarItem
              key={tech}
              icon={
                <span className="h-2 w-2 rounded-full bg-sky-500/70 ring-1 ring-black/10" />
              }
              label={tech}
              active={filter === tech}
              onClick={() => setFilter(tech)}
            />
          ))}
        </SidebarGroup>
        <SidebarGroup title="Locations">
          <SidebarItem
            icon={
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-gradient-to-b from-zinc-200 to-zinc-400 text-[7px] font-bold text-zinc-600">
                HD
              </span>
            }
            label="Macintosh HD"
            onClick={() => setFilter(ALL)}
          />
        </SidebarGroup>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <FinderToolbar
          path={`Macintosh HD \u203a Users \u203a dharmendra \u203a Projects${filter === ALL ? "" : ` \u203a ${filter}`}`}
          isActive
          view={view}
          onViewChange={setView}
          onSearch={setQuery}
          searchValue={query}
        />

        <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-white px-3 py-3">
          {visible.length === 0 ? (
            <div className="flex h-full items-center justify-center text-[13px] text-zinc-400">
              No projects match “{query}”.
            </div>
          ) : view === "grid" ? (
            <motion.div
              layout
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              {visible.map((work) => (
                <motion.button
                  key={work.title}
                  type="button"
                  layout
                  onClick={() => onQuickLook(work as WorkItem)}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="group flex flex-col items-center gap-1.5 rounded-lg p-1.5 text-center transition-colors hover:bg-zinc-50"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[7px] bg-zinc-100 ring-1 ring-black/10 shadow-sm">
                    {work.cover ? (
                      <Image
                        src={work.cover}
                        alt={work.title}
                        fill
                        sizes="220px"
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[11px] text-zinc-400">
                        No preview
                      </div>
                    )}
                  </div>
                  <span className="w-full truncate text-[12px] font-medium text-zinc-800">
                    {work.title}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {work.technologies?.length ?? 0} tech
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="divide-y divide-black/5">
              {visible.map((work) => (
                <button
                  key={work.title}
                  type="button"
                  onClick={() => onQuickLook(work as WorkItem)}
                  className="flex w-full items-center gap-3 px-2 py-2 text-left transition-colors hover:bg-sky-500/10"
                >
                  <div className="relative h-8 w-12 shrink-0 overflow-hidden rounded-[4px] bg-zinc-100 ring-1 ring-black/10">
                    {work.cover ? (
                      <Image
                        src={work.cover}
                        alt={work.title}
                        fill
                        sizes="60px"
                        unoptimized
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <span className="w-[38%] shrink-0 truncate text-[12.5px] font-medium text-zinc-800">
                    {work.title}
                  </span>
                  <span className="hidden min-w-0 flex-1 truncate text-[12px] text-zinc-500 sm:block">
                    {work.description}
                  </span>
                  <span className="hidden shrink-0 text-[11px] text-zinc-400 md:block">
                    {new Date(work.date).getFullYear()}
                  </span>
                  <span className="hidden shrink-0 text-[11px] text-zinc-400 lg:block">
                    {slugify(work.title)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <FinderStatusBar>
          {visible.length} of {works.length} items
        </FinderStatusBar>
      </div>
    </div>
  );
}
