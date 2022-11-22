import { getLoginSession } from "@lib/auth";
import { findUser } from "@lib/user";
import { userView } from "@lib/views";

export default async function getUser(req, res) {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;

    res.status(200).send(userView(user));
  } catch (error) {
    console.error(error);

    res.status(401).end("Authentication token is invalid, please log in");
  }
}
