import { images } from "./images";

export const experience = [
    
    {
        id: 1,
        company: 'Makunai Global',
        role: 'SDE - Frontend Intern',
        duration: "March'25 - September'25",
        url: images.makunai,
        description : [
            {   
                title: 'Led key frontend modules for SEO-driven blog and gallery pages using Next.js and TypeScript, optimizing API calls and implementing pagination, improving Lighthouse performance from 60 to 90+. '
            },
            {
                title: 'Collaborated in Agile sprints with cross-functional teams via JIRA, actively participating in standups, sprint planning, and retrospectives—demonstrating strong SDLC understanding and team coordination. '
            },
            {
                title: 'Migrated the platform from Next.js 14 to 15, improving Core Web Vitals (LCP, CLS, INP) and reducing load times by 30%+ through performance profiling and debugging.'
            }
        ]
    },
    {
        id: 2,
        company: 'Makunai Global',
        role: 'Associate Software Developer Engineer',
        duration: "October'25 - January'26",
        url: images.makunai,
        description : [
            {   
                title: 'Led the development of a scalable B2B web application, implementing multi-level filtering systems that improved data accessibility and reduced user search time by 65%. '
            },
            {
                title: 'Built and deployed 200+ SEO-optimized landing pages using reusable, component-based architecture, reducing new page development time by 90%. '
            },
            {
                title: 'Delivered 200+ landing pages within 1.5 months, achieving 10%+ CTR and driving significant organic lead generation through targeted content and optimization strategies.'
            }
        ]
    },
    {
        id: 3,
        company: 'TrueTym',
        role: 'Associate Software Developer Engineer',
        duration: "January'26 - Present",
        url: images.truetym,
        description : [
            {   
                title: 'Revamped a legacy website from WordPress to Next.js, implementing SEO best practices results in improved organic traffic.'
            },
            {
                title: 'Designed and developed a full-scale management system, including database architecture and 150+ REST APIs, ensuring seamless backend–frontend integration.'
            },
            {
                title: 'Integrated 150+ APIs into frontend modules with optimized data fetching strategies, improving performance and reducing redundant network calls.'
            },
            {
                title: 'Implemented Redis caching at the backend, reducing API response time by 60%.'
            },
            {
                title: 'Optimized frontend performance using TanStack Query, reducing duplicate API calls by 70%, enhancing user experience by efficient state management.'
            }
        ]
    },
]