import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import HTMLClientError, {
  validateQueryParamsExist,
} from "@lib/HTMLResponseStatusCodes/400";
import { findProjects } from "@model/project";
import { findUser } from "@model/user";
import { findVisits } from "@model/visit";
import handleError from "@view/errorView";
import visitsView from "@view/visit";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET")
      throw new HTMLClientError.METHOD_NOT_ALLOWED_405();

    const { id, start_date, end_date } = req?.query;
    validateQueryParamsExist({ id });

    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    const project =
      (await findProjects({
        filter: sql`WHERE users.id = ${user.id} AND projects.id = ${id}`,
      })) ?? null;
    if (!project?.length) throw new HTMLClientError.PROJECT_DOESNT_EXIST_404();

    const visits =
      (await findVisits({
        filter: sql`WHERE projects.id = ${id} ${
          start_date ? sql`AND visits.date >= ${start_date}` : sql``
        } ${end_date ? sql`AND visit.date <= ${end_date}` : sql``}`,
      })) ?? null;
    if (visits === null) throw new HTMLClientError.NOT_FOUND_404();

    res.status(200).send(visitsView(visits));
  } catch (error) {
    handleError(error, res);
  }
};
