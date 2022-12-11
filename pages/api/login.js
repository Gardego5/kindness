import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "@lib/password-local";
import { setLoginSession } from "@lib/auth";
import { handleError } from "view/errorView";

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate("local", req, res);
      const session = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      };

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (error) {
      handleError(error, res);
    }
  });
