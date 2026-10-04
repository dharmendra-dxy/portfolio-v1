"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── App shell with iOS large-title navigation ─────────── */

interface AppScreenProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  /** render without the large title (e.g. full-screen viewers) */
  bare?: boolean;
  headerRight?: React.ReactNode;
}

export function AppScreen({
  title,
  onBack,
  children,
  bare,
  headerRight,
}: AppScreenProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [condensed, setCondensed] = useState(false);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#f2f2f7]">
      {/* Floating nav bar */}
      <div
        className={cn(
          "absolute inset-x-0 top-11 z-30 flex h-11 items-center justify-center px-3 transition-colors duration-200",
          condensed
            ? "border-b border-black/[0.08] bg-[#f7f7f9]/95"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="absolute left-1.5 flex h-9 items-center gap-0.5 rounded-lg px-1.5 text-[17px] text-[#007aff] transition-opacity active:opacity-40"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <span
          className={cn(
            "mx-auto max-w-[46%] truncate px-2 text-[16px] font-semibold tracking-[-0.01em] text-zinc-900 transition-opacity duration-150",
            condensed ? "opacity-100" : "opacity-0",
          )}
        >
          {title}
        </span>

        {headerRight}
      </div>

      <div
        ref={scrollRef}
        onScroll={(event) =>
          setCondensed(event.currentTarget.scrollTop > (bare ? 0 : 26))
        }
        className="mac-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {!bare && (
          <h1 className="px-4 pb-1 pt-[92px] text-[32px] font-bold leading-tight tracking-[-0.02em] text-zinc-900">
            {title}
          </h1>
        )}
        {bare && <div className="h-[88px]" />}
        {children}
        <div className="h-10" />
      </div>
    </div>
  );
}

/* ── Building blocks ──────────────────────────────────── */

export function Section({
  title,
  footer,
  children,
  className,
}: {
  title?: string;
  footer?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-4", className)}>
      {title && (
        <p className="px-3 pb-1.5 pt-5 text-[13px] uppercase tracking-[0.04em] text-zinc-500">
          {title}
        </p>
      )}
      <div className="overflow-hidden rounded-xl bg-white">{children}</div>
      {footer && (
        <p className="px-3 pt-1.5 text-[12px] leading-snug text-zinc-500">
          {footer}
        </p>
      )}
    </section>
  );
}

export function Row({
  icon,
  title,
  subtitle,
  value,
  onClick,
  href,
  accessory,
  tint,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  value?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  accessory?: React.ReactNode;
  tint?: string;
}) {
  const content = (
    <>
      {icon && (
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] text-white",
            tint ?? "bg-zinc-400",
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 py-2.5">
        <span className="block truncate text-[16px] text-zinc-900">{title}</span>
        {subtitle && (
          <span className="block truncate text-[13px] text-zinc-500">{subtitle}</span>
        )}
      </span>
      {value && (
        <span className="shrink-0 text-[15px] text-zinc-500">{value}</span>
      )}
      {accessory}
    </>
  );

  const className =
    "flex w-full items-center gap-3 border-b border-black/[0.07] px-3 text-left last:border-0 active:bg-zinc-100";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className, "transition-colors")}
      >
        {content}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(className, "transition-colors")}>
        {content}
      </button>
    );
  }
  return <div className={className}>{content}</div>;
}

export function Chevron() {
  return (
    <ChevronLeft className="h-4 w-4 shrink-0 rotate-180 text-zinc-300" strokeWidth={2.6} />
  );
}

