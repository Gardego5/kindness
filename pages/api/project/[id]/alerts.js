import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findAlert } from "@lib/model/alert";
import { findProjects } from "@lib/model/project";
import { findUser } from "@lib/model/user";
import { findVisits } from "@lib/model/visit";
import { today } from "@lib/util/dates";
import { handleError, makeError } from "@lib/view/errorView";
import visitsView from "@lib/view/visit";

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

        const project =
          (await findProjects({
            filter: sql`WHERE users.id = ${user.id} AND projects.id = ${id}`,
          })) ?? null;
        if (!project?.length)
          throw makeError({
            message: "This project doesn't exist or you aren't a part of it.",
            code: 404,
          });

        // const visits =
        //   (await findVisits({
        //     filter: sql`WHERE projects.id = ${id} ${
        //       start_date ? sql`AND visits.date >= ${start_date}` : sql``
        //     } ${end_date ? sql`AND visit.date <= ${end_date}` : sql``}`,
        //   })) ?? null;
        // if (visits === null)
        //   throw makeError({
        //     message: "Not Found.",
        //     code: 404,
        //   });

        const alerts =
          (await findAlert({
            filters: sql`
              WHERE (project_id = ${id} OR project_id IS NULL)
                AND (start_date <= ${today()} OR start_date IS NULL)
                AND (end_date >= ${today()} OR end_date IS NULL)
                AND (times_displayed < displays OR times_displayed IS NULL OR displays IS NULL)
                AND (user_id = ${user.id} OR user_id IS NULL)`,
          })) ?? null;
        if (alerts === null)
          throw makeError({
            message: "Not Found.",
            code: 404,
          });

        res.status(200).send(alerts);
      } catch (error) {
        handleError(error, res);
      }
    default:
      res.status(405).end();
  }
};
