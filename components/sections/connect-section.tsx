"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/constant/social";

// ── Icon components ───────────────────────────────────────────────────────────

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.884l2.102-2.25 5.31 5.586-.177.184a.532.532 0 0 0 0 .754.534.534 0 0 0 .754 0l1.942-2.009a.53.53 0 0 0 0-.754l-5.32-5.594 3.524-3.772a.53.53 0 0 0 0-.754.534.534 0 0 0-.754 0l-3.524 3.772-.041-.042a.53.53 0 0 0-.018-.014L9.796 2.048 12 0h1.483z" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  x: XIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
};

const iconBgMap: Record<string, string> = {
  x: "bg-black text-white",
  github: "bg-zinc-900 text-white",
  linkedin: "bg-[#0A66C2] text-white",
  leetcode: "bg-[#FFA116] text-white",
};

// ── ConnectSection ────────────────────────────────────────────────────────────

const ConnectSection = () => {
  return (
    <section className="w-full">
      {/* Top divider line */}
      <div className="border-t border-zinc-200 dark:border-zinc-800" />

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {SOCIAL_LINKS.map((link, index) => {
          const IconComponent = iconMap[link.icon];
          const iconBg = iconBgMap[link.icon];

          // Add right border to left-column items, bottom border to all but last row
          const isLeftCol = index % 2 === 0;
          const isLastRow = index >= SOCIAL_LINKS.length - 2;

          return (
            <React.Fragment key={link.id}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group flex items-center justify-between px-6 py-5",
                  "transition-colors duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                  // right border on left column
                  isLeftCol
                    ? "border-r border-zinc-200 dark:border-zinc-800"
                    : "",
                  // bottom border except last row
                  !isLastRow
                    ? "border-b border-zinc-200 dark:border-zinc-800"
                    : "",
                ].join(" ")}
              >
                {/* Left: icon + text */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
                  >
                    <IconComponent />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100 underline underline-offset-2">
                      {link.label}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {link.handle}
                    </span>
                  </div>
                </div>

                {/* Right: external link arrow */}
                <ArrowUpRight
                  className="h-4 w-4 text-zinc-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </Link>
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom divider line */}
      <div className="border-t border-zinc-200 dark:border-zinc-800" />
    </section>
  );
};

export default ConnectSection;