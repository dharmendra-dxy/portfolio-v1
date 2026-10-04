"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DockApp, WindowId } from "./mac-config";

type DockRow = { kind: "app"; app: DockApp } | { kind: "separator" };

const MAX_SCALE = 1.72;
const INFLUENCE = 108;
const PADDING = 16;
const SEPARATOR = 1;
const SPRING = { type: "spring" as const, stiffness: 460, damping: 26, mass: 0.5 };

interface DockProps {
  apps: DockApp[];
  tools: DockApp[];
  magnify: boolean;
  isOpen: (id: WindowId) => boolean;
  isMinimized: (id: WindowId) => boolean;
  isActive: (id: WindowId) => boolean;
  bounce: Record<string, number>;
  onLaunch: (id: string) => void;
  onBounce: (id: string) => void;
}

export default function Dock({
  apps,
  tools,
  magnify,
  isOpen,
  isMinimized,
  isActive,
  bounce,
  onLaunch,
  onBounce,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [pointer, setPointer] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rows: DockRow[] = [
    ...apps.map((app) => ({ kind: "app" as const, app })),
    { kind: "separator" as const },
    ...tools.map((app) => ({ kind: "app" as const, app })),
  ];

  const compact = viewportWidth < 768;
  const count = apps.length + tools.length;
  const gap = compact ? 6 : 12;
  const base = compact
    ? Math.max(
        26,
        Math.min(
          40,
          Math.round(
            (viewportWidth - 16 - PADDING - SEPARATOR - (count - 1) * gap) / count,
          ),
        ),
      )
    : 54;
  const radius = compact ? 11 : 13;

  const scaleFor = (id: string) => {
    if (pointer === null || !magnify) return 1;
    const el = itemRefs.current[id];
    const dock = dockRef.current;
    if (!el || !dock) return 1;
    const center = dock.getBoundingClientRect().left + el.offsetLeft + el.offsetWidth / 2;
    const distance = pointer - center;
    const falloff = Math.exp(-(distance * distance) / (2 * INFLUENCE * INFLUENCE));
    return 1 + (MAX_SCALE - 1) * falloff;
  };

  const scales = new Map<string, number>();
  rows.forEach((row) => {
    if (row.kind === "app") scales.set(row.app.id, scaleFor(row.app.id));
  });

  // Icons grow, push their neighbours aside and the Dock panel grows with them.
  const spread = new Map<string, number>();
  let spreadTotal = 0;
  rows.forEach((row) => {
    if (row.kind !== "app") return;
    const scale = scales.get(row.app.id) ?? 1;
    spread.set(row.app.id, spreadTotal);
    spreadTotal += base * (scale - 1);
  });

  const naturalWidth =
    count * base + (count - 1) * gap + SEPARATOR + PADDING + (compact ? 0 : 8);

  const renderItem = (app: DockApp) => {
    const isWindow = app.id !== "trash";
    const running =
      isWindow &&
      (isOpen(app.id as WindowId) || isMinimized(app.id as WindowId));
    const focused = isWindow && isActive(app.id as WindowId);
    const scale = scales.get(app.id) ?? 1;
    const bump = bounce[app.id] ?? 0;

    return (
      <motion.div
        key={app.id}
        ref={(node) => {
          itemRefs.current[app.id] = node;
        }}
        className="relative flex shrink-0 flex-col items-center"
        animate={{ x: magnify ? spread.get(app.id) ?? 0 : 0 }}
        transition={SPRING}
        style={{ width: base }}
      >
        <motion.div
          key={`bounce-${app.id}-${bump}`}
          initial={{ scale: 1 }}
          animate={
            bump > 0
              ? { scale: [1, 1.24, 0.92, 1.06, 1], y: [0, -10, 0, -3, 0] }
              : { scale: 1, y: 0 }
          }
          transition={
            bump > 0
              ? { duration: 0.72, times: [0, 0.22, 0.5, 0.72, 1], ease: "easeInOut" }
              : SPRING
          }
        >
          <motion.button
            type="button"
            onPointerEnter={() => setHovered(app.id)}
            onPointerLeave={() => setHovered((h) => (h === app.id ? null : h))}
            onClick={() => {
              onBounce(app.id);
              onLaunch(app.id);
            }}
            aria-label={app.label}
            animate={{ scale, y: -((scale - 1) * base) / 2 }}
            transition={SPRING}
            whileTap={{ scale: scale * 0.9 }}
            style={{ width: base, height: base, borderRadius: radius }}
            className={cn(
              "relative flex items-center justify-center overflow-hidden bg-gradient-to-b text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.18),0_6px_16px_-4px_rgba(0,0,0,0.5)]",
              app.gradient,
              app.ink,
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
            <span
              className="relative flex items-center justify-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
              style={{ height: base * 0.58, width: base * 0.58 }}
            >
              {app.icon}
            </span>
          </motion.button>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          initial={false}
          animate={{
            opacity: hovered === app.id ? 1 : 0,
            y: hovered === app.id ? 0 : 4,
            scale: hovered === app.id ? 1 : 0.96,
          }}
          transition={{ duration: 0.14 }}
          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-zinc-900/80 px-2 py-[3px] text-[12px] font-medium text-white shadow-lg backdrop-blur-xl"
        >
          {app.label}
        </motion.div>

        {/* Running indicator */}
        <span
          className={cn(
            "mt-1 h-[4px] shrink-0 rounded-full bg-zinc-900/70 transition-all duration-200",
            running
              ? focused
                ? "w-[4px] opacity-100"
                : "w-[4px] opacity-45"
              : "w-0 opacity-0",
          )}
        />
      </motion.div>
    );
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[8000] flex justify-center pb-2">
      <motion.div
        initial={{ y: 90, opacity: 0, width: naturalWidth }}
        animate={{ y: 0, opacity: 1, width: naturalWidth + spreadTotal }}
        transition={{ ...SPRING, delay: 0.45 }}
        className="pointer-events-auto rounded-[22px] border border-white/25 bg-white/30 px-2 pb-1.5 pt-2 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl"
        style={{ WebkitBackdropFilter: "blur(28px) saturate(180%)" }}
      >
        <div
          ref={dockRef}
          onPointerMove={(event) => setPointer(event.clientX)}
          onPointerLeave={() => setPointer(null)}
          className="relative mx-auto flex w-max items-end"
          style={{ gap }}
        >
          {rows.map((row) =>
            row.kind === "app" ? (
              renderItem(row.app)
            ) : (
              <div
                key="separator"
                className="mb-1 shrink-0 bg-white/45"
                style={{ height: base * 0.78, width: SEPARATOR }}
              />
            ),
          )}
        </div>
      </motion.div>
    </div>
  );
}
