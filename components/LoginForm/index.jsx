import Link from "next/link";

import { Root, classes } from "./style";

const LoginForm = ({
  isSignup,
  errorMessage,
  onSubmit,
  groupID,
  groupPassword,
}) => {
  const groupDefined =
    typeof groupID !== "undefined" && typeof groupPassword !== "undefined";

  return (
    <Root>
      <form onSubmit={onSubmit}>
        <label>
          <span>Username</span>
          <input type="text" name="username" required />
        </label>

        {isSignup && (
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
        )}

        <label>
          <span>Password</span>
          <input type="password" name="password" required />
        </label>

        {isSignup && (
          <>
            <label>
              <span>Repeat password</span>
              <input type="password" name="rpassword" required />
            </label>

            <div className={classes.formRow}>
              <label>
                <span>First name</span>
                <input type="text" name="first_name" required />
              </label>

              <label>
                <span>Last name</span>
                <input type="text" name="last_name" required />
              </label>
            </div>

            <label className={groupDefined ? classes.hiddenField : ""}>
              <span>Group ID</span>
              <input
                type="text"
                name="group_id"
                defaultValue={groupID}
                required
              />
            </label>

            <label className={groupDefined ? classes.hiddenField : ""}>
              <span>Group Password</span>
              <input
                type="password"
                name="group_password"
                defaultValue={groupPassword}
                required
              />
            </label>
          </>
        )}

        <div className={classes.submit}>
          {isSignup ? (
            <>
              <Link href="/" legacyBehavior>
                <a>I already have an account</a>
              </Link>
              <button type="submit">Signup</button>
            </>
          ) : (
            <>
              <Link href="/signup" legacyBehavior>
                <a>I don't have an account</a>
              </Link>
              <button type="submit">Login</button>
            </>
          )}
        </div>

        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
      </form>
    </Root>
  );
};

export default LoginForm;
