import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkIcon,
} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description?: string;
  image: string;
  link: string;
  github?: string;
  date?: string;
  slug: string;
  variant?: "default" | "compact"; // for Work vs Projects
}

const formatDate = (date?: string) => {
  if (!date) return "";
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
};

export const ProjectCard = ({
  title,
  image,
  link,
  github,
  date,
  slug,
}: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={1600}
          height={900}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Floating Arrow (top-right like your design) */}
        <div className="absolute top-3 right-3">
          <div className="bg-zinc-900/80 backdrop-blur p-2 rounded-full border border-zinc-700 
            group-hover:scale-110 group-hover:border-red-400 transition-all duration-300">
            <ArrowUpRightIcon size={16} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex justify-between items-end">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>

          {date && (
            <p className="text-sm text-zinc-400">
              {formatDate(date)}
            </p>
          )}
        </div>

        {/* Actions */}
        <div
          className="flex items-center gap-3 text-zinc-500"
          // onClick={(e) => e.stopPropagation()}
        >
          {github && (
            <Link href={github} target="_blank">
              <GithubIcon size={16} className="hover:text-red-400" />
            </Link>
          )}

          <Link href={link} target="_blank">
            <LinkIcon size={16} className="hover:text-red-400" />
          </Link>
        </div>
      </div>
    </Link>
  );
};