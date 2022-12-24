import { getLoginSession } from "@lib/auth";
import { createGroup, deleteGroup } from "@model/group";
import { findUser } from "@model/user";
import apiErrorHandler from "@lib/apiErrorHandler";
import { groupView } from "@view/group";
import { addProjectsToGroup } from "@model/group";
import { NextApiRequest, NextApiResponse } from "next";
import HTMLClientError, {
  validateQueryParamsExist,
} from "@lib/HTMLResponseStatusCodes/400";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    if (!user.is_admin) throw new HTMLClientError.ADMIN_ROLE_REQUIRED_403();

    switch (req.method) {
      case "POST":
        const { name, password, start_date, end_date, project_ids } = req.body;
        validateQueryParamsExist({ password });

        const group: GroupView = await createGroup({
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
            throw new HTMLClientError.BAD_REQUEST_400(
              'The field "project_ids" should be an array of integers.'
            );

          group.project_ids = (
            await addProjectsToGroup({
              group_id: group.id,
              project_ids,
            })
          ).map(({ project_id }) => project_id);
        }

        res.status(200).send(groupView(group));
        break;

      case "DELETE":
        const { id } = req.body;
        validateQueryParamsExist({ id });

        await deleteGroup({ id });

        res.status(204).end();
        break;

      default:
        throw new HTMLClientError.METHOD_NOT_ALLOWED_405();
    }
  } catch (error) {
    apiErrorHandler(error, res);
  }
};
