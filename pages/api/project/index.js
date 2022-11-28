import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findProjects } from "@lib/model/project";
import { findUser } from "@lib/model/user";
import projectsView from "@lib/view/project";
import makeError from "@lib/view/errorView";

export default async (req, res) => {
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
              filter: sql`WHERE users.id = ${user.id}`,
            }))) ??
          null;
        if (!projects?.length)
          throw makeError({
            message: "The projects couldn't be retreived.",
          });

        res.status(200).send(projectsView(projects));
      } catch (error) {
        console.error(error);

        res.status(error.code ?? 500).end(error.message ?? "Server Error.");
      }
    default:
      res.status(405).end();
  }
};
