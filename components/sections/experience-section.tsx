import React from 'react';
import { BriefcaseIcon } from 'lucide-react';
import ExperienceSectionCard from '../experience-section-card';
import { AnimatedGroup } from '../ui/animated-group';
import { experience } from '@/constant/experience';
import { customItemVariants, sectionContainerVariants } from "@/lib/framer-variants";
export interface ExperienceItem {
    id: number,
    company: string,
    role: string,
    duration: string,
    description: {
        title: string;
    }[];
    url?: string;
}

const ExperienceSection = () => {

    return (
        <section>
            <div
                className="flex items-center space-x-3 mb-6 md:mb-8"
            >
                <BriefcaseIcon size={24} className="text-red-400 md:w-6 md:h-6" />
                <h3 className="text-lg md:text-xl font-bold text-white">Experience</h3>
            </div>

            <AnimatedGroup
                variants={{
                    container: sectionContainerVariants,
                    item: customItemVariants,
                }}
                className="mt-8 space-y-4 md:space-y-6 pl-6 ml-2 border-l-2 border-red-400"
            >
                    {experience.map((exp: ExperienceItem) => (
                        <div className="relative" key={exp.id}>
                            <ExperienceSectionCard exp={exp} />
                        </div>
                    ))}
            </AnimatedGroup>
        </section >
    );
};

export default ExperienceSection;