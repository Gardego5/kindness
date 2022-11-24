import Expandable from "@components/Expandable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Project = (props) => {
  const [project, setProject] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query?.id !== "undefined")
      fetch(`/api/project/${router.query.id}`)
        .then((res) => (res.status === 200 ? res.json() : false))
        .then((data) => setProject(data));
  }, [router]);

  return project ? (
    <Expandable title={project.name}>
      <p>This is a description</p>
      <p>Of all the things</p>
    </Expandable>
  ) : null;
};

export default Project;
