import { userContext } from "@context/userContext";
import { useContext } from "react";

const { Root } = require("./style");

const ProjectList = () => {
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

export default ProjectList;
