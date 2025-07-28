
import { profile } from "@/constant/profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
    return (
        <div>
            <header className="flex items-center space-x-4">
                <Image
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full border-3 border-red-400"
                    height={200}
                    width={200}
                />
                <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-zinc-400">{profile.handle}</p>
                </div>
            </header>

            <section className="mt-16">
          {/* <AnimatedGroup
            variants={{
              container: sectionContainerVariants,
              item: customItemVariants,
            }}
          > */}

            <h2 className="text-3xl font-bold leading-tight">
              {profile.title}
            </h2>
            <p className="mt-4 text-zinc-300 max-w-2xl text-lg">
              {profile.summary}
            </p>
            <p className="mt-2 text-zinc-400 max-w-3xl">
              {profile.currentWork}
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-400">
                Available for new opportunities
              </span>
            </div>
            {/* <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                },
                item: customItemVariants,
              }}
              className="mt-6 flex space-x-4"
            > */}
            <div className="mt-6 flex space-x-4">
              {profile.socials.map((social, index) => (
                <Button
                  key={index}
                  size={"icon"}
                  className="text-zinc-100 bg-zinc-700 rounded-lg hover:bg-red-400 transition-colors size-9"
                  asChild
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={20} className="size-6" />
                  </Link>
                </Button>
              ))}
            {/* </AnimatedGroup> */}
          {/* </AnimatedGroup> */}
          </div>
        </section>
        </div>
    )
};

export default HeroSection;
