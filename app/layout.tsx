import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dharmendra | Full Stack Developer Portfolio",
  description: "Showcasing professional full stack development expertise in building scalable, responsive, and SEO-friendly web applications. Specializing in React, Next.js, Node.js, Express, MongoDB, REST APIs, and Tailwind CSS. Explore innovative projects, interactive dashboards, and dynamic websites built with modern technologies like TypeScript, JavaScript, and cloud integrations. Hire a developer skilled in frontend, backend, and database design to bring your ideas to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-white dark bg-gradient-to-tr from-50% to-red-500/20`}
      >
        {children}
      </body>
    </html>
  );
}
