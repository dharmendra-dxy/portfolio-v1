"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { WindowConfig } from "./mac-config";
import { WindowExpandGlyph } from "./mac-icons";

export const MENU_BAR_HEIGHT = 28;
export const DOCK_RESERVE = 104;

const SPRING = { type: "spring" as const, stiffness: 420, damping: 40, mass: 0.8 };

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MacWindowProps {
  config: WindowConfig;
  isActive: boolean;
  isMinimized: boolean;
  zIndex: number;
  bounds: { width: number; height: number };
  isMobile: boolean;
  cascade: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
}

export default function MacWindow({
  config,
  isActive,
  isMinimized,
  zIndex,
  bounds,
  isMobile,
  cascade,
  containerRef,
  onFocus,
  onClose,
  onMinimize,
  children,
}: MacWindowProps) {
  const dragControls = useDragControls();
  // Capture the cascade offset once, on mount, so focusing a window
  // (which reorders the z-index list) never makes it jump.
  const cascadeRef = useRef(cascade);

  const computeRect = useCallback((): Rect => {
    const areaW = bounds.width;
    const areaH = bounds.height - MENU_BAR_HEIGHT - (isMobile ? 78 : DOCK_RESERVE);

    const width = isMobile
      ? areaW
      : Math.min(config.width, Math.max(config.minWidth, areaW - 48));
    const height = isMobile
      ? Math.max(240, areaH)
      : Math.min(config.height, Math.max(config.minHeight, areaH - 16));

    if (isMobile) return { x: 0, y: 0, width, height };

    const maxX = Math.max(0, areaW - width - 12);
    const maxY = Math.max(0, areaH - height - 12);
    const offset = cascadeRef.current;
    const x =
      offset === 0
        ? Math.round((areaW - width) / 2)
        : Math.min(Math.max(14, 22 + offset * 34), maxX);
    const y = Math.min(Math.max(10, 10 + offset * 30), maxY);

    return { x, y, width, height };
  }, [bounds.width, bounds.height, config, isMobile]);

  const [rect, setRect] = useState<Rect>(computeRect);
  const [zoomed, setZoomed] = useState(false);
  const resizeRef = useRef<{ startX: number; startY: number; rect: Rect } | null>(null);

  useEffect(() => {
    setRect(computeRect());
    setZoomed(false);
  }, [computeRect]);

  const zoomRect = useCallback((): Rect => {
    const areaW = bounds.width;
    const areaH = bounds.height - MENU_BAR_HEIGHT - (isMobile ? 78 : DOCK_RESERVE);
    if (isMobile) return { x: 0, y: 0, width: areaW, height: Math.max(240, areaH) };
    const width = Math.max(config.minWidth, areaW - 28);
    const height = Math.max(config.minHeight, areaH - 20);
    return { x: (areaW - width) / 2, y: Math.max(8, (areaH - height) / 2), width, height };
  }, [bounds.width, bounds.height, config, isMobile]);

  const toggleZoom = useCallback(() => {
    setZoomed((prev) => {
      if (prev) {
        setRect(computeRect());
        return false;
      }
      setRect(zoomRect());
      return true;
    });
  }, [computeRect, zoomRect]);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isMobile || zoomed) return;
    if (event.button !== 0 && event.pointerType === "mouse") return;
    onFocus();
    dragControls.start(event);
  };

  const startResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isMobile || zoomed) return;
    event.stopPropagation();
    onFocus();
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeRef.current = { startX: event.clientX, startY: event.clientY, rect };
  };

  const moveResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    const origin = resizeRef.current;
    if (!origin) return;
    const areaW = bounds.width;
    const areaH = bounds.height - MENU_BAR_HEIGHT - DOCK_RESERVE;
    const width = Math.min(
      Math.max(config.minWidth, origin.rect.width + (event.clientX - origin.startX)),
      areaW - origin.rect.x - 12,
    );
    const height = Math.min(
      Math.max(config.minHeight, origin.rect.height + (event.clientY - origin.startY)),
      areaH - origin.rect.y - 12,
    );
    setRect({ ...origin.rect, width, height });
  };

  const endResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    resizeRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const active = isActive && !isMinimized;

  return (
    <motion.div
      data-mac-window={config.id}
      className="absolute"
      style={{ left: rect.x, top: rect.y, width: rect.width, zIndex }}
      drag={!isMobile && !zoomed}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={containerRef}
      dragMomentum={false}
      dragElastic={0}
      onPointerDownCapture={onFocus}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, top: rect.y, height: rect.height }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ opacity: { duration: 0.2 }, default: SPRING }}
    >
      <motion.div
        className="h-full w-full origin-bottom"
        initial={{ scale: 0.9, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white/80 ring-1 shadow-[0_2px_0_0_rgba(255,255,255,0.6)_inset,0_24px_60px_-12px_rgba(0,0,0,0.55),0_0_0_0.5px_rgba(0,0,0,0.22)] backdrop-blur-2xl",
            active
              ? "ring-black/10 shadow-[0_2px_0_0_rgba(255,255,255,0.6)_inset,0_34px_80px_-14px_rgba(0,0,0,0.6),0_0_0_0.5px_rgba(0,0,0,0.25)]"
              : "ring-black/5 opacity-95",
          )}
        >
          {/* Title bar */}
          <div
            onPointerDown={startDrag}
            onDoubleClick={toggleZoom}
            className={cn(
              "relative flex h-9 shrink-0 touch-none select-none items-center gap-2 border-b border-black/10 px-3",
              active
                ? "bg-gradient-to-b from-zinc-200/95 to-zinc-100/90"
                : "bg-gradient-to-b from-zinc-100/80 to-zinc-50/80",
            )}
          >
            <div className="group/tl flex items-center gap-2">
              <button
                type="button"
                aria-label="Close window"
                onClick={onClose}
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.14)] transition-[filter] duration-150 hover:brightness-95"
              >
                <svg
                  viewBox="0 0 12 12"
                  className="h-2 w-2 scale-0 text-[#4d0000] opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="m3.4 3.4 5.2 5.2M8.6 3.4 3.4 8.6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Minimise window"
                onClick={onMinimize}
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.14)] transition-[filter] duration-150 hover:brightness-95"
              >
                <svg
                  viewBox="0 0 12 12"
                  className="h-2 w-2 scale-0 text-[#5c3a00] opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M2.8 6h6.4" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Zoom window"
                onClick={toggleZoom}
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.14)] transition-[filter] duration-150 hover:brightness-95"
              >
                <WindowExpandGlyph className="h-2 w-2 scale-0 text-[#04360f] opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100" />
              </button>
            </div>

            <div className="pointer-events-none absolute inset-x-0 flex justify-center px-20">
              <span
                className={cn(
                  "truncate text-[13px] font-semibold tracking-[-0.01em]",
                  active ? "text-zinc-700" : "text-zinc-400",
                )}
              >
                {config.title}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="relative flex min-h-0 flex-1 flex-col bg-white/85">
            {children}
          </div>

          {/* Resize grip */}
          {!isMobile && !zoomed && (
            <div
              onPointerDown={startResize}
              onPointerMove={moveResize}
              onPointerUp={endResize}
              onPointerCancel={endResize}
              className="absolute bottom-0 right-0 z-20 h-5 w-5 cursor-nwse-resize touch-none"
            >
              <svg
                viewBox="0 0 20 20"
                className="absolute bottom-1 right-1 h-4 w-4 text-black/25"
                fill="currentColor"
              >
                <path d="M19 11.5a1 1 0 0 1-1 1h-1.5v1.5a1 1 0 0 1-2 0V14h-1v2a1 1 0 0 1-2 0v-2h-1v1a1 1 0 0 1-2 0v-1H7a1 1 0 0 1 0-2h1V9a1 1 0 0 1 2 0v1h1V7.5a1 1 0 0 1 2 0V9h1V8a1 1 0 0 1 2 0v1.5h1a1 1 0 0 1 1 1z" />
              </svg>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
