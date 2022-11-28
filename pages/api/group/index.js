import { getLoginSession } from "@lib/auth";
import { createGroup } from "@lib/model/group";
import { findUser } from "@lib/model/user";
import makeError from "@lib/view/errorView";
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
        const [group] = await createGroup(req.body);

        res.status(200).send(groupView(group));
        break;

      case "DELETE":
        break;

      default:
        res.status(405).end();
        return;
    }
  } catch (error) {
    console.error(error);

    res.status(error.code ?? 500).end(error.message ?? "Server Error.");
  }
};
