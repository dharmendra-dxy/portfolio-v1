"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { education } from "@/constant/education";
import { AppScreen } from "../ios-ui";

export default function EducationApp({ onBack }: { onBack: () => void }) {
  return (
    <AppScreen title="Education" onBack={onBack}>
      <div className="mt-3 space-y-3 px-4">
        {education.map((item, index) => (
          <motion.a
            key={item.institution}
            href={item.site}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 26,
              delay: index * 0.08,
            }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          >
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-black/5">
              <Image
                src={item.logo}
                alt={item.institution}
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[15.5px] font-semibold leading-snug text-zinc-900">
                {item.institution}
              </span>
              <span className="mt-0.5 block text-[13.5px] text-zinc-600">
                {item.degree}
              </span>
              <span className="mt-0.5 block text-[12.5px] text-zinc-400">
                {item.fieldOfStudy} · {item.startYear}–{item.endYear}
              </span>
            </span>

            <span className="flex shrink-0 flex-col items-end gap-1">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[12px] font-semibold text-emerald-700">
                {item.percentage}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-300" />
            </span>
          </motion.a>
        ))}
      </div>

      <div className="mx-4 mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-4 text-white">
        <GraduationCap className="mb-2 h-5 w-5 opacity-90" />
        <p className="text-[16px] font-semibold">Computer Science (DS)</p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-white/80">
          Data Science specialisation with a full-stack engineering career —
          Next.js, TypeScript, Node, Postgres and cloud tooling.
        </p>
      </div>
    </AppScreen>
  );
}
