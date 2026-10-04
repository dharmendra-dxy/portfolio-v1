"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Paperclip, Phone, Send, Sparkles } from "lucide-react";
import { profile } from "@/constant/profile";
import { SOCIAL_LINKS } from "@/constant/social";
import { FinderStatusBar } from "../finder-chrome";

const SOCIAL_TINT: Record<string, string> = {
  x: "bg-zinc-900 text-white",
  github: "bg-zinc-900 text-white",
  linkedin: "bg-[#0A66C2] text-white",
  leetcode: "bg-[#FFA116] text-white",
};

export default function ContactWindow() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
    setForm({ name: "", email: "", message: "" });
  };

  const field = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[13px] text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Mail header */}
      <div className="grid shrink-0 grid-cols-[52px_1fr] items-center border-b border-black/10 bg-zinc-100/85 px-3 py-2 text-[12px]">
        <span />
        <span className="border-b border-black/10 pb-1.5">
          <span className="text-zinc-400">To: </span>
          <span className="font-medium text-zinc-700">{profile.name}</span>
        </span>
        <span />
        <span className="border-b border-black/10 py-1.5">
          <span className="text-zinc-400">Subject: </span>
          <span className="font-medium text-zinc-700">
            Let&apos;s build something together
          </span>
        </span>
      </div>

      <div className="mac-scroll min-h-0 flex-1 overflow-y-auto bg-white p-5">
        <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="mac-name"
                className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-zinc-400"
              >
                Your name
              </label>
              <input
                id="mac-name"
                required
                value={form.name}
                onChange={(event) =>
                  setForm((f) => ({ ...f, name: event.target.value }))
                }
                placeholder="Ada Lovelace"
                className={field}
              />
            </div>

            <div>
              <label
                htmlFor="mac-email"
                className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-zinc-400"
              >
                Email
              </label>
              <input
                id="mac-email"
                type="email"
                required
                value={form.email}
                onChange={(event) =>
                  setForm((f) => ({ ...f, email: event.target.value }))
                }
                placeholder="you@company.com"
                className={field}
              />
            </div>

            <div>
              <label
                htmlFor="mac-message"
                className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-zinc-400"
              >
                Message
              </label>
              <textarea
                id="mac-message"
                required
                rows={6}
                value={form.message}
                onChange={(event) =>
                  setForm((f) => ({ ...f, message: event.target.value }))
                }
                placeholder="Tell me about the role, the product and the timeline…"
                className={`${field} resize-none`}
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f6fed] px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-sm transition-all hover:bg-[#2560d8] active:scale-[0.98]"
              >
                <Send className="h-3.5 w-3.5" />
                Send message
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-2 text-[12.5px] font-medium text-zinc-600 ring-1 ring-black/5 transition-colors hover:bg-zinc-200"
              >
                <Paperclip className="h-3.5 w-3.5" />
                Attach résumé
              </button>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[12.5px] font-medium text-emerald-700 ring-1 ring-emerald-600/15"
                >
                  <Check className="h-3.5 w-3.5" />
                  Message sent — I&apos;ll get back to you within 24 hours.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Contact sidebar */}
          <aside className="space-y-3">
            <div className="rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 p-4 text-white shadow-sm">
              <Sparkles className="mb-2 h-4 w-4 opacity-90" />
              <p className="text-[13px] font-semibold">Open to work</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-white/80">
                Full-stack roles, freelance builds and interesting side
                projects.
              </p>
            </div>

            <a
              href={`mailto:${profile.mail}`}
              className="flex items-center gap-2.5 rounded-xl bg-zinc-50 p-3 text-[12px] text-zinc-600 ring-1 ring-black/5 transition-colors hover:bg-zinc-100"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              <span className="min-w-0 truncate">{profile.mail}</span>
            </a>
            <a
              href={`tel:${profile.contact.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 rounded-xl bg-zinc-50 p-3 text-[12px] text-zinc-600 ring-1 ring-black/5 transition-colors hover:bg-zinc-100"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              {profile.contact}
            </a>

            <div className="grid grid-cols-2 gap-1.5">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-center text-[10.5px] font-medium shadow-sm ${SOCIAL_TINT[social.icon] ?? "bg-zinc-800 text-white"}`}
                >
                  <span className="line-clamp-1">{social.label}</span>
                  <span className="text-[9px] opacity-70">{social.handle}</span>
                </motion.a>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <FinderStatusBar>Draft saved · {profile.mail}</FinderStatusBar>
    </div>
  );
}
