import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findUser } from "@lib/model/user";
import {
  addSignUp,
  addVisit,
  findSignUpId,
  findVisitId,
  findVisits,
  removeSignUp,
} from "@lib/model/visit";
import makeError from "@lib/view/errorView";
import { visitView } from "@lib/view/visit";

export default async (req, res) => {
  const { date, timeslot, project_id, username } = req.body;

  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user)
      throw makeError({
        message: "Authentication token is invalid, please log in.",
        httpStatusCode: 401,
      });

    if (user.username !== req.body.username)
      throw makeError({
        message: "Not Authorized.",
        httpStatusCode: 401,
      });

    let [perhapsVisit] = await findVisitId({
      date,
      timeslot,
      project_id,
    });

    let [perhapsSignUp] = await findSignUpId({
      date,
      timeslot,
      project_id,
      username,
    });

    console.log("hi1");

    switch (req.method) {
      case "POST":
        if (typeof perhapsVisit === "undefined")
          await addVisit({ date, timeslot, project_id });

        if (typeof perhapsSignUp === "undefined")
          await addSignUp({
            date,
            timeslot,
            project_id,
            username,
          });

        if (typeof perhapsVisit === "undefined")
          [perhapsVisit] = await findVisitId({ date, timeslot, project_id });
        break;

      case "DELETE":
        console.log({ date, timeslot, project_id, username });
        console.log({ perhapsSignUp });
        if (typeof perhapsSignUp !== "undefined")
          await removeSignUp({ date, timeslot, project_id, username });
        break;

      default:
        res.status(405).end();
        return;
    }
    console.log("hi2");

    const [visit] = await findVisits({
      filter: sql`WHERE visits.id = ${perhapsVisit ? perhapsVisit?.id : -1}`,
    });

    res.status(200).send(visitView(visit));
  } catch (error) {
    console.error(error);

    res
      .status(error.httpStatusCode ?? 500)
      .end(error.message ?? "Server Error.");
  }
};
