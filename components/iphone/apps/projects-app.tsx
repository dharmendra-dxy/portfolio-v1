"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpLeft, Github, Search, X } from "lucide-react";
import { works } from "@/constant/works";
import { cloudinaryImage } from "@/lib/cloudinary";
import { AppScreen } from "../ios-ui";

type Work = (typeof works)[number];

const ICON_MAP: Record<string, string> = {
  nextjs: "https://cdn.simpleicons.org/nextdotjs/18181b",
  tailwind: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  postgres: "https://cdn.simpleicons.org/postgresql/4169E1",
  react: "https://cdn.simpleicons.org/react/61DAFB",
  firebase: "https://cdn.simpleicons.org/firebase/FFCA28",
  framer: "https://cdn.simpleicons.org/framer/18181b",
};

export default function ProjectsApp({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Work | null>(null);

  const visible = works.filter((work) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      work.title.toLowerCase().includes(q) ||
      work.description.toLowerCase().includes(q) ||
      work.technologies?.some((tech) => tech.name.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <AppScreen title="Projects" onBack={onBack} bare={!!open}>
        {!open && (
          <>
            <label className="mx-4 mb-3 mt-2 flex h-9 items-center gap-2 rounded-xl bg-white px-3">
              <Search className="h-4 w-4 shrink-0 text-zinc-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects"
                className="w-full bg-transparent text-[16px] text-zinc-900 outline-none placeholder:text-zinc-400"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 px-4">
              {visible.map((work) => (
                <button
                  key={work.title}
                  type="button"
                  onClick={() => setOpen(work)}
                  className="overflow-hidden rounded-2xl bg-white text-left transition-transform duration-100 active:scale-[0.97]"
                >
                  <div className="relative aspect-[4/3] w-full bg-zinc-100">
                    {work.cover && (
                      <Image
                        src={cloudinaryImage(work.cover, 400) as string}
                        alt={work.title}
                        fill
                        sizes="200px"
                        unoptimized
                        loading="lazy"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[14px] font-semibold text-zinc-900">
                      {work.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-zinc-500">
                      {work.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {visible.length === 0 && (
              <p className="py-16 text-center text-[15px] text-zinc-400">
                No projects match “{query}”.
              </p>
            )}
          </>
        )}
      </AppScreen>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 z-50 flex flex-col bg-[#f2f2f7]"
            style={{ willChange: "transform" }}
          >
            <div className="absolute inset-x-0 top-11 z-20 flex h-11 items-center justify-center border-b border-black/[0.08] bg-[#f7f7f9]/95 px-3">
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Back"
                className="absolute left-2 flex items-center gap-0.5 text-[17px] text-[#007aff]"
              >
                <ArrowUpLeft className="h-5 w-5" strokeWidth={2.6} />
                <span>Projects</span>
              </button>
              <span className="mx-auto max-w-[46%] truncate px-2 text-[16px] font-semibold text-zinc-900">
                {open.title}
              </span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute right-3 text-zinc-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mac-scroll min-h-0 flex-1 overflow-y-auto pt-[88px]">
              {open.cover && (
                <div className="relative aspect-[16/10] w-full bg-zinc-100">
                  <Image
                    src={cloudinaryImage(open.cover, 800) as string}
                    alt={open.title}
                    fill
                    sizes="400px"
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 px-4 py-4">
                <div>
                  <h2 className="text-[22px] font-bold tracking-[-0.02em] text-zinc-900">
                    {open.title}
                  </h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-zinc-600">
                    {open.description}
                  </p>
                </div>

                {open.features && open.features.length > 0 && (
                  <div className="overflow-hidden rounded-xl bg-white">
                    {open.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 border-b border-black/[0.07] px-3 py-2.5 text-[15px] text-zinc-800 last:border-0"
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                {open.technologies && open.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {open.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[13px] font-medium text-zinc-700"
                      >
                        {ICON_MAP[tech.icon.toLowerCase()] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={ICON_MAP[tech.icon.toLowerCase()]}
                            alt={tech.name}
                            width={13}
                            height={13}
                            loading="lazy"
                            className="h-[13px] w-[13px]"
                          />
                        )}
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  {open.link && (
                    <a
                      href={open.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-[#007aff] py-3 text-center text-[16px] font-semibold text-white active:opacity-70"
                    >
                      Open live site
                    </a>
                  )}
                  {open.github && (
                    <a
                      href={open.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-[16px] font-semibold text-zinc-900 active:bg-zinc-200"
                    >
                      <Github className="h-4 w-4" />
                      View source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