export function Pill({
  children,
  tone = "gray",
}: {
  children: React.ReactNode;
  tone?: "gray" | "green" | "blue";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium",
        tone === "green" && "bg-emerald-50 text-emerald-700",
        tone === "blue" && "bg-blue-50 text-blue-700",
        tone === "gray" && "bg-zinc-100 text-zinc-600",
      )}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "w-full rounded-xl bg-[#007aff] py-3 text-[16px] font-semibold text-white transition-opacity active:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function IOSInput({
  label,
  ...props
}: { label: string } & React.ComponentProps<"input">) {
  return (
    <div className="border-b border-black/[0.07] px-3 py-2 last:border-0">
      <p className="mb-1 text-[12px] uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <input
        {...props}
        className="w-full bg-transparent text-[16px] text-zinc-900 outline-none placeholder:text-zinc-400"
      />
    </div>
  );
}

export function IOSTextarea({
  label,
  ...props
}: { label: string } & React.ComponentProps<"textarea">) {
  return (
    <div className="border-b border-black/[0.07] px-3 py-2 last:border-0">
      <p className="mb-1 text-[12px] uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <textarea
        {...props}
        className="min-h-24 w-full resize-none bg-transparent text-[16px] text-zinc-900 outline-none placeholder:text-zinc-400"
      />
    </div>
  );
}

/* ── Status bar ───────────────────────────────────────── */

const TIME = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export function StatusBar({ dark }: { dark: boolean }) {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => setNow(TIME.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-40 flex h-11 items-end justify-between px-7 pb-1.5 text-[15px] font-semibold tracking-tight",
        dark ? "text-white" : "text-zinc-900",
      )}
      style={{ textShadow: dark ? "0 0 8px rgba(0,0,0,0.28)" : undefined }}
    >
      <span className="tabular-nums">{now || "\u00a0"}</span>

      <span className="flex items-center gap-1.5">
        {/* cellular */}
        <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]" fill="currentColor">
          <rect x="0" y="7.5" width="3" height="4.5" rx="1" />
          <rect x="4.6" y="5.4" width="3" height="6.6" rx="1" />
          <rect x="9.2" y="3" width="3" height="9" rx="1" />
          <rect x="13.8" y="0.6" width="3" height="11.4" rx="1" opacity="0.35" />
        </svg>
        {/* wifi */}
        <svg
          viewBox="0 0 16 12"
          className="h-[11px] w-[15px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        >
          <path d="M1 4.1a10.5 10.5 0 0 1 14 0" />
          <path d="M3.6 6.9a6.6 6.6 0 0 1 8.8 0" />
          <circle cx="8" cy="10.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
        {/* battery */}
        <svg viewBox="0 0 30 14" className="h-[12px] w-[25px]" fill="none">
          <rect
            x="0.7"
            y="0.7"
            width="24.6"
            height="12.6"
            rx="4"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />
          <path
            d="M27.2 5.1c.9.4 1.4 1.05 1.4 1.9s-.5 1.5-1.4 1.9z"
            fill="currentColor"
            fillOpacity="0.45"
          />
          <rect x="2.4" y="2.4" width="17" height="9.2" rx="2.7" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

/* ── Dynamic Island ───────────────────────────────────── */

export function DynamicIsland({ expanded }: { expanded: boolean }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-2 z-40 -translate-x-1/2">
      <div
        className="flex h-[26px] items-center justify-center overflow-hidden rounded-full bg-black transition-[width] duration-200 ease-out"
        style={{ width: expanded ? 108 : 92 }}
      >
        <span
          className={cn(
            "whitespace-nowrap text-[11px] font-semibold tracking-tight text-white/90 transition-opacity duration-150",
            expanded ? "opacity-100" : "opacity-0",
          )}
        >
          Live Activity
        </span>
      </div>
    </div>
  );
}

/* ── Home indicator ───────────────────────────────────── */

export function HomeIndicator({ onHome }: { onHome: () => void }) {
  return (
    <button
      type="button"
      aria-label="Home"
      onClick={onHome}
      className="absolute inset-x-0 bottom-0 z-40 flex h-7 justify-center"
    >
      <span className="mt-1.5 h-[5px] w-[124px] rounded-full bg-white/85 mix-blend-difference" />
    </button>
  );
}
