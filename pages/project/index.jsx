import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("/api/project")
      .then((res) => (res.status === 200 ? res.json() : false))
      .then((data) => setProjects(data));
  }, []);

  return projects?.length
    ? projects.map((project, idx) => <p key={idx}>{JSON.stringify(project)}</p>)
    : projects === null
    ? "Loading..."
    : "You have no projects.";
};

export default Projects;
