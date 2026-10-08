"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DockApp, WindowId } from "./mac-config";

type DockRow = { kind: "app"; app: DockApp } | { kind: "separator" };

const MAX_SCALE = 1.8;
const INFLUENCE = 118;
const SEPARATOR = 1;
const SIDE_PAD = 8;
const PANEL_BORDER = 2;
const PANEL_V_PAD = 14;
const EDGE_MARGIN = 10;
const TOOLTIP_GAP = 6;

/* Scale snaps then settles a touch like the real Dock; x is critically damped so
   the glass never lags behind the icons and they never escape its edges. */
const SCALE_SPRING = { stiffness: 520, damping: 38 };
const X_SPRING = { stiffness: 520, damping: 46 };
const PRESS_SPRING = { stiffness: 900, damping: 48 };
const REST_SPRING = { type: "spring" as const, stiffness: 460, damping: 26, mass: 0.5 };
const ENTRANCE = { type: "spring" as const, stiffness: 240, damping: 26, mass: 0.9 };
const BOUNCE = {
  duration: 0.72,
  times: [0, 0.22, 0.5, 0.72, 1],
  ease: "easeInOut" as const,
};

type Spring = { value: number; velocity: number };

const makeSpring = (value = 0): Spring => ({ value, velocity: 0 });

function stepSpring(
  spring: Spring,
  target: number,
  stiffness: number,
  damping: number,
  dt: number,
) {
  const steps = Math.max(1, Math.min(8, Math.ceil(dt * 240)));
  const h = dt / steps;
  for (let i = 0; i < steps; i += 1) {
    const accel = -stiffness * (spring.value - target) - damping * spring.velocity;
    spring.velocity += accel * h;
    spring.value += spring.velocity * h;
  }
}

/* Asymptotic spread: free while there is room, glides toward the available
   width instead of ever passing it. */
const softClamp = (value: number, budget: number) =>
  budget <= 0 ? 0 : budget * (1 - Math.exp(-Math.max(0, value) / budget));

