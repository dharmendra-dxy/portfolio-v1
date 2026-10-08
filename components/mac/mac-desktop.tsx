"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CircleHelp, Copy, FolderOpen, Info, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import Dock from "./dock";
import MenuBar, { type MenuBarMenu } from "./menu-bar";
import MacWindow, { MENU_BAR_HEIGHT } from "./mac-window";
import Spotlight from "./spotlight";
import QuickLook from "./quick-look";
import DesktopContextMenu, { type ContextMenuState } from "./context-menu";
import DesktopIcons from "./desktop-icons";
import {
  DOCK_APPS,
  DOCK_TOOLS,
  WINDOW_CONFIG,
  WINDOW_IDS,
  type WindowId,
} from "./mac-config";
import AboutWindow from "./windows/about-window";
import ProjectsWindow, { type WorkItem } from "./windows/projects-window";
import ExperienceWindow from "./windows/experience-window";
import SkillsWindow from "./windows/skills-window";
import EducationWindow from "./windows/education-window";
import ContactWindow from "./windows/contact-window";
import TerminalWindow from "./windows/terminal-window";
import BrowserWindow from "./windows/browser-window";
import SettingsWindow from "./windows/settings-window";
import {
  DEFAULT_MAC_WALLPAPER_ID,
  getWallpaper,
  preloadWallpaper,
  type Wallpaper,
} from "@/constant/wallpaper";

interface WindowRuntime {
  open: boolean;
  minimized: boolean;
}

const INITIAL_STATE: Record<WindowId, WindowRuntime> = {
  about: { open: true, minimized: false },
  projects: { open: false, minimized: false },
  experience: { open: false, minimized: false },
  skills: { open: false, minimized: false },
  education: { open: false, minimized: false },
  contact: { open: false, minimized: false },
  terminal: { open: false, minimized: false },
  browser: { open: false, minimized: false },
  settings: { open: false, minimized: false },
};

