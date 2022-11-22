import { getLoginSession } from "@lib/auth";
import { findProjectsByUser } from "@lib/model/projects";
import { findUser } from "@lib/model/user";
import projectView from "@lib/view/project";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null;
        const projects = (user && (await findProjectsByUser(user))) ?? null;

        res.status(200).send(projects.map((project) => projectView(project)));
      } catch (error) {
        console.error(error);

        res.status(401).end("Authentication token is invalid, please log in");
      }
    default:
      res.status(405).end();
  }
};