type Runtime = {
  id: string;
  wrap: HTMLDivElement | null;
  button: HTMLButtonElement | null;
  tip: HTMLDivElement | null;
  center: number;
  target: number;
  offset: number;
  scale: Spring;
  x: Spring;
  press: Spring;
  painted: { wrap: string; button: string; tip: string };
};

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
  const panelRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const runtimes = useRef(new Map<string, Runtime>());
  const order = useRef<Runtime[]>([]);
  const pointerRef = useRef<number | null>(null);
  const pressedRef = useRef<string | null>(null);
  const magnifyRef = useRef(magnify);
  const wake = useRef<() => void>(() => {});
  const geometry = useRef({
    base: 54,
    naturalWidth: 0,
    naturalHeight: 0,
    budget: 0,
    maxScale: MAX_SCALE,
    influence: INFLUENCE,
    available: 0,
  });

  const [hovered, setHovered] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1440);

  magnifyRef.current = magnify;

  const rows: DockRow[] = [
    ...apps.map((app) => ({ kind: "app" as const, app })),
    { kind: "separator" as const },
    ...tools.map((app) => ({ kind: "app" as const, app })),
  ];

  const compact = viewportWidth < 768;
  const count = apps.length + tools.length;
  const gap = compact ? 6 : 12;
  const radius = compact ? 11 : 13;
  const chrome = SIDE_PAD * 2 + PANEL_BORDER;
  const available = Math.max(0, viewportWidth - EDGE_MARGIN * 2);
  /* Resting size always fits the screen, and on small screens deliberately
     leaves a slice of width aside for the Dock to expand into. */
  const reserve = compact ? Math.min(96, Math.max(24, Math.round(available * 0.12))) : 0;
  const base = Math.max(
    20,
    Math.min(
      compact ? 40 : 54,
      Math.floor(
        (available - reserve - chrome - SEPARATOR - (count - 1) * gap) / count,
      ),
    ),
  );

  /* Per-app spring state is reused across renders so pointer moves never reset
     an animation that is still in flight. */
  order.current = rows.flatMap((row) => {
    if (row.kind !== "app") return [];
    const existing = runtimes.current.get(row.app.id);
    if (existing) return [existing];
    const created: Runtime = {
      id: row.app.id,
      wrap: null,
      button: null,
      tip: null,
      center: 0,
      target: 1,
      offset: 0,
      scale: makeSpring(1),
      x: makeSpring(),
      press: makeSpring(),
      painted: { wrap: "", button: "", tip: "" },
    };
    runtimes.current.set(row.app.id, created);
    return [created];
  });

  /* Measure the resting layout, then work out how much magnification the free
     horizontal space can actually pay for. */
  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const items = order.current;

    items.forEach((item) => {
      const el = item.wrap;
      if (!el) return;
      item.center = rect.left + el.offsetLeft + el.offsetWidth / 2;
    });

    const naturalWidth = row.offsetWidth + chrome;
    /* A full slot per side is held back so the scaled icons always have glass
       underneath them, however hard the Dock is magnified. */
    const budget = Math.max(0, available - naturalWidth - base * (MAX_SCALE - 1));
    const centers = items.map((item) => item.center);
    const sigma2 = 2 * INFLUENCE * INFLUENCE;

    /* Typical spread the Dock asks for, found by sweeping the pointer across
       it, so the free space can be turned into an honest magnification. */
    const from = (centers[0] ?? 0) - INFLUENCE * 3;
    const to = (centers[centers.length - 1] ?? 0) + INFLUENCE * 3;
    let total = 0;
    let samples = 0;
    for (let x = from; x <= to; x += 4) {
      let running = 0;
      for (let i = 0; i < centers.length; i += 1) {
        const distance = x - centers[i];
        running += base * (MAX_SCALE - 1) * Math.exp(-(distance * distance) / sigma2);
      }
      total += running;
      samples += 1;
    }
    const typical = total / (samples || 1);

    geometry.current = {
      base,
      naturalWidth,
      naturalHeight: row.offsetHeight + PANEL_BORDER + PANEL_V_PAD,
      budget,
      maxScale: 1 + (MAX_SCALE - 1) * Math.min(1, budget / (typical || 1)),
      influence: INFLUENCE,
      available,
    };
  }, [available, base, chrome]);

  useLayoutEffect(() => {
    measure();
    wake.current();
  }, [measure, compact, count, rows.length]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* One rAF loop owns every transform, so hovering costs no re-renders and the
     springs stay frame accurate. It sleeps once everything settles. */
  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    let running = false;

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - previous) / 1000));
      previous = now;

      const geo = geometry.current;
      const items = order.current;
      const pointer = magnifyRef.current ? pointerRef.current : null;
      const sigma2 = 2 * geo.influence * geo.influence;

      let spread = 0;
      let previousGrowth = 0;
      let nearest = 0;
      let nearestGap = Number.POSITIVE_INFINITY;

      /* Pass one: how big each icon wants to be, then lay the row out with each
         gap opening up by half of each neighbour's growth, the way the real
         Dock does. */
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        let target = 1;
        if (pointer !== null) {
          const distance = pointer - item.center;
          const magnitude = Math.abs(distance);
          target = 1 + (geo.maxScale - 1) * Math.exp(-(distance * distance) / sigma2);
          if (magnitude < nearestGap) {
            nearestGap = magnitude;
            nearest = i;
          }
        }
        item.target = target;
        const growth = geo.base * (target - 1);
        item.offset = spread;
        if (i > 0) {
          spread = softClamp(spread + (previousGrowth + growth) / 2, geo.budget);
        }
        previousGrowth = growth;
      }

      /* Pass two: slide the row so the icon nearest the cursor does not budge,
         which is what keeps the magnified icon pinned under the pointer. */
      const recentre = items[nearest]?.offset ?? 0;
      let minLeft = Number.POSITIVE_INFINITY;
      let maxRight = Number.NEGATIVE_INFINITY;
      let tallest = 1;
      let settled = pointer === null;

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const target = item.target;
        const shift = item.offset - recentre;

        stepSpring(item.scale, target, SCALE_SPRING.stiffness, SCALE_SPRING.damping, dt);
        stepSpring(item.x, shift, X_SPRING.stiffness, X_SPRING.damping, dt);
        stepSpring(
          item.press,
          pressedRef.current === item.id ? 1 : 0,
          PRESS_SPRING.stiffness,
          PRESS_SPRING.damping,
          dt,
        );

        /* Only touch the DOM when the value really moved: the glass has a
           backdrop filter, so needless writes mean needless repaints. */
        if (item.wrap) {
          const next = `translate3d(${item.x.value}px, 0, 0)`;
          if (next !== item.painted.wrap) {
            item.wrap.style.transform = next;
            item.painted.wrap = next;
          }
        }
        if (item.button) {
          const lift = ((item.scale.value - 1) * geo.base) / 2;
          const press = 1 - 0.12 * item.press.value;
          const next =
            `translate3d(0, ${-lift}px, 0) ` + `scale(${item.scale.value * press})`;
          if (next !== item.painted.button) {
            item.button.style.transform = next;
            item.painted.button = next;
          }
        }
        if (item.tip) {
          const rise = TOOLTIP_GAP + (item.scale.value - 1) * geo.base;
          const next = `calc(100% + ${rise}px)`;
          if (next !== item.painted.tip) {
            item.tip.style.bottom = next;
            item.painted.tip = next;
          }
        }

        /* Where the icon actually sits right now, edges included. */
        const half = (geo.base * item.scale.value) / 2;
        const left = item.center - half + item.x.value;
        const right = item.center + half + item.x.value;
        if (left < minLeft) minLeft = left;
        if (right > maxRight) maxRight = right;
        if (item.scale.value > tallest) tallest = item.scale.value;

        if (
          Math.abs(item.scale.velocity) > 0.002 ||
          Math.abs(item.scale.value - target) > 0.0005 ||
          Math.abs(item.x.velocity) > 0.05 ||
          Math.abs(item.x.value - shift) > 0.05 ||
          Math.abs(item.press.value) > 0.001
        ) {
          settled = false;
        }
      }

      /* The glass is sized around the icons it holds, so it grows with them on
         both axes and never lets one poke out, not even mid-spring. */
      const panel = panelRef.current;
      if (panel && geo.naturalWidth > 0) {
        const centre = geo.available / 2 + EDGE_MARGIN;
        const reach = Math.max(centre - minLeft, maxRight - centre);
        const width = `${Math.min(geo.available, (reach + SIDE_PAD) * 2)}px`;
        const height = `${geo.naturalHeight + (tallest - 1) * geo.base}px`;
        if (panel.style.width !== width) panel.style.width = width;
        if (panel.style.height !== height) panel.style.height = height;
      }

      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    };
    wake.current = start;

    const onMove = (event: PointerEvent) => {
      pointerRef.current = event.clientX;
      start();
    };
    const onLeave = () => {
      pointerRef.current = null;
      start();
    };
    const onDown = (event: PointerEvent) => {
      const item = (event.target as HTMLElement | null)?.closest("[data-dock-id]");
      pressedRef.current = item ? item.getAttribute("data-dock-id") : null;
      start();
    };
    const onUp = () => {
      if (!pressedRef.current) return;
      pressedRef.current = null;
      start();
    };

    const panel = panelRef.current;
    panel?.addEventListener("pointermove", onMove, { passive: true });
    panel?.addEventListener("pointerleave", onLeave, { passive: true });
    panel?.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    start();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      wake.current = () => {};
      panel?.removeEventListener("pointermove", onMove);
      panel?.removeEventListener("pointerleave", onLeave);
      panel?.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const renderItem = (app: DockApp) => {
    const isWindow = app.id !== "trash";
    const running =
      isWindow && (isOpen(app.id as WindowId) || isMinimized(app.id as WindowId));
    const focused = isWindow && isActive(app.id as WindowId);
    const runtime = runtimes.current.get(app.id);
    const bump = bounce[app.id] ?? 0;

    return (
      <motion.div
        key={app.id}
        ref={(node) => {
          if (runtime) runtime.wrap = node;
        }}
        data-dock-id={app.id}
        className="relative flex shrink-0 flex-col items-center"
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
          transition={bump > 0 ? BOUNCE : REST_SPRING}
        >
          <button
            type="button"
            ref={(node) => {
              if (runtime) runtime.button = node;
            }}
            onPointerEnter={() => setHovered(app.id)}
            onPointerLeave={() => setHovered((h) => (h === app.id ? null : h))}
            onClick={() => {
              onBounce(app.id);
              onLaunch(app.id);
            }}
            aria-label={app.label}
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
          </button>
        </motion.div>

        {/* Tooltip rides above the enlarged icon */}
        <motion.div
          ref={(node) => {
            if (runtime) runtime.tip = node;
          }}
          initial={false}
          animate={{
            opacity: hovered === app.id ? 1 : 0,
            y: hovered === app.id ? 0 : 4,
            scale: hovered === app.id ? 1 : 0.96,
          }}
          transition={{ duration: 0.14 }}
          className="pointer-events-none absolute inset-x-0 bottom-[6px] flex justify-center"
        >
          <span className="whitespace-nowrap rounded-md border border-white/15 bg-zinc-900/80 px-2 py-[3px] text-[12px] font-medium text-white shadow-lg backdrop-blur-xl">
            {app.label}
          </span>
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
        ref={panelRef}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...ENTRANCE, delay: 0.45 }}
        className="pointer-events-auto flex items-end justify-center rounded-[22px] border border-white/25 bg-white/30 px-2 pb-1.5 pt-2 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl"
        style={{ WebkitBackdropFilter: "blur(28px) saturate(180%)" }}
      >
        <div ref={rowRef} className="relative flex w-max items-end" style={{ gap }}>
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