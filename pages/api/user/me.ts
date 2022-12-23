import { getLoginSession } from "@lib/auth";
import HTMLClientError from "@lib/HTMLResponseStatusCodes/400";
import { findUser } from "@model/user";
import apiErrorHandler from "@lib/apiErrorHandler";
import { userView } from "@view/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET")
      throw new HTMLClientError.METHOD_NOT_ALLOWED_405();

    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    res.status(200).send(userView(user));
  } catch (error) {
    apiErrorHandler(error, res);
  }
};
