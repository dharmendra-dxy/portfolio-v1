"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/constant/experience";
import { cn } from "@/lib/utils";
import { AppScreen, Pill } from "../ios-ui";

export default function ExperienceApp({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(
    `${experience[experience.length - 1]?.company}-${experience[experience.length - 1]?.role}`,
  );

  return (
    <AppScreen title="Experience" onBack={onBack}>
      <div className="mt-3 space-y-3 px-4">
        {experience.map((item, index) => {
          const key = `${item.company}-${item.role}`;
          const open = expanded === key;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
                delay: index * 0.07,
              }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <button
                type="button"
                onClick={() => setExpanded(open ? null : key)}
                className="flex w-full items-center gap-3 px-3.5 py-3 text-left active:bg-zinc-50"
              >
                <Image
                  src={item.url}
                  alt={item.company}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain p-1 ring-1 ring-black/5"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15.5px] font-semibold text-zinc-900">
                    {item.role}
                  </span>
                  <span className="block truncate text-[13px] text-zinc-500">
                    {item.company} · {item.duration}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-zinc-300"
                >
                  <ChevronDown className="h-5 w-5" />
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
                    <div className="border-t border-black/[0.07] px-3.5 py-3">
                      <ul className="space-y-2.5">
                        {item.description.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex gap-2 text-[14px] leading-relaxed text-zinc-700"
                          >
                            <span
                              className={cn(
                                "mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full",
                                "bg-emerald-500",
                              )}
                            />
                            {point.title}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Pill tone="green">{item.duration}</Pill>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="px-4 pt-5">
        <p className="rounded-xl bg-white p-3.5 text-center text-[13px] leading-relaxed text-zinc-500">
          Tap a card to expand the details. Every bullet above is a real
          measurable outcome from the role.
        </p>
      </div>
    </AppScreen>
  );
}
