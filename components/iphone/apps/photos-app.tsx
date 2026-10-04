"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { works } from "@/constant/works";
import { cloudinaryImage } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import { AppScreen } from "../ios-ui";

export default function PhotosApp({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState<number | null>(null);
  const work = index === null ? null : works[index];

  return (
    <>
      <AppScreen title="Gallery" onBack={onBack} bare>
        <div className="grid grid-cols-2 gap-1 px-1">
          {works.map((item, itemIndex) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setIndex(itemIndex)}
              className="relative aspect-square overflow-hidden bg-zinc-200 transition-transform duration-100 active:scale-[0.97]"
            >
              {item.cover && (
                <Image
                  src={cloudinaryImage(item.cover, 400) as string}
                  alt={item.title}
                  fill
                  sizes="200px"
                  unoptimized
                  loading="lazy"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>

        <p className="py-5 text-center text-[13px] text-zinc-400">
          {works.length} shipped projects — tap to open
        </p>
      </AppScreen>

      <AnimatePresence>
        {work && (
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 z-50 flex flex-col bg-black"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative min-h-0 flex-1">
              {work.cover && (
                <div className="absolute inset-0">
                  <Image
                    src={cloudinaryImage(work.cover, 900) as string}
                    alt={work.title}
                    fill
                    sizes="400px"
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Close"
                className="absolute right-3 top-12 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white active:bg-black/55"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10">
                <p className="text-[17px] font-semibold text-white">{work.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-white/70">
                  {work.description}
                </p>
                {work.link && (
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block rounded-xl bg-white/95 py-2.5 text-center text-[15px] font-semibold text-black active:opacity-80"
                  >
                    Open live site
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-none items-center justify-center gap-1.5 pb-9 pt-2">
              {works.map((item, dotIndex) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={item.title}
                  onClick={() => setIndex(dotIndex)}
                  className={cn(
                    "h-[6px] rounded-full transition-all duration-200",
                    dotIndex === index ? "w-4 bg-white" : "w-[6px] bg-white/45",
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
