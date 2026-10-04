import type { SVGProps } from "react";

export const AppleLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

export const WifiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    aria-hidden
    {...props}
  >
    <path d="M1 4.1a10.5 10.5 0 0 1 14 0" />
    <path d="M3.6 6.9a6.6 6.6 0 0 1 8.8 0" />
    <path d="M6.2 9.6a2.9 2.9 0 0 1 3.6 0" />
    <circle cx="8" cy="11.4" r="0.55" fill="currentColor" stroke="none" />
  </svg>
);

export const BatteryIcon = ({
  level = 0.82,
  charging = false,
  ...props
}: { level?: number; charging?: boolean } & SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 30 14" fill="none" aria-hidden {...props}>
    <rect
      x="0.7"
      y="0.7"
      width="24.6"
      height="12.6"
      rx="4"
      stroke="currentColor"
      strokeOpacity="0.42"
      strokeWidth="1.1"
    />
    <path
      d="M27.2 5.1c.9.4 1.4 1.05 1.4 1.9s-.5 1.5-1.4 1.9z"
      fill="currentColor"
      fillOpacity="0.42"
    />
    <rect
      x="2.4"
      y="2.4"
      width={20.6 * Math.max(0.08, Math.min(1, level))}
      height="9.2"
      rx="2.7"
      fill="currentColor"
    />
    {charging && (
      <path
        d="M13.9 3.2 9.9 8.1h2.7l-.7 3.4 4-5h-2.7z"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

export const SpotlightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    aria-hidden
    {...props}
  >
    <circle cx="8.6" cy="8.6" r="5.4" />
    <path d="m12.7 12.7 4 4" />
  </svg>
);

export const ControlCenterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
    <rect x="1" y="4" width="18" height="5.4" rx="2.7" />
    <rect x="1" y="11" width="18" height="5.4" rx="2.7" opacity="0.45" />
    <circle cx="14.4" cy="6.7" r="1.9" fill="#000" opacity="0.55" />
    <circle cx="5.6" cy="13.7" r="1.9" fill="#000" opacity="0.35" />
  </svg>
);

export const WindowExpandGlyph = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M4.7 1.6H1.6v3.1" />
    <path d="M7.3 10.4h3.1V7.3" />
  </svg>
);

export const FolderGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path
      d="M6 18a5 5 0 0 1 5-5h13.6c1.5 0 2.9.6 3.9 1.8L32 20h21a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5z"
      fill="#3f9dfb"
    />
    <path
      d="M6 25h52v22a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5z"
      fill="#66b5fb"
    />
    <path
      d="M6 25h52v3H6z"
      fill="#fff"
      opacity="0.35"
    />
  </svg>
);

export const DriveGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <rect x="4" y="14" width="56" height="36" rx="7" fill="#d7dbe0" />
    <rect x="4" y="14" width="56" height="36" rx="7" fill="url(#drive-sheen)" />
    <defs>
      <linearGradient id="drive-sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="37" r="7" fill="#9aa3ad" />
    <circle cx="32" cy="37" r="2.4" fill="#f4f6f8" />
    <rect x="12" y="20" width="16" height="4" rx="2" fill="#aeb6bf" />
  </svg>
);

export const DocGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path
      d="M14 6h24l12 12v40a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z"
      fill="#fdfdfd"
    />
    <path d="M38 6l12 12H38z" fill="#dfe3e8" />
    <g fill="#c9ced6">
      <rect x="18" y="26" width="28" height="3" rx="1.5" />
      <rect x="18" y="34" width="28" height="3" rx="1.5" />
      <rect x="18" y="42" width="18" height="3" rx="1.5" />
    </g>
    <circle cx="32" cy="32" r="17" fill="none" />
  </svg>
);

export const TrashGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path
      d="M16 18h32l-3.2 36.4A6 6 0 0 1 38.8 58H25.2a6 6 0 0 1-6-3.6z"
      fill="#cfd6de"
      opacity="0.95"
    />
    <path d="M16 18h32l-.6 7H16.6z" fill="#e4e9ef" />
    <rect x="11" y="12" width="42" height="6" rx="3" fill="#b9c1cb" />
    <rect x="25" y="7" width="14" height="5" rx="2.5" fill="#b9c1cb" />
  </svg>
);
