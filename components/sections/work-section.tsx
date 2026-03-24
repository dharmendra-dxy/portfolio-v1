import React from "react";
import Image from "next/image";
import { ArrowUpRightIcon, CodeIcon, GithubIcon, LinkIcon } from "lucide-react";
import { AnimatedGroup } from "../ui/animated-group";
import { works } from "@/constant/works";
import Link from "next/link";
import {
  customItemVariants,
  sectionContainerVariants,
} from "@/lib/framer-variants";
import { formatDate } from "@/utils/format-date";



const WorkSection = () => {
  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CodeIcon size={24} className="text-red-400" />
          <h3 className="text-xl font-bold">Works</h3>
        </div>

        <Link
          href="/projects"
          className="text-zinc-400 flex items-center space-x-1 hover:text-red-400 transition-colors"
        >
          <span>more</span>
          <ArrowUpRightIcon size={16} />
        </Link>
      </div>

      {/* Cards */}
      <AnimatedGroup
        variants={{
          container: sectionContainerVariants,
          item: customItemVariants,
        }}
        className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {works.map((work) => {
          const slug = work.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={work.title}
              href={`/projects/${slug}`}
              className="group flex flex-col gap-2 p-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 hover:border-red-400 transition-all duration-300"
            >
              {/* Image */}
              <Image
                src={work.cover}
                alt={work.title}
                width={1800}
                height={900}
                className="rounded-lg group-hover:scale-105 transition-all duration-500"
              />

              {/* Title */}
              <span className="text-xl font-semibold">{work.title}</span>

              {/* Description */}
              <span className="text-zinc-400 text-sm">
                {work.description.length > 120
                  ? work.description.slice(0, 120) + "..."
                  : work.description}
              </span>

              {/* Bottom Row */}
              <div className="flex justify-between items-center mt-2">
                {/* Date */}
                <div className="text-sm text-zinc-400 hover:text-red-400 transition-colors">
                  {formatDate(work.date)}
                </div>

                {/* Action Icons */}
                <div
                  className="flex items-center gap-3 text-zinc-500"
                  // onClick={(e) => e.stopPropagation()} // prevents parent Link navigation
                >
                  {/* Github */}
                  <Link href={work.github} target="_blank">
                    <GithubIcon className="hover:text-red-400" size={18} />
                  </Link>

                  {/* Live */}
                  <Link href={work.link} target="_blank">
                    <LinkIcon className="hover:text-red-400" size={18} />
                  </Link>

                  {/* Internal */}
                  <Link href={`/projects/${slug}`}>
                    <ArrowUpRightIcon
                      size={18}
                      className="transition-all duration-100 group-hover:scale-135  group-hover:text-red-400"
                    />
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </AnimatedGroup>
    </section>
  );
};

export default WorkSection;
