"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Image as ImageIcon, Palette, Sparkles } from "lucide-react";
import { profile } from "@/constant/profile";
import {
  availableWallpapers,
  preloadWallpaper,
  type Wallpaper,
} from "@/constant/wallpaper";

const PLATFORM = "iphone" as const;
import { AppScreen, Row } from "../ios-ui";

/**
 * Plain swatch — no blur, no filters, no motion. Every swatch is a single
 * painted div so the picker stays cheap on a phone.
 */
function Swatch({
  wallpaper,
  active,
  onSelect,
}: {
  wallpaper: Wallpaper;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={wallpaper.name}
      className="relative aspect-[9/16] overflow-hidden rounded-xl ring-1 ring-black/10 transition-transform duration-100 active:scale-[0.95]"
      style={{ background: wallpaper.background }}
    >
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-1.5 pb-1 pt-4 text-left text-[9.5px] font-semibold leading-tight text-white">
        {wallpaper.name}
      </span>

      {active && (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow">
          <Check className="h-2.5 w-2.5 text-blue-600" strokeWidth={3.2} />
        </span>
      )}
    </button>
  );
}

interface SettingsAppProps {
  wallpaper: Wallpaper;
  onWallpaperChange: (wallpaper: Wallpaper) => void;
  onBack: () => void;
}

export default function SettingsApp({
  wallpaper,
  onWallpaperChange,
  onBack,
}: SettingsAppProps) {
  const [pending, setPending] = useState<string | null>(null);
  const list = availableWallpapers(PLATFORM);

  const select = (next: Wallpaper) => {
    if (next.id === wallpaper.id) return;
    setPending(next.id);
    // Paint-critical: wait for the bitmap, then swap in one frame.
    preloadWallpaper(next).then(() => {
      onWallpaperChange(next);
      setPending(null);
    });
  };

  return (
    <AppScreen title="Settings" onBack={onBack}>
      <div className="mt-2 px-4">
        <div className="flex items-center gap-2 px-3 pb-2">
          <Palette className="h-4 w-4 text-zinc-500" />
          <p className="text-[13px] uppercase tracking-wide text-zinc-500">
            Wallpaper
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white p-3">
          <div className="grid grid-cols-3 gap-2.5">
            {list.map((item) => (
              <Swatch
                key={item.id}
                wallpaper={item}
                active={item.id === wallpaper.id}
                onSelect={() => select(item)}
              />
            ))}
          </div>

          <p className="mt-3 px-0.5 text-[12.5px] leading-relaxed text-zinc-500">
            {pending
              ? "Loading wallpaper…"
              : `Showing “${wallpaper.name}”. Your choice is kept for this session — add more in constant/wallpaper.ts.`}
          </p>
        </div>
      </div>

      <div className="mt-5 px-4">
        <div className="overflow-hidden rounded-2xl bg-white">
          <Row
            icon={<Sparkles className="h-4 w-4" />}
            tint="bg-gradient-to-br from-indigo-400 to-purple-600"
            title="Current wallpaper"
            value={wallpaper.name}
          />
          <Row
            icon={<ImageIcon className="h-4 w-4" />}
            tint="bg-zinc-500"
            title="Wallpapers available"
            value={`${list.length}`}
          />
        </div>
      </div>

      <div className="mt-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-4 text-white"
        >
          <p className="text-[16px] font-semibold">Settings</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white/80">
            This iOS shell runs {profile.handle} — tap the home bar to go back to
            the home screen at any time.
          </p>
        </motion.div>
      </div>
    </AppScreen>
  );
}
