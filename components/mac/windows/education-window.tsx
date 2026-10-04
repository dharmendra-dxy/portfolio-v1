"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { education } from "@/constant/education";
import { FinderStatusBar, FinderToolbar } from "../finder-chrome";

export default function EducationWindow() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FinderToolbar
        path="Macintosh HD \u203a Users \u203a dharmendra \u203a Education"
        isActive
        view="list"
        onViewChange={() => {}}
        hideViewToggle
      />

      <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-white px-5 py-5">
        <div className="space-y-3">
          {education.map((item, index) => (
            <motion.a
              key={item.institution}
              href={item.site}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
                delay: index * 0.08,
              }}
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
              className="group flex items-center gap-4 rounded-xl bg-zinc-50 p-3.5 ring-1 ring-black/5 transition-colors hover:bg-white hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.3)]"
            >
              <motion.div
                animate={{ rotate: hovered === index ? 0 : 0, scale: hovered === index ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/10"
              >
                <Image
                  src={item.logo}
                  alt={item.institution}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </motion.div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-zinc-800">
                  {item.institution}
                </p>
                <p className="truncate text-[12.5px] text-zinc-600">
                  {item.degree} · {item.fieldOfStudy}
                </p>
                <p className="mt-0.5 text-[11.5px] text-zinc-400">
                  {item.startYear} — {item.endYear}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11.5px] font-semibold text-emerald-700 ring-1 ring-emerald-600/15">
                  {item.percentage}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] text-zinc-400 transition-colors group-hover:text-sky-600">
                  <GraduationCap className="h-3 w-3" />
                  Website
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <FinderStatusBar>{education.length} records</FinderStatusBar>
    </div>
  );
}
