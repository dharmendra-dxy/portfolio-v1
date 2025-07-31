"use client";

import { Github } from "lucide-react";
import GitHubCalendar from "react-github-calendar";

const GitHubContributions = () => {
    return (
        <section className="">
            <div className="flex items-center space-x-3 mb-6 ">
                <Github size={24} className="text-red-400" />
                <h3 className="text-xl font-bold">Github Contributions</h3>
            </div>
            <div className="hide-scrollbar">
            <GitHubCalendar
                username="dharmendra-dxy"
                colorScheme="dark"
                fontSize={12}
                blockSize={12}
                showWeekdayLabels={true}
                theme={{
                    dark: ["#1c1917", "#4ade80", "#22c55e", "#16a34a", "#15803d",]
                }}
            />
            </div>
        </section>
    );
};

export default GitHubContributions;