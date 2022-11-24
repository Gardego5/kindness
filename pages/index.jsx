import quandary from "@lib/quandary";
import Link from "next/link";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    quandary(`/api/project`, setProjects);
  }, []);

  return projects?.length
    ? projects.map(({ id, name }, idx) => (
        <Link key={idx} href={`/${id}`}>
          {name}
        </Link>
      ))
    : projects === null
    ? "Loading..."
    : "You have no projects.";
};

export default Projects;
