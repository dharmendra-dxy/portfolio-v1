"use client";

import { motion } from "framer-motion";
import { Check, Image as ImageIcon, Monitor } from "lucide-react";
import {
  availableWallpapers,
  type Wallpaper,
} from "@/constant/wallpaper";
import { cn } from "@/lib/utils";
import { FinderStatusBar, FinderToolbar, SidebarGroup, SidebarItem } from "../finder-chrome";

/**
 * Thumbnail swatch. Deliberately filter-free: no blur, no backdrop-filter,
 * no scale-on-hover on the image itself, so scrolling the grid stays cheap.
 */
function WallpaperThumb({
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
      className={cn(
        "group flex w-full flex-col items-center gap-1.5 rounded-lg p-1.5 text-center transition-colors",
        active ? "bg-blue-500/10" : "hover:bg-zinc-50",
      )}
    >
      <span
        className={cn(
          "relative block aspect-[16/10] w-full overflow-hidden rounded-[7px] ring-1 transition-shadow",
          active
            ? "ring-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.25)]"
            : "ring-black/10 group-hover:ring-black/20",
        )}
        style={{ background: wallpaper.background }}
      >
        {active && (
          <span className="absolute bottom-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
            <Check className="h-2.5 w-2.5 text-blue-600" strokeWidth={3.4} />
          </span>
        )}
      </span>

      <span
        className={cn(
          "w-full truncate text-[11.5px]",
          active ? "font-medium text-zinc-800" : "text-zinc-500",
        )}
      >
        {wallpaper.name}
      </span>
    </button>
  );
}

interface SettingsWindowProps {
  wallpaper: Wallpaper;
  onWallpaperChange: (wallpaper: Wallpaper) => void;
}

export default function SettingsWindow({
  wallpaper,
  onWallpaperChange,
}: SettingsWindowProps) {
  const list = availableWallpapers("mac");

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="mac-scroll hidden w-[168px] shrink-0 overflow-y-auto border-r border-black/10 bg-zinc-100/70 px-2 py-3 md:block">
        <SidebarGroup title="Appearance">
          <SidebarItem
            icon={<Monitor className="h-3.5 w-3.5" />}
            label="Wallpaper"
            active
          />
        </SidebarGroup>
        <SidebarGroup title="Library">
          <SidebarItem
            icon={<ImageIcon className="h-3.5 w-3.5" />}
            label={`${list.length} available`}
          />
        </SidebarGroup>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <FinderToolbar
          path={`System Settings \u203a Appearance \u203a Wallpaper`}
          isActive
          view="grid"
          onViewChange={() => {}}
          hideViewToggle
        />

        <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-white px-4 py-4">
          <h2 className="text-[13px] font-semibold text-zinc-700">Wallpaper</h2>
          <p className="mt-0.5 text-[12px] text-zinc-500">
            Pick a wallpaper. It applies instantly to this desktop.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
          >
            {list.map((item) => (
              <WallpaperThumb
                key={item.id}
                wallpaper={item}
                active={item.id === wallpaper.id}
                onSelect={() => onWallpaperChange(item)}
              />
            ))}
          </motion.div>

          <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-[12px] leading-relaxed text-zinc-500">
            Wallpapers live in{" "}
            <code className="rounded bg-zinc-200 px-1 py-0.5 font-mono text-[11px] text-zinc-700">
              constant/wallpaper.ts
            </code>
            . Add gradient or image entries there and they appear in this picker
            and on the iPhone route. Image wallpapers are preloaded before being
            applied, so the swap never flashes.
          </p>
        </div>

        <FinderStatusBar>
          {wallpaper.name} · {list.length} wallpaper{list.length === 1 ? "" : "s"}
        </FinderStatusBar>
      </div>
    </div>
  );
}
