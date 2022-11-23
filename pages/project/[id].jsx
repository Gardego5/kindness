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

  return project ? <div>{JSON.stringify(project)}</div> : null;
};

export default Project;
