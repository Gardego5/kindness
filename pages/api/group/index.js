import { getLoginSession } from "@lib/auth";
import { createGroup, deleteGroup } from "@lib/model/group";
import { findUser } from "@lib/model/user";
import { handleError, makeError } from "@lib/view/errorView";
import { groupView } from "@lib/view/group";

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
        const group = await createGroup({
          name,
          password,
          start_date,
          end_date,
        });

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
