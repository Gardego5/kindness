import { createUser } from "@lib/model/user";

export default async function signup(req, res) {
  try {
    const createdUser = await createUser(req.body);

    res.status(200).send(createdUser);
  } catch (error) {
    console.error(error);

    res.status(500).end(error.message);
  }
}
