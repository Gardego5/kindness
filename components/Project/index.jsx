import Link from "next/link";

const { Root, classes } = require("./style");

const Project = ({ project }) => {
  const { id, name } = project;

  return (
    <Root>
      <Link href={`/${id}`} className={classes.primaryLink}>
        {name}
      </Link>
    </Root>
  );
};

export default Project;
