import React from "react";
import { works } from "@/constant/works";
import { notFound } from "next/navigation";
import ProjectPageClient from "@/components/project-page-client";

interface Props {
  params: Promise<{ slug: string }>;
}

const ProjectSlugPage = async ({ params }: Props) => {
  const { slug } = await params;

  const work = works.find(
    (w) => w.title.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!work) notFound();

  return <ProjectPageClient work={work} />;
};

export default ProjectSlugPage;
