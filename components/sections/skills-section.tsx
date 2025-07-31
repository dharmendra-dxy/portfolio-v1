import { skills } from "@/constant/skills";
import { CodeXml } from "lucide-react";
import React from "react";
import { AnimatedGroup } from "../ui/animated-group";
import Badge from "../badge";
import { customItemVariants, sectionContainerVariants } from "@/lib/framer-variants";

const SkillsSection = () => {
    return (
        <section>
            <div className="flex items-center space-x-3">
                <CodeXml size={24} className="text-red-400" />
                <h3 className="text-xl font-bold">Skills & Tools</h3>
            </div>
            <AnimatedGroup
                variants={{
                    container: sectionContainerVariants,
                    item: customItemVariants,
                }}
                className="mt-4 space-y-3 sm:space-y-4 flex flex-wrap gap-x-4 sm:gap-x-6"
            >
                {skills.map((skill) => (
                    <div key={skill.icon}>
                        <Badge url={skill.icon} title={skill.title} />
                    </div>
                ))}
            </AnimatedGroup>
        </section>
    );
};

export default SkillsSection;
