import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import findProjects from "@lib/model/project";
import { findUser } from "@lib/model/user";
import projectView from "@lib/view/project";

export default async (req, res) => {
  const { id } = req?.query;

  switch (req.method) {
    case "GET":
      try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null;
        const projects =
          (user &&
            (await findProjects({
              filter: sql`WHERE users.id = ${user.id} AND projects.id = ${id}`,
            }))) ??
          null;

        res.status(200).send(projectView(projects, true));
      } catch (error) {
        console.error(error);

        res.status(401).end("Authentication token is invalid, please log in");
      }
    default:
      res.status(405).end();
  }
};
