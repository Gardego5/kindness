import apiErrorHandler from "@lib/apiErrorHandler";
import { getLoginSession } from "@lib/auth";
import HTMLClientError, {
  validateQueryParamsExist,
} from "@lib/HTMLResponseStatusCodes/400";
import {
  addAlert,
  addAlertGroups,
  addAlertProjects,
  addAlertUsers,
  findUserAlerts,
} from "@model/alert";
import { findUser } from "@model/user";
import { NextApiRequest, NextApiResponse } from "next";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

const alertPlacement = {
  login: "login",
  project: "project",
  timeslot_signup: "timeslot_signup",
  timeslot_remove: "timeslot_remove",
} as const;

/**
 * To POST, you must be an admin user.
 * ```
 * POST `/api/alert/` {
 *    // Alert Object
 *    location: "login" | "project" | "timeslot_signup" | "timeslot_remove";
 *    content: string;
 *    start_date: postgresDate;
 *    end_date: postgresDate;
 *    displays: number;
 *    yes: string;
 *    no: string;
 *
 *    // Join tables, used to control who this alert is displayed to.
 *    project_ids: number[];
 *    group_ids: string[];
 *    user_ids: number[];
 * }
 * ```
 * ```
 * GET `/api/alert/` -> {
 *
 * }
 * ```
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    if (!user.is_admin) throw new HTMLClientError.ADMIN_ROLE_REQUIRED_403();

    switch (req.method) {
      case "POST":
        const { project_ids, group_ids, user_ids } = req.body;

        const { location, content, start_date, end_date, displays, yes, no } =
          req.body;
        validateQueryParamsExist({ location, content });
        if (!Object.keys(alertPlacement).includes(location))
          throw new HTMLClientError.BAD_REQUEST_400(
            `Bad Request: You must provide a "location" field that is one of: ` +
              `"login", "project", "timeslot_signup", or "timeslot_remove".`
          );

        interface CreatedAlert extends DB_Alert {
          project_ids?: number[];
          group_ids?: string[];
          user_ids?: number[];
        }

        const createdAlert: CreatedAlert = await addAlert({
          location,
          content,
          start_date,
          end_date,
          displays,
          yes,
          no,
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

          createdAlert.group_ids = await addAlertGroups({
            alert_id: createdAlert.id,
            group_ids,
          });
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

          createdAlert.user_ids = await addAlertUsers({
            alert_id: createdAlert.id,
            user_ids,
          });
        }

        res.status(200).send(createdAlert);
        break;

      case "GET":
        const alerts: AlertView[] = await findUserAlerts(user);

        res.status(200).send(alerts);
        break;

      default:
        throw new HTMLClientError.METHOD_NOT_ALLOWED_405();
    }
  } catch (error) {
    apiErrorHandler(error, res);
  }
};
