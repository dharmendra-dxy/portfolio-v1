"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/constant/profile";
import { experience } from "@/constant/experience";
import { education } from "@/constant/education";
import { skills } from "@/constant/skills";
import { works } from "@/constant/works";
import type { WindowId } from "../mac-config";

type Tone = "prompt" | "text" | "dim" | "accent" | "success" | "error";

interface Line {
  text: string;
  tone?: Tone;
}

const TONE_CLASS: Record<Tone, string> = {
  prompt: "text-emerald-400",
  text: "text-zinc-100",
  dim: "text-zinc-500",
  accent: "text-sky-400",
  success: "text-emerald-400",
  error: "text-rose-400",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const BOOT: Line[] = [
  { text: "Last login: " + new Date().toString().slice(0, 24) + " on ttys000", tone: "dim" },
  { text: "", tone: "dim" },
  { text: `Welcome to macOS — portfolio shell v1.0.0`, tone: "accent" },
  { text: `Type "help" to see available commands.`, tone: "dim" },
  { text: "", tone: "dim" },
];

export default function TerminalWindow({
  onOpenApp,
}: {
  onOpenApp: (id: WindowId) => void;
}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [booting, setBooting] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = `${profile.handle.replace("@", "")} ~ %`;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const line of BOOT) {
        if (cancelled) return;
        setLines((prev) => [...prev, line]);
        await sleep(150);
      }
      setLines((prev) => [
        ...prev,
        { text: `${prompt} neofetch`, tone: "prompt" },
      ]);
      await sleep(500);
      setLines((prev) => [...prev, ...neofetchLines()]);
      if (cancelled) return;
      setBooting(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, booting]);

  // The prompt only mounts once the boot sequence finishes.
  useEffect(() => {
    if (booting) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [booting]);

  function neofetchLines(): Line[] {
    const logo = [
      "                    'c.",
      "                 ,xNMM.",
      "               .OMMMMo",
      "               lMM'",
      "     .     ..     .:.",
      "  .xNMM.  dMM  ..,",
      "  :MMMd.  ...''dMM'",
      "  :MMMd.  ...   MMN",
      "  :MMMM.  ...   MM:",
      "  :MMM.       .M",
      "  .MM.  ... ..",
      "  'MM.  ..  ,'",
      "    'MMM;,",
      "      'W0W'",
    ];
    const info = [
      `${profile.name}@macbook`,
      "─".repeat(24),
      `OS: macOS 15 (Sequoia)`,
      `Host: Portfolio MacBook Pro`,
      `Shell: zsh 5.9`,
      `Role: ${profile.title}`,
      `Experience: ${experience.length} roles`,
      `Projects: ${works.length} shipped`,
      `Stack: ${skills.length} technologies`,
      `Availability: open to work`,
    ];
    const rows: Line[] = [];
    const height = Math.max(logo.length, info.length);
    for (let i = 0; i < height; i += 1) {
      const left = (logo[i] ?? "").padEnd(20, " ");
      const right = info[i];
      rows.push({
        text: right ? `${left}\u2502 ${right}` : `${left}\u2502`,
        tone: i === 0 ? "accent" : i < 3 ? "dim" : "text",
      });
    }
    rows.push({ text: " ".repeat(22), tone: "dim" });
    return rows;
  }

  const run = (raw: string): Line[] => {
    const command = raw.trim();
    const [name, ...args] = command.split(/\s+/);

    switch ((name ?? "").toLowerCase()) {
      case "":
        return [];
      case "help":
        return [
          { text: "Available commands:", tone: "accent" },
          { text: "  help              show this message", tone: "text" },
          { text: "  whoami            about the developer", tone: "text" },
          { text: "  neofetch          system summary", tone: "text" },
          { text: "  ls                list portfolio sections", tone: "text" },
          { text: "  cat profile.txt   full profile", tone: "text" },
          { text: "  skills            technology stack", tone: "text" },
          { text: "  experience        roles & impact", tone: "text" },
          { text: "  projects          shipped work", tone: "text" },
          { text: "  education         degrees", tone: "text" },
          { text: "  contact           how to reach out", tone: "text" },
          { text: "  open <app>        open a desktop app", tone: "text" },
          { text: "  clear             clear the screen", tone: "text" },
        ];
      case "whoami":
        return [
          { text: `${profile.name} (${profile.handle})`, tone: "accent" },
          { text: profile.title, tone: "text" },
          { text: profile.summary, tone: "text" },
          { text: "Currently building with " + profile.currentWork.stack.map((s) => s.title).join(", "), tone: "dim" },
        ];
      case "neofetch":
        return neofetchLines();
      case "ls":
        return [
          { text: "about.md  projects/  experience/  skills/  education/  contact.md", tone: "accent" },
        ];
      case "pwd":
        return [{ text: "/Users/dharmendra", tone: "text" }];
      case "cat":
        if ((args[0] ?? "").includes("profile")) {
          return [
            { text: `name: ${profile.name}`, tone: "text" },
            { text: `handle: ${profile.handle}`, tone: "text" },
            { text: `title: ${profile.title}`, tone: "text" },
            { text: `email: ${profile.mail}`, tone: "text" },
            { text: `phone: ${profile.contact}`, tone: "text" },
            { text: `summary: ${profile.summary}`, tone: "text" },
          ];
        }
        return [
          { text: `cat: ${args[0] ?? ""}: No such file or directory`, tone: "error" },
        ];
      case "skills":
        return [
          { text: `Installed technologies (${skills.length}):`, tone: "accent" },
          {
            text: skills.map((skill) => skill.title).join(" · "),
            tone: "text",
          },
        ];
      case "experience":
        return experience.flatMap((item) => [
          { text: `${item.role} — ${item.company}`, tone: "accent" },
          { text: `  ${item.duration}`, tone: "dim" },
          { text: `  ${item.description[0]?.title ?? ""}`, tone: "text" },
        ]);
      case "projects":
        return works.map((work) => ({
          text: `• ${work.title} — ${work.description}`,
          tone: "text" as Tone,
        }));
      case "education":
        return education.map((item) => ({
          text: `• ${item.degree}, ${item.fieldOfStudy} — ${item.institution} (${item.percentage})`,
          tone: "text" as Tone,
        }));
      case "contact":
        return [
          { text: `Email : ${profile.mail}`, tone: "accent" },
          { text: `Phone : ${profile.contact}`, tone: "accent" },
          ...profile.socials.map((social) => ({
            text: `Link  : ${social.url.trim()}`,
            tone: "text" as Tone,
          })),
        ];
      case "open": {
        const target = (args[0] ?? "").toLowerCase() as WindowId;
        const valid: WindowId[] = [
          "about",
          "projects",
          "experience",
          "skills",
          "education",
          "contact",
          "terminal",
          "browser",
        ];
        if (!valid.includes(target)) {
          return [
            { text: `open: unknown app "${args[0] ?? ""}"`, tone: "error" },
          ];
        }
        onOpenApp(target);
        return [{ text: `Opening ${target}…`, tone: "success" }];
      }
      case "clear":
      case "reset":
        return [{ text: "__CLEAR__", tone: "dim" }];
      case "sudo":
        return [
          { text: "nice try. this macbook runs on curiosity, not sudo.", tone: "error" },
        ];
      default:
        return [
          { text: `zsh: command not found: ${name}`, tone: "error" },
          { text: `Type "help" for a list of commands.`, tone: "dim" },
        ];
    }
  };

  const submit = () => {
    const value = input;
    setInput("");
    setHistory((prev) => [value, ...prev].slice(0, 40));
    setHistoryIndex(null);

    const output = run(value);
    if (output.some((line) => line.text === "__CLEAR__")) {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { text: `${prompt} ${value}`, tone: "prompt" },
      ...output,
    ]);
  };

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col bg-[rgba(20,20,24,0.92)] font-mono text-[12.5px] leading-[1.65]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />

      <div ref={scrollRef} className="mac-scroll min-h-0 flex-1 overflow-y-auto px-3.5 py-3">
        {lines.map((line, index) => (
          <div key={index} className={`whitespace-pre-wrap ${TONE_CLASS[line.tone ?? "text"]}`}>
            {line.text || "\u00a0"}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="shrink-0 text-emerald-400">{prompt}</span>
          {booting ? (
            <span className="inline-block h-[14px] w-[7px] animate-pulse bg-zinc-100" />
          ) : (
            <>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    submit();
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (history.length === 0) return;
                    setHistoryIndex((idx) => {
                      const next = idx === null ? 0 : Math.min(idx + 1, history.length - 1);
                      setInput(history[next] ?? "");
                      return next;
                    });
                  } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setHistoryIndex((idx) => {
                      if (idx === null) return null;
                      const next = idx - 1;
                      if (next < 0) {
                        setInput("");
                        return null;
                      }
                      setInput(history[next] ?? "");
                      return next;
                    });
                  }
                }}
                spellCheck={false}
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-zinc-100 caret-transparent outline-none"
              />
              <span className="inline-block h-[14px] w-[7px] animate-pulse bg-zinc-100" />
            </>
          )}
        </div>
      </div>

      <div className="flex h-6 shrink-0 items-center justify-between border-t border-white/10 bg-black/30 px-3 text-[11px] text-zinc-500">
        <span>{booting ? "starting shell…" : "zsh"}</span>
        <span>{lines.length} lines</span>
      </div>
    </div>
  );
}
