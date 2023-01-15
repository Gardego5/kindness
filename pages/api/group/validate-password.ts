import apiErrorHandler from "@lib/apiErrorHandler";
import { getLoginSession } from "@lib/auth";
import HTMLClientError, {
  validateObjectsInBody,
} from "@lib/HTMLResponseStatusCodes/400";
import { findGroupById, validateGroupPassword } from "@model/group";
import { findUser } from "@model/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    if (!user.is_admin) throw new HTMLClientError.ADMIN_ROLE_REQUIRED_403();

    switch (req.method) {
      case "GET":
        const { group_id, group_password } = req.body;
        validateObjectsInBody({ group_id, group_password });

        const group = await findGroupById({ id: group_id });

        await validateGroupPassword(group, group_password);

        res.status(200).send({ done: "true", message: "password is correct." });
        break;

      default:
        throw new HTMLClientError.METHOD_NOT_ALLOWED_405();
    }
  } catch (error) {
    apiErrorHandler(error, res);
  }
}
