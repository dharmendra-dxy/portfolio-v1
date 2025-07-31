'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronsDown } from 'lucide-react';
import { ExperienceItem } from './experience-section';
import Image from 'next/image';

interface ExperienceItemProps {
    exp: ExperienceItem
}

interface ExperienceDescription {
    title: string
}

const ExperienceSectionCard = ({ exp }: ExperienceItemProps) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [scaleOnHover, setScaleOnHover] = useState(1);

    const initialDescriptions = exp.description.slice(0, 1);
    const remainingDescriptions = exp.description.slice(1);
    const hasMoreDescriptions = remainingDescriptions.length > 0;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setScaleOnHover(window.innerWidth >= 768 ? 1.01 : 1);
        }
    }, []);

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Timeline icon - positioned on the red line */}
            <motion.div
                className="absolute -left-[46px]  top-0 h-10 w-10 md:h-10 md:w-10 bg-zinc-900 rounded-full border-2 border-white flex items-center justify-center z-10"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                    borderColor: isHovered ? '#f87171' : '#ffffff',
                }}
                transition={{ duration: 0.3 }}
            >
                <Building2 size={24} className={`${isHovered ? "text-red-400" : "text-white"}  md:w-6 md:h-6`} />
            </motion.div>

            {/* Experience card */}
            <motion.div
                className="bg-zinc-900 rounded-lg p-4 md:p-6 border border-zinc-800 mt-4"
                whileHover={{ scale: scaleOnHover }}
            >

                {/* Company and Role Info */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 space-y-2 md:space-y-0">
                    <div className='flex justify-between gap-4'>
                        <div>
                            <motion.h4
                                className="text-lg md:text-xl font-semibold text-white"
                                animate={{ color: isHovered ? '#f87171' : '#ffffff' }}
                                transition={{ duration: 0.3 }}
                            >
                                {exp.role}
                            </motion.h4>
                            <p className="text-zinc-300 font-medium text-sm md:text-base">{exp.company}</p>
                        </div>
                        <div className='mt-1'>
                            {exp.url && <Image src={exp?.url} alt={exp?.company} height={20} width={100} className={`not-target:object-cover rounded-sm  overflow-hidden ${isHovered ? "scale-105 duration-300  border-red-400" : ""}`} />}
                        </div>
                    </div>
                    <span className="text-xs md:text-sm text-zinc-500 bg-zinc-800 px-2 md:px-3 py-1 rounded-full self-start border border-neutral-700">
                        {exp.duration}
                    </span>
                </div>

                {/* Description List */}
                <div className="space-y-3">
                    {/* Always visible descriptions */}
                    {initialDescriptions.map((desc: ExperienceDescription, index: number) => (
                        <motion.div
                            key={index}
                            className="flex items-start space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 flex-shrink-0" />
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {desc.title}
                            </p>
                        </motion.div>
                    ))}

                    {/* Expandable descriptions */}
                    <AnimatePresence>
                        {isExpanded && remainingDescriptions.map((desc: ExperienceDescription, index: number) => (
                            <motion.div
                                key={index + initialDescriptions.length}
                                className="flex items-start space-x-3"
                                initial={{ opacity: 0, height: 0, x: -20 }}
                                animate={{ opacity: 1, height: 'auto', x: 0 }}
                                exit={{ opacity: 0, height: 0, x: -20 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 flex-shrink-0" />
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {desc.title}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* View More/Less Button */}
                    {hasMoreDescriptions && (
                        <motion.button
                            onClick={toggleExpanded}
                            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300 mt-4 group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-sm font-medium">
                                {isExpanded ? 'View Less' : `View More (${remainingDescriptions.length} more)`}
                            </span>
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronsDown size={16} className="group-hover:transform group-hover:scale-110 transition-transform" />
                            </motion.div>
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ExperienceSectionCard;
