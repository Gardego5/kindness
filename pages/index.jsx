import AlertModal from "@components/AlertModal";
import Project from "@components/Project";
import quandary from "@lib/quandary";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    quandary(`/api/project`, setProjects);
  }, []);

  return (
    <>
      {projects?.length
        ? projects.map((project, idx) => (
            <Project project={project} key={idx} />
          ))
        : projects === null
        ? "Loading..."
        : "You have no projects."}
      <AlertModal
        contentMd={`
## This is a sample

It contains some text that isn't very meaningful.
Despite this it proves to be helpful for testing purposes, because it accurately
shows how things will be rendered.
`}
      />
    </>
  );
};

export default Projects;
