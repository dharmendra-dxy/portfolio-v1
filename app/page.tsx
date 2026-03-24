import React from "react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { customItemVariants } from "@/lib/framer-variants";
import HeroSection from "@/components/sections/hero-section";
import ExperienceSection from "@/components/sections/experience-section";
import WorkSection from "@/components/sections/work-section";
import EducationSection from "@/components/sections/education-section";
import GitHubContributions from "@/components/sections/github-contributions";
import SkillsSection from "@/components/sections/skills-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/footer";
import Container from "@/components/Container";
import ConnectSection from "@/components/sections/connect-section";

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
        <HeroSection/>
        <ExperienceSection/>
        <WorkSection/>
        <GitHubContributions/>
        <SkillsSection/>
        <EducationSection/>
        <ContactSection/>
        <ConnectSection />
        <Footer/>
      </Container>
    </AnimatedGroup>
  );
};

export default page;
