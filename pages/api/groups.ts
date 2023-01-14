import apiErrorHandler from "@lib/apiErrorHandler";
import { getLoginSession } from "@lib/auth";
import HTMLClientError from "@lib/HTMLResponseStatusCodes/400";
import { getAllGroups } from "@model/group";
import { findUser } from "@model/user";
import groupsView from "@view/group";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    if (!user.is_admin) throw new HTMLClientError.ADMIN_ROLE_REQUIRED_403();

    switch (req.method) {
      case "GET":
        const groups = await getAllGroups();

        res.status(200).send(groupsView(groups));
      default:
        throw new HTMLClientError.METHOD_NOT_ALLOWED_405();
    }
  } catch (error) {
    apiErrorHandler(error, res);
  }
};
