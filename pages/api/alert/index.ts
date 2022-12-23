import { getLoginSession } from "@lib/auth";
import { addAlert } from "@model/alert";
import { findUser } from "@model/user";
import { addAlertGroups, addAlertProjects, addAlertUsers } from "@model/alert";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import handleError from "@view/errorView";
import { NextApiRequest, NextApiResponse } from "next";
import HTMLClientError from "@lib/HTMLResponseStatusCodes/400";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    if (!user.is_admin) throw new HTMLClientError.ADMIN_ROLE_REQUIRED_403();

    switch (req.method) {
      case "POST":
        const { project_ids, group_ids, user_ids } = req.body;
        console.log({ project_ids, group_ids, user_ids });

        const { location, content, start_date, end_date, displays } = req.body;

        const [createdAlert] = await addAlert({
          location,
          content,
          start_date,
          end_date,
          displays,
          creator_id: user.id,
        });

        /* Optionally add "PROJECT_ID" filters */
        if (typeof project_ids !== "undefined") {
          if (
            !Array.isArray(project_ids) ||
            !project_ids.every((project_id) => Number.isInteger(project_id))
          )
            throw new HTMLClientError.BAD_REQUEST_400(
              'The field "project_ids" should be an array of integers.'
            );

          createdAlert.project_ids = await addAlertProjects({
            alert_id: createdAlert.id,
            project_ids,
          });
        }

        /* Optionally add "GROUP_ID" filters */
        if (typeof group_ids !== "undefined") {
          if (
            !Array.isArray(group_ids) ||
            !group_ids.every(
              (group_id) =>
                uuidValidate(group_id) && uuidVersion(group_id) === 4
            )
          )
            throw new HTMLClientError.BAD_REQUEST_400(
              'The field "group_ids" should be an array of v4 uuids.'
            );

          createdAlert.group_ids = (
            await addAlertGroups({
              alert_id: createdAlert.id,
              group_ids,
            })
          ).map(({ group_id }) => group_id);
        }

        /* Optionally add "USER_ID" filters */
        if (typeof user_ids !== "undefined") {
          if (
            !Array.isArray(user_ids) ||
            !group_ids.every((project_id) => Number.isInteger(project_id))
          )
            throw new HTMLClientError.BAD_REQUEST_400(
              'The field "user_ids" should be an array of integers.'
            );

          createdAlert.user_ids = (
            await addAlertUsers({
              alert_id: createdAlert.id,
              user_ids,
            })
          ).map(({ user_id }) => user_id);
        }

        res.status(200).send(createdAlert);
        break;

      default:
        throw new HTMLClientError.METHOD_NOT_ALLOWED_405();
    }
  } catch (error) {
    handleError(error, res);
  }
};
