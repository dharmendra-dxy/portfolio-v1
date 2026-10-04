"use client";

import { motion } from "framer-motion";
import { DriveGlyph, DocGlyph, FolderGlyph } from "./mac-icons";
import type { WindowId } from "./mac-config";

const ICONS = [
  { id: "drive" as const, label: "Macintosh HD", glyph: <DriveGlyph className="h-full w-full" /> },
  { id: "projects" as WindowId, label: "Projects", glyph: <FolderGlyph className="h-full w-full" /> },
  { id: "about" as WindowId, label: "Résumé.pdf", glyph: <DocGlyph className="h-full w-full" /> },
];

export default function DesktopIcons({
  onOpen,
}: {
  onOpen: (id: WindowId) => void;
}) {
  return (
    <div className="pointer-events-none absolute right-3 top-9 hidden flex-col items-end gap-1 sm:flex">
      {ICONS.map((item, index) => (
        <motion.button
          key={item.label}
          type="button"
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 26,
            delay: 0.6 + index * 0.08,
          }}
          onDoubleClick={() => {
            if (item.id !== "drive") onOpen(item.id);
          }}
          className="pointer-events-auto group flex w-[92px] flex-col items-center gap-1 rounded-lg p-1.5"
        >
          <motion.span
            whileTap={{ scale: 0.9 }}
            className="flex h-[46px] w-[46px] items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
          >
            {item.glyph}
          </motion.span>
          <span className="line-clamp-2 max-w-full rounded bg-white/25 px-1 py-[1px] text-center text-[11px] font-medium leading-tight text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-colors group-hover:bg-white/40">
            {item.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
