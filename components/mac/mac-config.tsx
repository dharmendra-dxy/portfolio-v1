import type { ReactNode } from "react";
import {
  Briefcase,
  Code2,
  FolderGit2,
  GraduationCap,
  Globe,
  Mail,
  SquareTerminal,
  User,
} from "lucide-react";

export type WindowId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "education"
  | "contact"
  | "terminal"
  | "browser";

export const WINDOW_IDS: WindowId[] = [
  "about",
  "projects",
  "experience",
  "skills",
  "education",
  "contact",
  "terminal",
  "browser",
];

export interface WindowConfig {
  id: WindowId;
  /** Menu bar / window title */
  title: string;
  /** Menu bar bold app name */
  appName: string;
  /** Finder-style path shown in toolbars */
  path: string;
  icon: ReactNode;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
}

export const WINDOW_CONFIG: Record<WindowId, WindowConfig> = {
  about: {
    id: "about",
    title: "About Me",
    appName: "Finder",
    path: "Macintosh HD \u203a Users \u203a dharmendra",
    icon: <User className="h-full w-full" strokeWidth={1.7} />,
    width: 660,
    height: 520,
    minWidth: 360,
    minHeight: 300,
  },
  projects: {
    id: "projects",
    title: "Projects",
    appName: "Finder",
    path: "Macintosh HD \u203a Users \u203a dharmendra \u203a Projects",
    icon: <FolderGit2 className="h-full w-full" strokeWidth={1.7} />,
    width: 820,
    height: 560,
    minWidth: 380,
    minHeight: 320,
  },
  experience: {
    id: "experience",
    title: "Experience",
    appName: "Notes",
    path: "Macintosh HD \u203a Users \u203a dharmendra \u203a Experience",
    icon: <Briefcase className="h-full w-full" strokeWidth={1.7} />,
    width: 720,
    height: 560,
    minWidth: 360,
    minHeight: 300,
  },
  skills: {
    id: "skills",
    title: "Skills",
    appName: "System Settings",
    path: "System Settings \u203a General \u203a Skills",
    icon: <Code2 className="h-full w-full" strokeWidth={1.7} />,
    width: 760,
    height: 560,
    minWidth: 360,
    minHeight: 300,
  },
  education: {
    id: "education",
    title: "Education",
    appName: "Notes",
    path: "Macintosh HD \u203a Users \u203a dharmendra \u203a Education",
    icon: <GraduationCap className="h-full w-full" strokeWidth={1.7} />,
    width: 700,
    height: 500,
    minWidth: 340,
    minHeight: 280,
  },
  contact: {
    id: "contact",
    title: "New Message",
    appName: "Mail",
    path: "Inbox \u203a New Message",
    icon: <Mail className="h-full w-full" strokeWidth={1.7} />,
    width: 680,
    height: 560,
    minWidth: 340,
    minHeight: 300,
  },
  terminal: {
    id: "terminal",
    title: "dharmendra \u2014 -zsh \u2014 92\u00d728",
    appName: "Terminal",
    path: "/Users/dharmendra",
    icon: <SquareTerminal className="h-full w-full" strokeWidth={1.7} />,
    width: 720,
    height: 460,
    minWidth: 320,
    minHeight: 240,
  },
  browser: {
    id: "browser",
    title: "Safari",
    appName: "Safari",
    path: "Safari \u203a Start Page",
    icon: <Globe className="h-full w-full" strokeWidth={1.7} />,
    width: 840,
    height: 580,
    minWidth: 360,
    minHeight: 300,
  },
};

export interface DockApp {
  id: WindowId | "trash";
  label: string;
  icon: ReactNode;
  /** tailwind gradient classes */
  gradient: string;
  /** darker ink for the glyph */
  ink?: string;
  kind?: "app" | "tool";
}

export const DOCK_APPS: DockApp[] = [
  {
    id: "about",
    label: "About Me",
    icon: <User className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-sky-300 via-sky-400 to-blue-600",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderGit2 className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-indigo-300 via-indigo-400 to-indigo-700",
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-emerald-300 via-emerald-400 to-emerald-700",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Code2 className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-amber-200 via-amber-400 to-orange-600",
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-fuchsia-300 via-purple-400 to-purple-700",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-teal-200 via-cyan-400 to-cyan-700",
  },
];

export const DOCK_TOOLS: DockApp[] = [
  {
    id: "terminal",
    label: "Terminal",
    icon: <SquareTerminal className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-zinc-500 via-zinc-700 to-zinc-950",
    kind: "tool",
  },
  {
    id: "browser",
    label: "Safari",
    icon: <Globe className="h-full w-full" strokeWidth={1.7} />,
    gradient: "from-rose-300 via-red-400 to-red-700",
    kind: "tool",
  },
  {
    id: "trash",
    label: "Trash",
    icon: <TrashGlyphInner />,
    gradient: "from-zinc-100 via-zinc-200 to-zinc-300",
    ink: "text-zinc-600",
    kind: "tool",
  },
];

function TrashGlyphInner() {
  return (
    <svg viewBox="0 0 64 64" className="h-[62%] w-[62%]" aria-hidden>
      <path
        d="M16 18h32l-3.2 36.4A6 6 0 0 1 38.8 58H25.2a6 6 0 0 1-6-3.6z"
        fill="currentColor"
        opacity="0.28"
      />
      <path d="M16 18h32l-.6 7H16.6z" fill="currentColor" opacity="0.4" />
      <rect x="11" y="12" width="42" height="6" rx="3" fill="currentColor" opacity="0.45" />
      <rect x="25" y="6" width="14" height="6" rx="3" fill="currentColor" opacity="0.45" />
    </svg>
  );
}
