import { getLoginSession } from "@lib/auth";
import { findUser } from "@lib/model/user";
import { userView } from "@lib/view/user";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null;

        res.status(200).send(userView(user));
      } catch (error) {
        console.error(error);

        res.status(401).end("Authentication token is invalid, please log in");
      }
    default:
      res.status(405).end();
  }
};