export default function MacDesktop() {
  const [bounds, setBounds] = useState({ width: 1440, height: 900 });
  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useState<Record<WindowId, WindowRuntime>>(INITIAL_STATE);
  const [zOrder, setZOrder] = useState<WindowId[]>(["about"]);
  const [activeId, setActiveId] = useState<WindowId | null>("about");
  const [bounceMap, setBounceMap] = useState<Record<string, number>>({});
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [quickLook, setQuickLook] = useState<WorkItem | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [wallpaper, setWallpaper] = useState<Wallpaper>(() =>
    getWallpaper("mac", DEFAULT_MAC_WALLPAPER_ID),
  );
  const [showDesktopIcons, setShowDesktopIcons] = useState(true);
  const [magnify, setMagnify] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  /* ── viewport tracking ─────────────────────────────── */
  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setBounds({ width, height });
      setIsMobile(width < 768);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── window actions ────────────────────────────────── */
  const focusWindow = useCallback((id: WindowId) => {
    setActiveId(id);
    setZOrder((prev) => [...prev.filter((item) => item !== id), id]);
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      setState((prev) => ({ ...prev, [id]: { open: true, minimized: false } }));
      focusWindow(id);
      setSpotlightOpen(false);
    },
    [focusWindow],
  );

  const closeWindow = useCallback((id: WindowId) => {
    setState((prev) => ({ ...prev, [id]: { open: false, minimized: false } }));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setState((prev) => ({ ...prev, [id]: { open: true, minimized: true } }));
    setActiveId((prev) => {
      if (prev !== id) return prev;
      const next = zOrder.filter((item) => item !== id && state[item]?.open && !state[item]?.minimized);
      return next.length ? next[next.length - 1] : null;
    });
  }, [state, zOrder]);

  const launchDockApp = useCallback(
    (id: string) => {
      if (id === "trash") {
        setToast("Trash is empty — nothing to see here.");
        return;
      }
      const windowId = id as WindowId;
      const runtime = state[windowId];
      if (runtime.open && !runtime.minimized && activeId === windowId) {
        minimizeWindow(windowId);
        return;
      }
      openWindow(windowId);
    },
    [activeId, minimizeWindow, openWindow, state],
  );

  const bumpDock = useCallback((id: string) => {
    setBounceMap((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const closeAll = useCallback(() => {
    setState((prev) => {
      const next = { ...prev };
      (Object.keys(next) as WindowId[]).forEach((id) => {
        next[id] = { open: false, minimized: false };
      });
      return next;
    });
    setActiveId(null);
  }, []);

  /* ── toast ─────────────────────────────────────────── */
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const flash = useCallback((message: string) => setToast(message), []);

  /* ── keyboard shortcuts ────────────────────────────── */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;

      if (mod && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSpotlightOpen((open) => !open);
        return;
      }
      if (mod && event.key.toLowerCase() === "w" && activeId) {
        event.preventDefault();
        closeWindow(activeId);
        return;
      }
      if (mod && event.key.toLowerCase() === "m" && activeId) {
        event.preventDefault();
        minimizeWindow(activeId);
        return;
      }
      if (event.key === "Escape") {
        setSpotlightOpen(false);
        setQuickLook(null);
        setContextMenu(null);
        return;
      }
      if (mod && event.key === "Tab") {
        event.preventDefault();
        const open = zOrder.filter((id) => state[id]?.open && !state[id]?.minimized);
        if (open.length === 0) return;
        const index = open.indexOf(activeId ?? open[0]);
        const next = open[(index + 1) % open.length];
        focusWindow(next);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId, closeWindow, focusWindow, minimizeWindow, state, zOrder]);

  /* ── menu bar ──────────────────────────────────────── */
  const appName = activeId ? WINDOW_CONFIG[activeId].appName : "Finder";

  const menus = useMemo<MenuBarMenu[]>(() => {
    const openWindows = zOrder.filter((id) => state[id]?.open && !state[id]?.minimized);

    return [
      {
        id: "file",
        title: "File",
        items: [
          {
            label: activeId ? `Close ${WINDOW_CONFIG[activeId].title}` : "Close Window",
            shortcut: "\u2318W",
            disabled: !activeId,
            onSelect: () => activeId && closeWindow(activeId),
          },
          {
            label: "Close All Windows",
            disabled: openWindows.length === 0,
            onSelect: closeAll,
          },
          { separator: true },
          {
            label: "New Terminal Window",
            shortcut: "\u2318N",
            onSelect: () => openWindow("terminal"),
          },
        ],
      },
      {
        id: "edit",
        title: "Edit",
        items: [
          { label: "Undo", shortcut: "\u2318Z", disabled: true },
          { label: "Redo", shortcut: "\u21E7\u2318Z", disabled: true },
          { separator: true },
          { label: "Cut", shortcut: "\u2318X", icon: <Scissors className="h-3.5 w-3.5" />, disabled: true },
          { label: "Copy", shortcut: "\u2318C", icon: <Copy className="h-3.5 w-3.5" />, disabled: true },
          { label: "Paste", shortcut: "\u2318V", disabled: true },
        ],
      },
      {
        id: "view",
        title: "View",
        items: [
          {
            label: "Show Desktop Icons",
            checked: showDesktopIcons,
            onSelect: () => setShowDesktopIcons((value) => !value),
          },
          {
            label: "Magnify Dock",
            checked: magnify,
            onSelect: () => setMagnify((value) => !value),
          },
          { separator: true },
          {
            label: "Spotlight Search",
            shortcut: "\u2318K",
            onSelect: () => setSpotlightOpen(true),
          },
        ],
      },
      {
        id: "window",
        title: "Window",
        items: [
          {
            label: "Minimise",
            shortcut: "\u2318M",
            disabled: !activeId,
            onSelect: () => activeId && minimizeWindow(activeId),
          },
          { separator: true },
          ...(openWindows.length
            ? openWindows.map((id) => ({
                label: WINDOW_CONFIG[id].title,
                checked: activeId === id,
                onSelect: () => focusWindow(id),
              }))
            : [{ label: "No open windows", disabled: true }]),
        ],
      },
      {
        id: "help",
        title: "Help",
        items: [
          { label: "macOS Help", icon: <CircleHelp className="h-3.5 w-3.5" />, onSelect: () => flash("You are already in it. Enjoy the desktop.") },
          {
            label: "Portfolio Guide",
            icon: <FolderOpen className="h-3.5 w-3.5" />,
            onSelect: () => openWindow("about"),
          },
          {
            label: "Report an Issue",
            onSelect: () =>
              window.open("https://github.com/dharmendra-dxy", "_blank"),
          },
        ],
      },
    ];
  }, [
    activeId,
    closeAll,
    closeWindow,
    flash,
    focusWindow,
    magnify,
    minimizeWindow,
    openWindow,
    showDesktopIcons,
    state,
    zOrder,
  ]);

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "about":
        openWindow("about");
        break;
      case "skills":
        openWindow("skills");
        break;
      case "settings":
        openWindow("settings");
        break;
      case "close-all":
        closeAll();
        break;
      case "new-folder":
        flash("New Folder created — it’s empty, like my todo list.");
        break;
      case "info":
        flash("macOS 15 · Portfolio build · 100% free of bugs.");
        break;
      case "wallpaper":
        openWindow("settings");
        break;
      case "refresh":
        setBounceMap((prev) => {
          const next = { ...prev };
          DOCK_APPS.forEach((app) => {
            next[app.id] = (next[app.id] ?? 0) + 1;
          });
          return next;
        });
        break;
      case "empty":
        flash("Trash is already empty.");
        break;
      default:
        break;
    }
  };

  const openDesktopMenu = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-mac-window]")) return;
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const onWallpaperChange = useCallback((next: Wallpaper) => {
    preloadWallpaper(next);
    setWallpaper(next);
  }, []);

  const isOpen = (id: WindowId) => !!state[id]?.open;
  const isMinimized = (id: WindowId) => !!state[id]?.minimized;
  const isActive = (id: WindowId) => activeId === id && !state[id]?.minimized;

  return (
    <div
      ref={rootRef}
      className="mac-font fixed inset-0 h-[100dvh] w-full overflow-hidden bg-black font-sans text-zinc-900"
    >
      {/* Wallpaper — one element, one paint, sourced from constant/wallpaper.ts */}
      <motion.div
        key={wallpaper.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ background: wallpaper.background }}
      />

      {/* Menu bar */}
      <MenuBar
        appName={appName}
        menus={menus}
        activeWindowTitle={activeId ? WINDOW_CONFIG[activeId].title : undefined}
        onOpenMenu={(id) => handleMenuAction(id)}
        onToggleDark={() =>
          flash("Dark mode is already on. macOS at its finest.")
        }
        onOpenSpotlight={() => setSpotlightOpen(true)}
      />

      {/* Desktop icons */}
      {showDesktopIcons && <DesktopIcons onOpen={openWindow} />}

      {/* Windows */}
      <div
        ref={desktopRef}
        onContextMenu={openDesktopMenu}
        className="absolute inset-x-0 bottom-0"
        style={{ top: MENU_BAR_HEIGHT }}
      >
        <AnimatePresence>
          {WINDOW_IDS.filter((id) => state[id].open && !state[id].minimized).map(
            (id) => (
              <MacWindow
                key={id}
                config={WINDOW_CONFIG[id]}
                isActive={isActive(id)}
                isMinimized={false}
                zIndex={10 + zOrder.indexOf(id)}
                bounds={bounds}
                isMobile={isMobile}
                cascade={Math.max(0, zOrder.indexOf(id))}
                containerRef={desktopRef}
                onFocus={() => focusWindow(id)}
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
              >
                {id === "about" && <AboutWindow />}
                {id === "projects" && <ProjectsWindow onQuickLook={setQuickLook} />}
                {id === "experience" && <ExperienceWindow />}
                {id === "skills" && <SkillsWindow />}
                {id === "education" && <EducationWindow />}
                {id === "contact" && <ContactWindow />}
                {id === "terminal" && <TerminalWindow onOpenApp={openWindow} />}
                {id === "browser" && <BrowserWindow onOpenApp={openWindow} />}
                {id === "settings" && (
                  <SettingsWindow
                    wallpaper={wallpaper}
                    onWallpaperChange={onWallpaperChange}
                  />
                )}
              </MacWindow>
            ),
          )}
        </AnimatePresence>
      </div>

      {/* Quick Look */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ top: MENU_BAR_HEIGHT }}
      >
        <QuickLook work={quickLook} onClose={() => setQuickLook(null)} />
      </div>

      {/* Dock */}
      <Dock
        apps={DOCK_APPS}
        tools={DOCK_TOOLS}
        magnify={magnify}
        isOpen={isOpen}
        isMinimized={isMinimized}
        isActive={isActive}
        bounce={bounceMap}
        onLaunch={launchDockApp}
        onBounce={bumpDock}
      />

      {/* Spotlight */}
      <Spotlight
        open={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={openWindow}
      />

      {/* Context menu */}
      <DesktopContextMenu
        menu={contextMenu}
        onClose={() => setContextMenu(null)}
        onAction={handleMenuAction}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-none absolute bottom-24 left-1/2 z-[9800] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3.5 py-2 text-[12.5px] font-medium text-white shadow-2xl backdrop-blur-xl"
          >
            {toast.includes("empty") || toast.includes("Trash") ? (
              <Info className="h-3.5 w-3.5 opacity-80" />
            ) : (
              <Check className="h-3.5 w-3.5 opacity-80" />
            )}
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
