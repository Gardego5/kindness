import { getLoginSession } from "@lib/auth";
import { addAlert } from "@model/alert";
import { findUser } from "@model/user";
import { addAlertGroups, addAlertProjects, addAlertUsers } from "@model/alert";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { handleError, makeError } from "@view/errorView";

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
            throw makeError({
              message:
                'The field "project_ids" should be an array of integers.',
              code: 400,
            });

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
            throw makeError({
              message: 'The field "group_ids" should be an array of v4 uuids.',
              code: 400,
            });

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
            throw makeError({
              message: 'The field "user_ids" should be an array of integers.',
              code: 400,
            });

          createdAlert.user_ids = (
            await addAlertUsers({
              alert_id: createdAlert.id,
              user_ids,
            })
          ).map(({ user_id }) => user_id);
        }

        res.status(200).send(createdAlert);
        break;

      case "GET":
        break;

      default:
        res.status(405).end();
        return;
    }
  } catch (error) {
    handleError(error, res);
  }
};
