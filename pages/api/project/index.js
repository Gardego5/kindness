import { getLoginSession } from "@lib/auth";
import { findProjectsByUser } from "@lib/model/project";
import { findUser } from "@lib/model/user";
import { projectsView } from "@lib/view/project";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null;
        const projects = (user && (await findProjectsByUser(user))) ?? null;

        res.status(200).send(projectsView(projects));
      } catch (error) {
        console.error(error);

        res.status(401).end("Authentication token is invalid, please log in");
      }
    default:
      res.status(405).end();
  }
};
