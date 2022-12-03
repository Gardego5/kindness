import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findProjects } from "@lib/model/project";
import { findUser } from "@lib/model/user";
import makeError, { handleError } from "@lib/view/errorView";
import projectsView from "@lib/view/project";

export default async (req, res) => {
  const { id } = req?.query;

  switch (req.method) {
    case "GET":
      try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null;
        if (!user)
          throw makeError({
            message: "Authentication token is invalid, please log in.",
            code: 401,
          });

        const projects =
          (user &&
            (await findProjects({
              filter: sql`WHERE users.id = ${user.id} AND projects.id = ${id}`,
            }))) ??
          null;
        if (!projects?.length)
          throw makeError({
            message: "This project doesn't exist or you aren't a part of it.",
            code: 404,
          });

        res.status(200).send(projectsView(projects, true));
      } catch (error) {
        handleError(error, res);
      }
    default:
      res.status(405).end();
  }
};
