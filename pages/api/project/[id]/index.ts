import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import HTMLClientError, {
  validateQueryParamsExist,
} from "@lib/HTMLResponseStatusCodes/400";
import { findProjects } from "@model/project";
import { findUser } from "@model/user";
import handleError from "@view/errorView";
import projectsView from "@view/project";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET")
      throw new HTMLClientError.METHOD_NOT_ALLOWED_405();

    const { id } = req?.query;
    validateQueryParamsExist({ id });

    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    const projects =
      (user &&
        (await findProjects({
          filter: sql`WHERE users.id = ${user.id} AND projects.id = ${id}`,
        }))) ??
      null;
    if (!projects?.length) throw new HTMLClientError.PROJECT_DOESNT_EXIST_404();

    res.status(200).send(projectsView(projects, true));
  } catch (error) {
    handleError(error, res);
  }
};
