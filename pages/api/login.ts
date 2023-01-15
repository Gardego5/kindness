import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "@lib/password-local";
import { setLoginSession } from "@lib/auth";
import apiErrorHandler from "@lib/apiErrorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { validateReCAPTCHA } from "@lib/HTMLResponseStatusCodes/400";

const authenticate = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<DB_User>((resolve, reject) => {
    passport.authenticate(localStrategy, { session: false }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await validateReCAPTCHA(req);

      const user = await authenticate(req, res);

      const session = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      };

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (error) {
      apiErrorHandler(error, res);
    }
  });
