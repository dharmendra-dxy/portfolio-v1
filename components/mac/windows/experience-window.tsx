"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import { experience } from "@/constant/experience";
import { cn } from "@/lib/utils";
import { FinderStatusBar, FinderToolbar, SidebarGroup, SidebarItem } from "../finder-chrome";

export default function ExperienceWindow() {
  const [expanded, setExpanded] = useState<string | null>(
    experience[experience.length - 1]?.company ?? null,
  );
  const [company, setCompany] = useState<string | null>(null);

  const companies = Array.from(new Set(experience.map((item) => item.company)));
  const visible = company
    ? experience.filter((item) => item.company === company)
    : experience;

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="mac-scroll hidden w-[168px] shrink-0 overflow-y-auto border-r border-black/10 bg-zinc-100/70 px-2 py-3 md:block">
        <SidebarGroup title="Tags">
          <SidebarItem
            icon={<Briefcase className="h-3.5 w-3.5" />}
            label="All Roles"
            active={!company}
            onClick={() => setCompany(null)}
          />
          {companies.map((name) => (
            <SidebarItem
              key={name}
              icon={
                <span className="h-2 w-2 rounded-full bg-emerald-500/70 ring-1 ring-black/10" />
              }
              label={name}
              active={company === name}
              onClick={() => setCompany(name)}
            />
          ))}
        </SidebarGroup>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <FinderToolbar
          path={`Macintosh HD \u203a Users \u203a dharmendra \u203a Experience`}
          isActive
          view="list"
          onViewChange={() => {}}
        />

        <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-white px-4 py-4">
          <ol className="relative space-y-3 border-l border-black/10 pl-5">
            {visible.map((item, index) => {
              const open = expanded === item.company + item.role;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                    delay: index * 0.06,
                  }}
                  className="relative"
                >
                  <span className="absolute -left-[26px] top-4 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-[3px] ring-emerald-500">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  </span>

                  <div className="overflow-hidden rounded-xl bg-zinc-50 ring-1 ring-black/5">
                    <button
                      type="button"
                      onClick={() => setExpanded(open ? null : item.company + item.role)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-zinc-100/70"
                    >
                      <Image
                        src={item.url}
                        alt={item.company}
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-lg bg-white object-contain p-1 ring-1 ring-black/5"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-semibold text-zinc-800">
                          {item.role}
                        </p>
                        <p className="flex items-center gap-1.5 truncate text-[12px] text-zinc-500">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {item.company} · {item.duration}
                        </p>
                      </div>
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 text-zinc-400"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 border-t border-black/5 px-4 py-3">
                            {item.description.map((point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="flex gap-2 text-[12.5px] leading-relaxed text-zinc-600"
                              >
                                <span
                                  className={cn(
                                    "mt-[7px] h-1 w-1 shrink-0 rounded-full",
                                    "bg-emerald-500",
                                  )}
                                />
                                {point.title}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <FinderStatusBar>
          {experience.length} roles · {companies.length} companies
        </FinderStatusBar>
      </div>
    </div>
  );
}
