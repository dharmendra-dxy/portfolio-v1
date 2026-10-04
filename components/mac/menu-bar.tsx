"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BatteryCharging, Bluetooth, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AppleLogo,
  BatteryIcon,
  ControlCenterIcon,
  SpotlightIcon,
  WifiIcon,
} from "./mac-icons";

export interface MenuItem {
  label?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  separator?: boolean;
  onSelect?: () => void;
}

export interface MenuBarMenu {
  id: string;
  title: string;
  bold?: boolean;
  items: MenuItem[];
}

interface MenuBarProps {
  appName: string;
  menus: MenuBarMenu[];
  activeWindowTitle?: string;
  onOpenMenu?: (id: string) => void;
  onToggleDark: () => void;
  onOpenSpotlight: () => void;
}

const CLOCK_FORMAT = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

const TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export default function MenuBar({
  appName,
  menus,
  activeWindowTitle,
  onOpenMenu,
  onToggleDark,
  onOpenSpotlight,
}: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [now, setNow] = useState<string>("");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () =>
      setNow(`${CLOCK_FORMAT.format(new Date())}  ${TIME_FORMAT.format(new Date())}`);
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const select = (item: MenuItem) => {
    if (item.disabled || item.separator) return;
    setOpenMenu(null);
    item.onSelect?.();
  };

  return (
    <div
      ref={barRef}
      className="pointer-events-auto absolute inset-x-0 top-0 z-[9000] flex h-7 items-center gap-0 border-b border-white/10 bg-white/25 px-2.5 text-[13px] font-medium text-white/95 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-2xl select-none"
      style={{ WebkitBackdropFilter: "blur(24px) saturate(180%)" }}
    >
      {/* Apple menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenMenu((m) => (m === "apple" ? null : "apple"))}
          className={cn(
            "flex h-5 items-center rounded px-1.5 transition-colors",
            openMenu === "apple" ? "bg-white/25" : "hover:bg-white/15",
          )}
          aria-label="Apple menu"
        >
          <AppleLogo className="h-3.5 w-3.5" />
        </button>
        <Dropdown
          open={openMenu === "apple"}
          align="left"
          items={[
            { label: "About This Portfolio", onSelect: () => onOpenMenu?.("about") },
            { separator: true },
            { label: "System Settings\u2026", onSelect: () => onOpenMenu?.("skills") },
            {
              label: "Appearance",
              onSelect: onToggleDark,
            },
            { separator: true },
            { label: "Empty Trash\u2026", disabled: true },
            { separator: true },
            {
              label: "Close All Windows",
              onSelect: () => onOpenMenu?.("close-all"),
            },
          ]}
          onSelect={select}
        />
      </div>

      {/* App menus */}
      <div className="hidden items-center sm:flex">
      <Menu
        id="app"
        title={appName}
        bold
        open={openMenu === "app"}
        onToggle={() => setOpenMenu((m) => (m === "app" ? null : "app"))}
        items={[
          { label: `About ${appName}`, onSelect: () => onOpenMenu?.("about") },
          { separator: true },
          { label: "Settings\u2026", shortcut: "\u2318,", onSelect: () => onOpenMenu?.("skills") },
          { separator: true },
          { label: "Hide", shortcut: "\u2318H", disabled: true },
          { label: "Quit", shortcut: "\u2318Q", disabled: true },
        ]}
        onSelect={select}
      />

      {menus.map((menu) => (
        <Menu
          key={menu.id}
          id={menu.id}
          title={menu.title}
          open={openMenu === menu.id}
          onToggle={() => setOpenMenu((m) => (m === menu.id ? null : menu.id))}
          items={menu.items}
          onSelect={select}
        />
      ))}
      </div>

      <div className="mx-2 hidden h-3.5 w-px bg-white/25 lg:block" />

      <div className="hidden min-w-0 flex-1 items-center justify-center sm:flex">
        <AnimatePresence mode="wait">
          {activeWindowTitle && (
            <motion.span
              key={activeWindowTitle}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 0.75, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.18 }}
              className="truncate text-[12px] text-white/75"
            >
              {activeWindowTitle}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Status items */}
      <div className="flex items-center gap-3 pr-0.5 text-white/95">
        <button
          type="button"
          onClick={onOpenSpotlight}
          className="hidden rounded p-0.5 transition-colors hover:bg-white/15 sm:block"
          aria-label="Spotlight search"
        >
          <SpotlightIcon className="h-[15px] w-[15px]" />
        </button>
        <div className="hidden items-center gap-3 sm:flex">
          <Bluetooth className="h-[13px] w-[13px]" strokeWidth={2} />
          <WifiIcon className="h-[11px] w-[15px]" />
          <span className="text-[12px]">100%</span>
          <BatteryCharging className="h-[14px] w-[14px]" strokeWidth={1.8} />
          <BatteryIcon level={0.86} charging className="h-[12px] w-[24px]" />
        </div>
        <Volume2 className="h-[14px] w-[14px] sm:hidden" strokeWidth={1.9} />
        <ControlCenterIcon className="h-[15px] w-[15px]" />
        <span className="min-w-[74px] text-right text-[13px] tabular-nums">
          {now || "\u00a0"}
        </span>
      </div>
    </div>
  );
}

function Menu({
  id,
  title,
  bold,
  open,
  onToggle,
  items,
  onSelect,
}: {
  id: string;
  title: string;
  bold?: boolean;
  open: boolean;
  onToggle: () => void;
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex h-5 items-center rounded px-2 transition-colors",
          bold && "font-bold",
          open ? "bg-white/25" : "hover:bg-white/15",
        )}
      >
        {title}
      </button>
      <Dropdown open={open} align="left" items={items} onSelect={onSelect} />
    </div>
  );
}

function Dropdown({
  open,
  align = "left",
  items,
  onSelect,
}: {
  open: boolean;
  align?: "left" | "right";
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.13, ease: [0.32, 0.72, 0, 1] }}
          className={cn(
            "absolute top-[22px] z-50 min-w-[228px] overflow-hidden rounded-lg border border-white/15 bg-white/72 py-1 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)] backdrop-blur-2xl",
            align === "right" ? "right-0" : "left-0",
          )}
          style={{ WebkitBackdropFilter: "blur(28px) saturate(180%)" }}
        >
          {items.map((item, index) =>
            item.separator ? (
              <div key={`sep-${index}`} className="my-1 h-px bg-black/10" />
            ) : (
              <button
                key={item.label ?? `item-${index}`}
                type="button"
                disabled={item.disabled}
                onClick={() => onSelect(item)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-[3px] text-left text-[13px] text-zinc-800",
                  item.disabled
                    ? "cursor-default text-zinc-400"
                    : "hover:bg-[#2f6fed] hover:text-white",
                )}
              >
                <span className="flex w-3 shrink-0 items-center justify-center text-[11px]">
                  {item.checked ? (
                    "\u2713"
                  ) : (
                    item.icon && (
                      <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{item.icon}</span>
                    )
                  )}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.shortcut && (
                  <span className="shrink-0 text-[12px] opacity-60">
                    {item.shortcut}
                  </span>
                )}
              </button>
            ),
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
