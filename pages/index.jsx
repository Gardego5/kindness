import Project from "@components/Project";
import quandary from "@lib/quandary";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    quandary(`/api/project`, setProjects);
  }, []);

  return projects?.length
    ? projects.map((project, idx) => <Project project={project} key={idx} />)
    : projects === null
    ? "Loading..."
    : "You have no projects.";
};

export default Projects;
