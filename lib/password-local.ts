import Local from "passport-local";
import { findUser, validatePassword } from "@model/user";
import HTMLClientError from "./HTMLResponseStatusCodes/400";

export const localStrategy = new Local.Strategy(
  (username: string, password: string, done) => {
    findUser({ username })
      .then((user) => {
        if (user && validatePassword(user, password)) done(null, user);
        else
          done(
            new HTMLClientError.UNAUTHORIZED_401(
              "Invalid username and password combination."
            )
          );
      })
      .catch((error) => {
        done(error);
      });
  }
);
