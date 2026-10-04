"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MonitorSmartphone, Smartphone, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "iphone" | "mac";

const MOBILE_QUERY = "(max-width: 767px)";
const TRANSITION_MS = 420;
const NAVIGATE_AFTER_MS = 340;

const OPTIONS: {
  id: ViewMode;
  label: string;
  hint: string;
  icon: typeof Smartphone;
}[] = [
  {
    id: "iphone",
    label: "iPhone",
    hint: "Apps, widgets & home screen",
    icon: Smartphone,
  },
  {
    id: "mac",
    label: "Mac",
    hint: "Desktop, dock & search",
    icon: Monitor,
  },
];

/**
 * Sends visitors to the alternative presentation of the portfolio.
 * Phones go straight to the iPhone build, larger screens get a picker.
 */
const ViewToggle = ({ className }: { className?: string }) => {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // `null` until mounted so the server and first client render always match.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState<{ mode: ViewMode; x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navigate = useCallback(
    (mode: ViewMode) => {
      setOpen(false);

      const rect = buttonRef.current?.getBoundingClientRect();
      setLeaving({
        mode,
        x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
        y: rect ? rect.top + rect.height / 2 : 0,
      });

      window.setTimeout(() => router.push(`/${mode}`), NAVIGATE_AFTER_MS);
    },
    [router],
  );

  const prefetchAll = () => OPTIONS.forEach((option) => router.prefetch(`/${option.id}`));

  const showMenu = isMobile === false;

  return (
    <>
      <div ref={wrapRef} className={cn("relative", className)}>
        <button
          ref={buttonRef}
          type="button"
          aria-label="Switch portfolio view"
          aria-haspopup={showMenu ? "menu" : undefined}
          aria-expanded={showMenu ? open : undefined}
          onPointerEnter={prefetchAll}
          onFocus={prefetchAll}
          onClick={() => {
            if (isMobile === null) return;
            if (isMobile) navigate("iphone");
            else setOpen((value) => !value);
          }}
          className={cn(
            "group flex  items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/60 py-2 px-2.5 text-sm font-medium text-zinc-200 transition-colors duration-200 sm:w-auto sm:justify-start sm:py-1.5",
            "hover:border-zinc-500 hover:bg-zinc-700/70 focus-visible:border-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40",
            open && "border-zinc-500 bg-zinc-700/70",
          )}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 text-zinc-100 ring-1 ring-white/10 transition-colors duration-200 group-hover:text-white">
            {isMobile ? <Smartphone className="h-3.5 w-3.5" />: <Monitor className="h-3.5 w-3.5"  />}
          </span>

          <span className="whitespace-nowrap">{isMobile ? "iPhone View" : "View"}</span>

          {showMenu && (
            <ChevronDown
              className={cn(
                "-ml-0.5 h-3.5 w-3.5 text-zinc-500 transition-transform duration-200",
                open && "rotate-180 text-zinc-300",
              )}
              strokeWidth={2.2}
            />
          )}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
              style={{ transformOrigin: "top right" }}
              className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 origin-top-right overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/95 p-1.5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              {OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="menuitem"
                  onPointerEnter={() => router.prefetch(`/${option.id}`)}
                  onClick={() => navigate(option.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-150 hover:bg-zinc-800 focus-visible:bg-zinc-800 focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-b text-white ring-1 ring-white/10",
                      option.id === "iphone"
                        ? "from-sky-300 via-sky-400 to-blue-600"
                        : "from-zinc-400 via-zinc-500 to-zinc-700",
                    )}
                  >
                    <option.icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-zinc-100">
                      {option.label}
                    </span>
                    <span className="block truncate text-xs text-zinc-500">
                      {option.hint}
                    </span>
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle handoff into the chosen experience */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_MS / 1000, ease: [0.32, 0.72, 0, 1] }}
            style={{
              transformOrigin: `${leaving.x}px ${leaving.y}px`,
              backgroundColor: leaving.mode === "iphone" ? "#2a1a4d" : "#08080c",
            }}
            className="pointer-events-none fixed inset-0 z-[9999]"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ViewToggle;
