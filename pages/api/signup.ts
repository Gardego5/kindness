import { setLoginSession } from "@lib/auth";
import HTMLClientError from "@lib/HTMLResponseStatusCodes/400";
import {
  addUserToGroup,
  findGroupById,
  validateGroupPassword,
} from "@model/group";
import { addProjectSignUps } from "@model/project";
import { createUser } from "@model/user";
import apiErrorHandler from "@lib/apiErrorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST")
      throw new HTMLClientError.METHOD_NOT_ALLOWED_405();

    const group = await findGroupById({ id: req.body.group_id });
    if (typeof group === "undefined")
      throw new HTMLClientError.UNAUTHORIZED_401("Invalid group id.");

    await validateGroupPassword(group, req.body.group_password);

    const createdUser = await createUser(req.body);
    if (typeof createdUser === "undefined")
      throw new HTMLClientError.CONFLICT_409("Username or Email taken.");

    await addProjectSignUps({
      user_id: createdUser.id,
      project_ids: group.project_ids,
    });

    await addUserToGroup({
      user_id: createdUser.id,
      group_id: group.id,
    });

    const session = {
      username: createdUser.username,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
    };

    await setLoginSession(res, session);

    res.status(200).send({ done: true });
  } catch (error) {
    apiErrorHandler(error, res);
  }
}
