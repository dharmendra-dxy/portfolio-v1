"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Github, LinkIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";

// ─── Animations ─────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
  },
};

// ─── Icons ──────────────────────────────────────────────

const ICON_MAP: Record<string, string> = {
  nextjs: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  tailwind: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  postgres: "https://cdn.simpleicons.org/postgresql/4169E1",
  react: "https://cdn.simpleicons.org/react/61DAFB",
  firebase: "https://cdn.simpleicons.org/firebase/FFCA28",
  framer: "https://cdn.simpleicons.org/framer/ffffff",
  redis: "https://cdn.simpleicons.org/redis/FF4438",
};

function TechChip({ icon, name }: { icon: string; name: string }) {


  const iconUrl = ICON_MAP[icon.toLowerCase()];
  return (
    <motion.span
      variants={chip}
      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-300"
    >
      {iconUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt={name}
          width={12}
          height={12}
          className="h-3 w-3 object-contain"
        />
      )}
      {name}
    </motion.span>
  );
}

// ─── Types ──────────────────────────────────────────────

interface Work {
  title: string;
  description: string;
  date: string;
  cover?: string;
  link?: string;
  github?: string;
  technologies?: { name: string; icon: string }[];
  features?: string[];
}

export default function ProjectPageClient({ work }: { work: Work }) {


    const router = useRouter();
  const formattedDate = new Date(work.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Container classname={`space-y-0`}>
      {/*  Content  */}

      <div className="h-screen w-full">

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="flex items-center gap-4 px-6 py-5"
      >
        <button
          // href="/projects"
          onClick={()=> router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-md  text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <ArrowLeft size={15} />
        </button>

        {/* Project icon placeholder */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800">
          <span className="text-lg">🧩</span>
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">{work.title}</h1>
          <p className="text-xs text-zinc-500">
            {formattedDate}
          </p>
        </div>
      </motion.div>

      {/*  Cover + Links  */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="flex flex-col gap-6  px-6 py-8 sm:flex-row sm:items-start"
      >
        {/* Cover Image */}
        <div className="w-full overflow-hidden rounded-lg border border-zinc-800 sm:w-[60%]">
          {work.cover ? (
            <Image
              src={work.cover}
              alt={work.title}
              width={720}
              height={420}
              className="h-auto w-full object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-44 items-center justify-center bg-zinc-900 text-zinc-600 text-sm">
              No preview available
            </div>
          )}
        </div>

        {/* Links + Technologies */}
        <div className="flex flex-col gap-5 sm:w-[40%]">
          {/* Links */}
          <div className="flex flex-col gap-2">
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >

                <LinkIcon size={16}/>
                Visit Project
              </a>
            )}
            {work.github && (
              <a
                href={work.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                <Github size={16} />
                View on GitHub
              </a>
            )}
          </div>

          {/* Technology chips */}
          {work.technologies && work.technologies.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Technologies
              </p>
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-2"
              >
                {work.technologies.map((tech) => (
                  <TechChip key={tech.name} icon={tech.icon} name={tech.name} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      {/* <Separator /> */}

      {/*  About  */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className=" px-6 py-8"
      >
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          About this project
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          {work.description}
        </p>

        {work.features && work.features.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-zinc-200">
              Features:
            </p>
            <ul className="space-y-2">
              {work.features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2 text-sm text-zinc-400"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-500" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/*  All Technologies  */}
      {work.technologies && work.technologies.length > 0 && (
        <>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="px-6 py-8"
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              All Technologies &amp; Skills
            </p>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-2"
            >
              {work.technologies.map((tech) => (
                <TechChip key={tech.name} icon={tech.icon} name={tech.name} />
              ))}
            </motion.div>
          </motion.div>
          {/* <Separator /> */}
        </>
      )}
      </div>
    </Container>
  );
}