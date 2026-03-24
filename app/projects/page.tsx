import Container from "@/components/Container";
import React from "react";

const ProjectPage = () => {
  return (
    <div className="h-screen w-full">
      <Container>
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-zinc-400 mt-4 text-lg">A collection of projects showcasing development, design, and ideas.</p>
        </div>
      </Container>
    </div>
  );
};

export default ProjectPage;
