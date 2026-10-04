"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Link2 } from "lucide-react";
import type { WorkItem } from "./windows/projects-window";

const ICON_MAP: Record<string, string> = {
  nextjs: "https://cdn.simpleicons.org/nextdotjs/18181b",
  tailwind: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  postgres: "https://cdn.simpleicons.org/postgresql/4169E1",
  react: "https://cdn.simpleicons.org/react/61DAFB",
  firebase: "https://cdn.simpleicons.org/firebase/FFCA28",
  framer: "https://cdn.simpleicons.org/framer/18181b",
};

export default function QuickLook({
  work,
  onClose,
}: {
  work: WorkItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="pointer-events-auto absolute inset-0 z-[7000] flex items-center justify-center bg-black/25 p-6 backdrop-blur-[3px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white/85 ring-1 ring-black/10 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            <div className="flex h-8 shrink-0 items-center justify-center border-b border-black/10 bg-zinc-100/80 text-[12px] font-medium text-zinc-500">
              {work.title}
            </div>

            <div className="mac-scroll min-h-0 flex-1 overflow-y-auto">
              {work.cover && (
                <div className="relative aspect-[16/9] w-full bg-zinc-100">
                  <Image
                    src={work.cover}
                    alt={work.title}
                    fill
                    sizes="640px"
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 px-6 py-5">
                <div>
                  <h2 className="text-[20px] font-semibold tracking-tight text-zinc-900">
                    {work.title}
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">
                    {work.description}
                  </p>
                </div>

                {work.features && work.features.length > 0 && (
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Features
                    </p>
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {work.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-[12.5px] text-zinc-600"
                        >
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {work.technologies && work.technologies.length > 0 && (
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {work.technologies.map((tech) => (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2 py-1 text-[11.5px] font-medium text-zinc-700"
                        >
                          {ICON_MAP[tech.icon.toLowerCase()] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={ICON_MAP[tech.icon.toLowerCase()]}
                              alt={tech.name}
                              width={12}
                              height={12}
                              className="h-3 w-3"
                            />
                          )}
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-center gap-2 border-t border-black/10 bg-zinc-100/80 px-4 py-2.5">
              {work.github && (
                <a
                  href={work.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-700 ring-1 ring-black/10 transition-colors hover:bg-zinc-50"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              )}
              {work.link && (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f6fed] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#2560d8]"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  Open live site
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
