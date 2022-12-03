import { getLoginSession } from "@lib/auth";
import { findUser } from "@lib/model/user";
import makeError from "@lib/view/errorView";
import { userView } from "@lib/view/user";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null;
        if (!user)
          throw makeError({
            message: "Authentication token is invalid, please log in",
            code: 401,
          });

        res.status(200).send(userView(user));
      } catch (error) {
        console.error(error);

        res
          .status(error.code ?? 500)
          .end(error.message ?? "Internal Server Error.");
      }
    default:
      res.status(405).end();
  }
};
