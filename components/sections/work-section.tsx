import React from "react";
import Image from "next/image";
import { profile } from "@/constant/profile";
import { ArrowUpRightIcon, CodeIcon, GithubIcon } from "lucide-react";
import { AnimatedGroup } from "../ui/animated-group";
import { works } from "@/constant/works";
import Link from "next/link";
import { customItemVariants, sectionContainerVariants } from "@/lib/framer-variants";

const WorkSection = () => {
  return(
    <section>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CodeIcon size={24} className="text-red-400" />
              <h3 className="text-xl font-bold">Works</h3>
            </div>
            <Link
              href={profile.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 flex items-center space-x-1 hover:text-red-400 transition-colors"
            >
              <span>more</span>
              <ArrowUpRightIcon size={16} />
            </Link>
          </div>
          <AnimatedGroup
            variants={{
              container: sectionContainerVariants,
              item: customItemVariants,
            }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {works.map((work) => (
              <Link
                href={work.link}
                key={work.title}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 justify-between p-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 hover:border-red-400 transition-all"
              >
                <Image
                  src={work.cover}
                  alt={work.title}
                  width={1800}
                  height={900}
                  className="rounded-t-lg group-hover:scale-105 transition-all duration-300"
                />
                {/* {work.hasAccolades && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"icon"}
                        className="bg-red-500 hover:bg-red-600 absolute top-6 right-6 text-white rounded-full shadow-md size-7"
                      >
                        <MedalIcon size={20} weight="fill" className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      This project has received special recognition!
                    </TooltipContent>
                  </Tooltip>
                )} */}
                <span className="flex justify-between items-center text-xl font-semibold">
                  {work.title}
                  <GithubIcon size={20} className="text-zinc-500 hover:text-red-400" />
                </span>
                <span className="text-zinc-400">
                    {work.description.length>125 ? work.description.slice(0, 125) + '....' : work.description}
                </span>
              </Link>
            ))}
          </AnimatedGroup>
        </section>
  );
};

export default WorkSection;
