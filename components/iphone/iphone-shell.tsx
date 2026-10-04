"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import HomeScreen from "./home-screen";
import { DynamicIsland, HomeIndicator, StatusBar } from "./ios-ui";
import { APP_TITLES, type IPhoneAppId } from "./iphone-config";
import ProfileApp from "./apps/profile-app";
import ProjectsApp from "./apps/projects-app";
import ExperienceApp from "./apps/experience-app";
import SkillsApp from "./apps/skills-app";
import EducationApp from "./apps/education-app";
import ContactApp from "./apps/contact-app";
import PhotosApp from "./apps/photos-app";
import LinksApp from "./apps/links-app";
import ResumeApp from "./apps/resume-app";

const OPEN_SPRING = { type: "spring" as const, stiffness: 380, damping: 36 };
const EASE = [0.32, 0.72, 0, 1] as const;

function renderApp(id: IPhoneAppId, onBack: () => void) {
  switch (id) {
    case "profile":
      return <ProfileApp onBack={onBack} />;
    case "projects":
      return <ProjectsApp onBack={onBack} />;
    case "experience":
      return <ExperienceApp onBack={onBack} />;
    case "skills":
      return <SkillsApp onBack={onBack} />;
    case "education":
      return <EducationApp onBack={onBack} />;
    case "contact":
      return <ContactApp onBack={onBack} />;
    case "photos":
      return <PhotosApp onBack={onBack} />;
    case "links":
      return <LinksApp onBack={onBack} />;
    case "resume":
      return <ResumeApp onBack={onBack} />;
    default:
      return null;
  }
}

export default function IPhoneShell() {
  const [openApp, setOpenApp] = useState<IPhoneAppId | null>(null);
  const [page, setPage] = useState(0);

  const goHome = useCallback(() => setOpenApp(null), []);
  const launch = useCallback((id: IPhoneAppId) => setOpenApp(id), []);

  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#08080c] sm:bg-[radial-gradient(90%_90%_at_50%_0%,#1d1d24_0%,#08080c_62%)]">
      {/* Desktop hints */}
      <div className="pointer-events-none absolute inset-x-0 top-7 hidden select-none items-center justify-center gap-2 text-[13px] font-medium tracking-wide text-zinc-500 sm:flex">
        Tap an app · swipe between home screens · swipe up to go home
      </div>

      {/* Device */}
      <div className="relative w-full sm:my-6 sm:w-auto">
        {/* Hardware buttons */}
        <span className="pointer-events-none absolute -left-[3px] top-[150px] hidden h-16 w-[3px] rounded-l-md bg-gradient-to-b from-zinc-500 to-zinc-800 sm:block" />
        <span className="pointer-events-none absolute -left-[3px] top-[228px] hidden h-16 w-[3px] rounded-l-md bg-gradient-to-b from-zinc-500 to-zinc-800 sm:block" />
        <span className="pointer-events-none absolute -right-[3px] top-[190px] hidden h-24 w-[3px] rounded-r-md bg-gradient-to-b from-zinc-500 to-zinc-800 sm:block" />

        <div
          className={cn(
            "relative h-[100dvh] w-full overflow-hidden sm:h-[min(840px,80dvh)] sm:w-auto sm:aspect-[414/860]",
            "sm:rounded-[56px] sm:border-[11px] sm:border-zinc-950",
            "sm:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09),0_60px_100px_-40px_rgba(0,0,0,0.95)]",
          )}
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden bg-black sm:rounded-[45px]">
            {/* Wallpaper */}
            <motion.div
              initial={{ scale: 1.14, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-0 bg-[linear-gradient(168deg,#2a1a4d_0%,#4a2a6b_26%,#8b3a6b_54%,#cf6f4f_78%,#f0a05f_100%)]"
            >
              <div className="absolute -left-[22%] top-[0%] h-[52%] w-[88%] rounded-full bg-[#6d3bd6]/60 blur-[70px]" />
              <div className="absolute -right-[26%] top-[24%] h-[46%] w-[82%] rounded-full bg-[#e0518f]/55 blur-[70px]" />
              <div className="absolute -bottom-[12%] left-[6%] h-[54%] w-[92%] rounded-full bg-[#f2a03d]/50 blur-[80px]" />
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.2),transparent_55%)]" />
            </motion.div>

            {/* Home screen */}
            <AnimatePresence>
              {!openApp && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.26, ease: EASE }}
                  className="relative flex min-h-0 flex-1 flex-col"
                >
                  <HomeScreen page={page} setPage={setPage} onOpenApp={launch} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Foreground app */}
            <AnimatePresence>
              {openApp && (
                <motion.div
                  key={openApp}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%", transition: { duration: 0.26, ease: EASE } }}
                  transition={OPEN_SPRING}
                  className="absolute inset-0 z-30 flex flex-col"
                >
                  {renderApp(openApp, goHome)}
                </motion.div>
              )}
            </AnimatePresence>

            {/* System chrome */}
            <StatusBar dark={!openApp} />
            <DynamicIsland expanded={!!openApp} />
            <HomeIndicator onHome={goHome} />
          </div>
        </div>
      </div>

      {/* Desktop-only footer */}
      <div className="pointer-events-none absolute bottom-6 hidden flex-col items-center gap-2 sm:flex">
        <span className="text-[12px] text-zinc-500">
          Viewing{" "}
          <span className="font-medium text-zinc-300">
            {APP_TITLES[openApp ?? "profile"]}
          </span>
        </span>
        <div className="pointer-events-auto flex items-center gap-2">
          <Link
            href="/mac"
            className="rounded-full border border-zinc-700 px-3 py-1 text-[12px] font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            macOS version →
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-700 px-3 py-1 text-[12px] font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            Classic site →
          </Link>
        </div>
      </div>
    </div>
  );
}
