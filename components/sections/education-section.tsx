import { GraduationCapIcon } from "lucide-react";
import React from "react";
import { AnimatedGroup } from "../ui/animated-group";
import Image from "next/image";
import Link from "next/link";
import { education } from "@/constant/education";
import { customItemVariants, sectionContainerVariants } from "@/lib/framer-variants";


const EducationSection = () => {
    return (
        <section>
            <div className="flex items-center space-x-3">
                <GraduationCapIcon size={24} className="text-red-400" />
                <h3 className="text-xl font-bold">Education</h3>
            </div>
            <AnimatedGroup
                variants={{
                    container: sectionContainerVariants,
                    item: customItemVariants,
                }}
                className="mt-4 space-y-6 pl-6"
            >
                {education.map((edu, index) => (
                    <div key={index} className="flex gap-4 items-start">
                        <div className="bg-slate-200 rounded-lg">
                            <Image
                                src={edu.logo}
                                alt={edu.institution}
                                width={60}
                                height={60}
                                className="hover:-rotate-12 aspect-square object-contain transition-all duration-300 rounded-lg bg-white"
                            />
                        </div>
                        <div className="flex-1">
                            <Link
                                href={edu.site}
                                target="_blank"
                                className="font-semibold underline underline-offset-4 decoration-zinc-600"
                            >
                                {edu.institution}
                            </Link>
                            <p className="text-zinc-400 text-sm md:text-base">
                                {edu.degree}, {edu.fieldOfStudy}
                            </p>
                                 <p className="text-zinc-500 text-xs md:text-sm">
                                {edu.percentage}, {edu.startYear} - {edu.endYear}
                            </p>
                        </div>
                    </div>
                ))}
            </AnimatedGroup>
        </section>
    );
};

export default EducationSection;
