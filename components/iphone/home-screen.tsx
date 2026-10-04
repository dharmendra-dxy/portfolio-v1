"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "@/constant/profile";
import { experience, totalExperience } from "@/constant/experience";
import { skills } from "@/constant/skills";
import { works } from "@/constant/works";
import { cloudinaryImage } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import {
  DOCK_APPS,
  HOME_APPS,
  PAGE_TWO_APPS,
  type IPhoneApp,
  type IPhoneAppId,
} from "./iphone-config";

/* ── App icon ─────────────────────────────────────────── */

function AppIcon({
  app,
  size = 60,
  onClick,
}: {
  app: IPhoneApp;
  size?: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={app.label}
      className="flex shrink-0 flex-col items-center gap-1 transition-transform duration-100 active:scale-[0.88]"
    >
      <span
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-b text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_10px_-3px_rgba(0,0,0,0.4)]",
          app.gradient,
        )}
        style={{ width: size, height: size, borderRadius: size * 0.225 }}
      >
        <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
        <span
          className="relative flex items-center justify-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
          style={{ width: size * 0.56, height: size * 0.56 }}
        >
          {app.icon}
        </span>
      </span>
      <span className="max-w-full truncate text-[11px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
        {app.label}
      </span>
    </button>
  );
}

/* ── Widgets ──────────────────────────────────────────── */

function AvailabilityWidget() {
  const current = experience[experience.length - 1];
  const stats = [
    { label: "Experience", value: `${totalExperience}` },
    { label: "Projects", value: `${works.length}` },
    { label: "Stack", value: `${skills.length}` },
  ];

  return (
    <div className="w-full overflow-hidden rounded-[22px] bg-[#2a1b3d]/45 p-3.5 ring-1 ring-white/25">
      <div className="flex items-center gap-3">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/70"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-white">
            {profile.name}
          </p>
          <p className="flex items-center gap-1.5 text-[12.5px] text-white/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {current?.company ?? "Open to work"}
          </p>
        </div>
        <Sparkles className="h-4 w-4 shrink-0 text-white/70" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-black/25 py-2">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-[15px] font-semibold tabular-nums text-white">
              {stat.value}
            </p>
            <p className="text-[10.5px] uppercase tracking-wide text-white/65">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentWorkWidget({ onOpen }: { onOpen: () => void }) {
  const recent = works[0];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full overflow-hidden rounded-[22px] bg-[#2a1b3d]/45 text-left ring-1 ring-white/25 transition-transform duration-100 active:scale-[0.98]"
    >
      <div className="flex items-center justify-between px-3 pt-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
          Recent work
        </p>
        <ArrowUpRight className="h-3.5 w-3.5 text-white/70" />
      </div>
      <div className="p-2.5 pt-1.5">
        <div className="relative aspect-[12/5] w-full overflow-hidden rounded-[14px] bg-black/30 ring-1 ring-white/20">
          {recent?.cover && (
            <Image
              src={cloudinaryImage(recent.cover, 640) as string}
              alt={recent.title}
              fill
              sizes="340px"
              unoptimized
              className="object-cover"
            />
          )}
        </div>
        <p className="mt-2 truncate text-[14px] font-semibold text-white">
          {recent?.title}
        </p>
        <p className="truncate text-[11.5px] text-white/65">
          {recent?.description}
        </p>
      </div>
    </button>
  );
}

function StackWidget({ onOpen }: { onOpen: () => void }) {
  const featured = skills.slice(0, 8);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-[22px] bg-[#2a1b3d]/45 p-3 text-left ring-1 ring-white/25 transition-transform duration-100 active:scale-[0.98]"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
        The stack
      </p>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {featured.map((skill) => (
          <span
            key={skill.title}
            className="flex h-9 items-center justify-center rounded-[10px] bg-white/90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.icon}
              alt={skill.title}
              width={22}
              height={22}
              loading="lazy"
              decoding="async"
              className="h-[22px] w-[22px] rounded-[5px] object-cover"
            />
          </span>
        ))}
      </div>
      <p className="mt-2 text-[11.5px] text-white/70">
        +{Math.max(0, skills.length - featured.length)} more technologies
      </p>
    </button>
  );
}

/* ── Home screen ──────────────────────────────────────── */

interface HomeScreenProps {
  page: number;
  setPage: (page: number) => void;
  onOpenApp: (id: IPhoneAppId) => void;
}

export default function HomeScreen({ page, setPage, onOpenApp }: HomeScreenProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(390);
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const measure = () => {
      const next = Math.round(node.getBoundingClientRect().width);
      if (next > 0 && next <= 1200) setWidth(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    animate(x, -page * width, { type: "spring", stiffness: 340, damping: 36 });
  }, [page, width, x]);

  const pages = [
    { apps: HOME_APPS, widgets: [<AvailabilityWidget key="w1" />] },
    {
      apps: PAGE_TWO_APPS,
      widgets: [
        <RecentWorkWidget key="w2" onOpen={() => onOpenApp("photos")} />,
        <div key="w3" className="mt-3">
          <StackWidget onOpen={() => onOpenApp("skills")} />
        </div>,
      ],
    },
  ];

  const settle = () =>
    animate(x, -page * width, { type: "spring", stiffness: 340, damping: 36 });

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div ref={viewportRef} className="min-h-0 flex-1 overflow-hidden pt-[52px]">
        <motion.div
          className="flex h-full touch-pan-y"
          style={{ x, width: width * pages.length, willChange: "transform" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            const goNext = info.offset.x < -55 || info.velocity.x < -420;
            const goPrev = info.offset.x > 55 || info.velocity.x > 420;
            if (goNext) setPage(Math.min(page + 1, pages.length - 1));
            else if (goPrev) setPage(Math.max(page - 1, 0));
            else settle();
          }}
        >
          {pages.map((entry, index) => (
            <div
              key={index}
              className="flex h-full shrink-0 flex-col px-5 pb-1"
              style={{ width }}
            >
              <div className="flex-none">{entry.widgets}</div>

              <div className="mt-5 grid flex-1 grid-cols-4 content-start gap-x-3 gap-y-4">
                {entry.apps.map((app) => (
                  <div key={app.id} className="flex justify-center">
                    <AppIcon app={app} onClick={() => onOpenApp(app.id)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Page dots */}
      <div className="flex flex-none justify-center gap-2 pb-2 pt-3">
        {pages.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Page ${index + 1}`}
            onClick={() => setPage(index)}
            className="py-2"
          >
            <span
              className={cn(
                "block h-[7px] w-[7px] rounded-full transition-colors duration-200",
                index === page ? "bg-white" : "bg-white/45",
              )}
            />
          </button>
        ))}
      </div>

      {/* Dock */}
      <div className="flex-none px-3 pb-8">
        <div className="flex items-end justify-around rounded-[30px] bg-white/25 px-2 py-2.5 ring-1 ring-white/30">
          {DOCK_APPS.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              size={58}
              onClick={() => onOpenApp(app.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
