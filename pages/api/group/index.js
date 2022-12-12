import { getLoginSession } from "@lib/auth";
import { createGroup, deleteGroup } from "@model/group";
import { findUser } from "@model/user";
import { handleError, makeError } from "@view/errorView";
import { groupView } from "@view/group";
import { addProjectsToGroup } from "@model/group";

export default async (req, res) => {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user)
      throw makeError({
        message: "Authentication token is invalid, please log in.",
        code: 401,
      });

    if (user.admin)
      throw makeError({
        message: "You must be an administrator.",
        code: 403,
      });

    switch (req.method) {
      case "POST":
        const { name, password, start_date, end_date } = req.body;
        const { project_ids } = req.body;
        console.log({ project_ids });

        const group = await createGroup({
          name,
          password,
          start_date,
          end_date,
        });

        if (typeof project_ids !== "undefined") {
          if (
            !Array.isArray(project_ids) ||
            !project_ids.every((project_id) => Number.isInteger(project_id))
          )
            throw makeError({
              message:
                'The field "project_ids" should be an array of integers.',
              code: 400,
            });

          group.project_ids = await addProjectsToGroup({
            group_id: group.id,
            project_ids,
          });
        }

        res.status(200).send(groupView(group));
        break;

      case "DELETE":
        const { id } = req.body;
        await deleteGroup({ id });

        res.status(204).end();
        break;

      default:
        res.status(405).end();
        return;
    }
  } catch (error) {
    handleError(error, res);
  }
};
