import { getLoginSession } from "@lib/auth";
import { addAlert } from "@model/alert";
import { findUser } from "@model/user";
import { handleError, makeError } from "view/errorView";

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

        if (typeof project_ids !== "undefined");

        const { location, content, start_date, end_date, displays } = req.body;

        const createdAlert = await addAlert({
          location,
          content,
          start_date,
          end_date,
          displays,
          creator_id: user.id,
        });

        res.status(200).send(createdAlert);
        break;

      default:
        res.status(405).end();
        return;
    }
  } catch (error) {
    handleError(error, res);
  }
};
