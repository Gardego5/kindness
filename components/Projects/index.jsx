import { userContext } from "@context/userContext";
import { useContext } from "react";

const { Root } = require("./style");

const Projects = () => {
  const { user } = useContext(userContext);

  return (
    <Root>
      {user && (
        <pre>
          <code>Logged in as: {JSON.stringify(user, undefined, "··")}</code>
        </pre>
      )}
    </Root>
  );
};

export default Projects;
