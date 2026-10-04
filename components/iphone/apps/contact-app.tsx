"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Phone, Send } from "lucide-react";
import { profile } from "@/constant/profile";
import { SOCIAL_LINKS } from "@/constant/social";
import {
  AppScreen,
  IOSTextarea,
  IOSInput,
  PrimaryButton,
  Row,
  Section,
} from "../ios-ui";

const SOCIAL_TINT: Record<string, string> = {
  x: "bg-zinc-900",
  github: "bg-zinc-800",
  linkedin: "bg-[#0A66C2]",
  leetcode: "bg-[#FFA116]",
};

export default function ContactApp({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <AppScreen title="Contact" onBack={onBack}>
      <div className="mx-4 mt-3 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white">
        <p className="text-[18px] font-semibold tracking-[-0.01em]">
          Let&apos;s build something
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-white/80">
          Full-stack roles, freelance builds or an interesting side project —
          I reply within 24 hours.
        </p>
      </div>

      <Section title="New message">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            setForm({ name: "", email: "", message: "" });
            window.setTimeout(() => setSent(false), 3200);
          }}
          className="bg-white"
        >
          <IOSInput
            label="Your name"
            required
            value={form.name}
            placeholder="Ada Lovelace"
            onChange={(event) =>
              setForm((f) => ({ ...f, name: event.target.value }))
            }
          />
          <IOSInput
            label="Email"
            type="email"
            required
            value={form.email}
            placeholder="you@company.com"
            onChange={(event) =>
              setForm((f) => ({ ...f, email: event.target.value }))
            }
          />
          <IOSTextarea
            label="Message"
            required
            value={form.message}
            placeholder="Tell me about the role…"
            onChange={(event) =>
              setForm((f) => ({ ...f, message: event.target.value }))
            }
          />
          <div className="p-3">
            <PrimaryButton className="flex items-center justify-center gap-2">
              <Send className="h-4 w-4" />
              Send message
            </PrimaryButton>
          </div>
        </form>
      </Section>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-3 text-[14px] font-medium text-emerald-700"
          >
            <Check className="h-4 w-4 shrink-0" />
            Message sent — talk soon.
          </motion.p>
        )}
      </AnimatePresence>

      <Section title="Direct">
        <Row
          icon={<Mail className="h-4 w-4" />}
          tint="bg-blue-500"
          title="Email"
          value={profile.mail}
          href={`mailto:${profile.mail}`}
        />
        <Row
          icon={<Phone className="h-4 w-4" />}
          tint="bg-zinc-500"
          title="Phone"
          value={profile.contact}
          href={`tel:${profile.contact.replace(/\s/g, "")}`}
        />
      </Section>

      <Section title="Find me">
        {SOCIAL_LINKS.map((social) => (
          <Row
            key={social.id}
            icon={
              <span className="text-[13px] font-bold">
                {social.label.charAt(0)}
              </span>
            }
            tint={SOCIAL_TINT[social.icon] ?? "bg-zinc-700"}
            title={social.label}
            subtitle={social.handle}
            href={social.href}
          />
        ))}
      </Section>
    </AppScreen>
  );
}
