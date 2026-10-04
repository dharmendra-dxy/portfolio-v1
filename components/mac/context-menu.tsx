"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FolderPlus, Info, Paintbrush, RefreshCw, Trash2 } from "lucide-react";

export interface ContextMenuState {
  x: number;
  y: number;
}

interface DesktopContextMenuProps {
  menu: ContextMenuState | null;
  onClose: () => void;
  onAction: (action: string) => void;
}

const ITEMS = [
  { id: "new-folder", label: "New Folder", icon: FolderPlus, shortcut: "\u2318N" },
  { id: "info", label: "Get Info", icon: Info, shortcut: "\u2318I" },
  { id: "wallpaper", label: "Desktop Background\u2026", icon: Paintbrush },
  { id: "refresh", label: "Refresh", icon: RefreshCw, shortcut: "\u2318R" },
  { id: "empty", label: "Empty Trash", icon: Trash2, separator: true },
];

export default function DesktopContextMenu({
  menu,
  onClose,
  onAction,
}: DesktopContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu, onClose]);

  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.11, ease: [0.32, 0.72, 0, 1] }}
          style={{ left: menu.x, top: menu.y }}
          className="fixed z-[9600] w-[218px] origin-top-left overflow-hidden rounded-lg border border-white/40 bg-white/72 py-1 shadow-[0_22px_60px_-14px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          {ITEMS.map((item) => (
            <div key={item.id}>
              {item.separator && <div className="my-1 h-px bg-black/10" />}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onAction(item.id);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-[3px] text-left text-[13px] text-zinc-800 transition-colors hover:bg-[#2f6fed] hover:text-white"
              >
                <item.icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-[12px] opacity-55">{item.shortcut}</span>
                )}
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
