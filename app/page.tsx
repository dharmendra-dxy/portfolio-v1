import Container from "@/components/container";
import ExperienceSection from "@/components/experience-section";
import HeroSection from "@/components/hero-section";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Variants } from "framer-motion";
import React from "react";

export const customItemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.5,
    },
  },
};

export const sectionContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const page = () => {
  return (
    <AnimatedGroup
      variants={{
        container: {
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        },
        item: customItemVariants,
      }}
    >
      <Container>
        <HeroSection 
        variantContainer={sectionContainerVariants} 
        variantItem={customItemVariants}
        />
        <ExperienceSection
        variantContainer={sectionContainerVariants} 
        variantItem={customItemVariants}
        />
      </Container>
    </AnimatedGroup>
  );
};

export default page;
