import { setLoginSession } from "@lib/auth";
import {
  addUserToGroup,
  findGroupById,
  validateGroupPassword,
} from "@model/group";
import { addProjectSignUps } from "@model/project";
import { createUser } from "@model/user";
import { makeError, handleError } from "@view/errorView";

export default async function signup(req, res) {
  switch (req.method) {
    case "POST":
      try {
        console.log(req.body);
        const group = await findGroupById({ id: req.body.group_id });
        if (typeof group === "undefined")
          throw makeError({
            message: "Invalid group id.",
            code: 401,
          });

        validateGroupPassword(group, req.body.group_password);

        const createdUser = await createUser(req.body);
        if (typeof createdUser === "undefined")
          throw makeError({
            message: "Username or Email taken",
            code: 409,
          });

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
        handleError(error, res);
      }
      break;

    default:
      res.status(405).end();
      return;
  }
}
