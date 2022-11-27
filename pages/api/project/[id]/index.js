import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findProjects } from "@lib/model/project";
import { findUser } from "@lib/model/user";
import makeError from "@lib/view/errorView";
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
            httpStatusCode: 401,
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
            httpStatusCode: 404,
          });

        res.status(200).send(projectsView(projects, true));
      } catch (error) {
        if (!error.httpStatusCode) console.error(error);

        res
          .status(error.httpStatusCode ?? 500)
          .end(error.message ?? "Server Error.");
      }
    default:
      res.status(405).end();
  }
};