import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findAlert } from "@model/alert";
import { findProjects } from "@model/project";
import { findUser } from "@model/user";
import { today } from "@lib/util/dates";
import apiErrorHandler from "@lib/apiErrorHandler";
import HTMLClientError from "@lib/HTMLResponseStatusCodes/400";

export default async (req, res) => {
  const { id } = req?.query;

  switch (req.method) {
    case "GET":
      try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null;
        if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

        const project =
          (await findProjects({
            filter: sql`WHERE users.id = ${user.id} AND projects.id = ${id}`,
          })) ?? null;
        if (!project?.length)
          throw new HTMLClientError.PROJECT_DOESNT_EXIST_404();

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
        if (alerts === null) throw new HTMLClientError.NOT_FOUND_404();

        res.status(200).send(alerts);
      } catch (error) {
        apiErrorHandler(error, res);
      }
    default:
      res.status(405).end();
  }
};
