import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  const { project } = router.query;

  return <div>{project}</div>;
};

export default Project;
