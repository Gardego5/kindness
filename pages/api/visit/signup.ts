import { getLoginSession } from "@lib/auth";
import sql from "@lib/db";
import { findUser } from "@model/user";
import {
  addSignUp,
  addVisit,
  findSignUpId,
  findVisitId,
  findVisits,
  removeSignUp,
} from "@model/visit";
import { today } from "@lib/util/dates";
import apiErrorHandler from "@lib/apiErrorHandler";
import { visitView } from "@view/visit";
import HTMLClientError, {
  validateQueryParamsExist,
} from "@lib/HTMLResponseStatusCodes/400";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { date, timeslot, project_id, username } = req.body;
    validateQueryParamsExist({ date, timeslot, project_id, username });

    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;
    if (!user) throw new HTMLClientError.NO_AUTH_TOKEN_401();

    if (new Date(date) < today())
      throw new HTMLClientError.CONFLICT_409(
        "You cannot change responses retroactively."
      );

    if (user.username !== req.body.username && !user.is_admin)
      throw new HTMLClientError.UNAUTHORIZED_401();

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
        if (typeof perhapsSignUp !== "undefined")
          await removeSignUp({ date, timeslot, project_id, username });
        break;

      default:
        throw new HTMLClientError.METHOD_NOT_ALLOWED_405();
    }

    const [visit] = await findVisits({
      filter: sql`WHERE visits.id = ${perhapsVisit ? perhapsVisit?.id : -1}`,
    });

    res.status(200).send(visitView(visit));
  } catch (error) {
    apiErrorHandler(error, res);
  }
};
