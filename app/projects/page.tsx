"use client";

import Container from "@/components/Container";
import { works } from "@/constant/works";
import { SearchIcon } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { motion, Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ProjectsPage = () => {
  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-4 py-10"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-zinc-400 mt-2">
            A collection of projects showcasing development, design, and ideas.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={fadeUp} className="relative mb-10">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search projects by name, description, or skill..."
            className="w-full pl-10 text-sm pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-zinc-600"
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {works.map((work) => {
            const slug = work.title.toLowerCase().replace(/\s+/g, "-");

            return (
              <ProjectCard
                key={work.title}
                title={work.title}
                description={work.description}
                image={work.cover}
                link={work.link}
                github={work.github}
                date={work.date}
                slug={slug}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default ProjectsPage;
