import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findProjects } from "@lib/model/project";
import { findUser } from "@lib/model/user";
import { findVisits } from "@lib/model/visit";
import makeError from "@lib/view/errorView";
import visitsView from "@lib/view/visit";

export default async (req, res) => {
  const { id, start_date, end_date } = req?.query;

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

        const project =
          (await findProjects({
            filter: sql`WHERE users.id = ${user.id} AND projects.id = ${id}`,
          })) ?? null;
        if (!project?.length)
          throw makeError({
            message: "This project doesn't exist or you aren't a part of it.",
            code: 404,
          });

        const visits =
          (await findVisits({
            filter: sql`WHERE projects.id = ${id} ${
              start_date ? sql`AND visits.date >= ${start_date}` : sql``
            } ${end_date ? sql`AND visit.date <= ${end_date}` : sql``}`,
          })) ?? null;
        if (!visits?.length)
          throw makeError({
            message: "Not Found.",
            code: 404,
          });

        res.status(200).send(visitsView(visits));
      } catch (error) {
        console.error(error);

        res.status(error.code ?? 500).end(error.message ?? "Server Error.");
      }
    default:
      res.status(405).end();
  }
};
