import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findProjects } from "@model/project";
import { findUser } from "@model/user";
import projectsView from "@view/project";
import apiErrorHandler from "@lib/apiErrorHandler";
import HTMLClientError from "@lib/HTMLResponseStatusCodes/400";
import HTMLServerError from "@lib/HTMLResponseStatusCodes/500";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET")
      throw new HTMLClientError.METHOD_NOT_ALLOWED_405();

    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    const projects =
      (user &&
        (await findProjects({
          filter: sql`WHERE users.id = ${user.id}`,
        }))) ??
      null;
    if (!projects?.length)
      throw new HTMLServerError.INTERNAL_SERVER_ERROR_500(
        "The projects couldn't be retreived."
      );

    res.status(200).send(projectsView(projects));
  } catch (error) {
    apiErrorHandler(error, res);
  }
};
