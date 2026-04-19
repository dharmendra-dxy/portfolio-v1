import { FileText,  Github, Linkedin, Mail, Twitter } from "lucide-react";

export const profile = {
    avatar: '/logo/avatar.png',
    name: 'Dharmendra Yadav',
    handle: '@dharmendra-dxy',
    title: 'Full-Stack Engineer',
    summary: 'I craft scalable, intelligent software systems - from modern web apps to AI integrations for startups and enterprise teams.',

    // currentWork: "Currently building with Typescript, Python, Docker, and cloud native tools.Open-source contributor & tech writer. Always learning, always shipping.",
    currentWork: {
        textLine1: "Currently building with",
        stack: [
            {icon: '/icons/typescript.png',  title: 'Typescript'},
            {icon: '/icons/nextjs.png',  title: 'NextJS'},
            {icon: '/icons/express.png',  title: 'Express'},
            // {icon: '/icons/postgresql.png',  title: 'Postgresql'},
            {icon: '/icons/docker.png',  title: 'Docker'},
        ],
        textLine2:"and cloud native tools. Open-source contributor & tech writer. Always learning, always shipping.",
    },

    socials: [
        {icon: Linkedin, url: 'https://www.linkedin.com/in/dharmendra-dxy '},
        {icon: Github, url: 'https://github.com/dharmendra-dxy'},
        {icon: Twitter, url: 'https://github.com/dharmendra-dxy'},
        {icon: Mail, url: 'mailto:yaduvanshi.dhanno@gmail.com'},
        {icon: FileText, url: 'https://drive.google.com/file/d/1zkPqjcTVe1MQqkn164gNLg0TG8TYzw8x/view?usp=sharing'},
    ],
    contact: "+91 6306450212",
    mail: "dharmendrayadav747392@gmail.com",
};