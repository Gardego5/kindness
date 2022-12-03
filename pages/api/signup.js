import {
  addUserToGroup,
  findGroupById,
  validateGroupPassword,
} from "@lib/model/group";
import { addProjectSignUps } from "@lib/model/project";
import { createUser } from "@lib/model/user";
import makeError from "@lib/view/errorView";

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

        res.status(200).send({ done: true });
      } catch (error) {
        console.error(error);

        res.status(error.code ?? 500).end(error.message ?? "Server Error.");
      }
      break;

    default:
      res.status(405).end();
      return;
  }
}
