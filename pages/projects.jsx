import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => (res.status === 200 ? res.json() : false))
      .then((data) => setProjects(data));
  }, []);

  console.log({ projects });

  return projects?.length
    ? projects.map((project, idx) => <p key={idx}>{JSON.stringify(project)}</p>)
    : projects === null
    ? "Loading..."
    : "You have no projects.";
};

export default Projects;
