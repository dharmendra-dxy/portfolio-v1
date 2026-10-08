import type { ReactNode } from "react";
import {
  Briefcase,
  Code2,
  GraduationCap,
  Images,
  Link2,
  Mail,
  Settings2,
  User,
} from "lucide-react";

export type IPhoneAppId =
  | "profile"
  | "projects"
  | "experience"
  | "skills"
  | "education"
  | "contact"
  | "photos"
  | "links"
  | "resume"
  | "settings";

export interface IPhoneApp {
  id: IPhoneAppId;
  label: string;
  icon: ReactNode;
  gradient: string;
}

export const HOME_APPS: IPhoneApp[] = [
  {
    id: "profile",
    label: "Profile",
    icon: <User className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-sky-300 via-sky-400 to-blue-600",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <Images className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-amber-300 via-orange-400 to-rose-600",
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-emerald-300 via-emerald-500 to-teal-700",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Code2 className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-violet-300 via-purple-500 to-indigo-700",
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-pink-300 via-fuchsia-500 to-purple-700",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-cyan-200 via-sky-400 to-indigo-600",
  },
  {
    id: "photos",
    label: "Gallery",
    icon: <Images className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-rose-200 via-pink-400 to-fuchsia-700",
  },
  {
    id: "links",
    label: "Links",
    icon: <Link2 className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-slate-200 via-slate-400 to-slate-700",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings2 className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-zinc-300 via-zinc-400 to-zinc-600",
  },
];

export const PAGE_TWO_APPS: IPhoneApp[] = [
  {
    id: "resume",
    label: "Résumé",
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
    gradient: "from-red-200 via-rose-400 to-rose-700",
  },
];

export const DOCK_APPS: IPhoneApp[] = [
  {
    id: "projects",
    label: "Projects",
    icon: <Images className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-amber-300 via-orange-400 to-rose-600",
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-emerald-300 via-emerald-500 to-teal-700",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Code2 className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-violet-300 via-purple-500 to-indigo-700",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail className="h-full w-full" strokeWidth={1.8} />,
    gradient: "from-cyan-200 via-sky-400 to-indigo-600",
  },
];

export const APP_TITLES: Record<IPhoneAppId, string> = {
  profile: "Profile",
  projects: "Projects",
  experience: "Experience",
  skills: "Skills",
  education: "Education",
  contact: "Contact",
  photos: "Gallery",
  links: "Links",
  resume: "Résumé",
  settings: "Settings",
};
