"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Grid2x2,
  Info,
  List as ListIcon,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function FinderToolbar({
  path,
  isActive,
  view,
  onViewChange,
  onSearch,
  searchValue,
  hideViewToggle,
  trailing,
}: {
  path: string;
  isActive: boolean;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  onSearch?: (value: string) => void;
  searchValue?: string;
  hideViewToggle?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-10 shrink-0 items-center gap-2 border-b border-black/10 px-3",
        isActive ? "bg-zinc-100/85" : "bg-zinc-50/70",
      )}
    >
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-700"
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-black/5 hover:text-zinc-600"
          aria-label="Forward"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="flex min-w-0 flex-1 items-center gap-1 rounded-md bg-white/70 px-2 py-[3px] text-[12px] text-zinc-500 ring-1 ring-black/5"
      >
        <span className="truncate">{path}</span>
      </motion.div>

      {onSearch && (
        <label className="flex h-6 w-28 shrink-0 items-center gap-1.5 rounded-md bg-white/70 px-2 ring-1 ring-black/5 focus-within:w-40 focus-within:ring-blue-400/60 transition-all duration-200">
          <Search className="h-3 w-3 shrink-0 text-zinc-400" />
          <input
            value={searchValue ?? ""}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search"
            className="w-full min-w-0 bg-transparent text-[12px] text-zinc-700 outline-none placeholder:text-zinc-400"
          />
        </label>
      )}

      {!hideViewToggle && (
      <div className="hidden items-center gap-0.5 sm:flex">
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md transition-colors",
            view === "grid"
              ? "bg-black/10 text-zinc-700"
              : "text-zinc-400 hover:bg-black/5 hover:text-zinc-600",
          )}
          aria-label="Icon view"
        >
          <Grid2x2 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onViewChange("list")}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md transition-colors",
            view === "list"
              ? "bg-black/10 text-zinc-700"
              : "text-zinc-400 hover:bg-black/5 hover:text-zinc-600",
          )}
          aria-label="List view"
        >
          <ListIcon className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-600"
          aria-label="More options"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
      )}

      {trailing}
    </div>
  );
}

export function SidebarGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <div className="mb-3">
      <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
        {title}
      </p>
      {children}
    </div>
  );
}

export function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-2 rounded-md px-2 py-[3px] text-left text-[13px] transition-colors",
        active
          ? "bg-zinc-800/85 text-white"
          : "text-zinc-700 hover:bg-black/5",
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center",
          active ? "text-white/85" : "text-sky-600",
        )}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}

export function FinderStatusBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-6 shrink-0 items-center justify-center border-t border-black/10 bg-zinc-100/85 text-[11px] text-zinc-500">
      {children}
    </div>
  );
}

export function WindowHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-[12px] leading-relaxed text-zinc-500">
      <Info className="mt-[1px] h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
