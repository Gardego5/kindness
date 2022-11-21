import Link from "next/link";

import { Root, classes } from "./style";

const LoginForm = ({ isSignup, errorMessage, onSubmit }) => (
  <Root>
    <form onSubmit={onSubmit}>
      <label>
        <span>Username</span>
        <input type="text" name="username" required />
      </label>

      <label>
        <span>Password</span>
        <input type="password" name="password" required />
      </label>

      {isSignup && (
        <label>
          <span>Repeat password</span>
          <input type="password" name="rpassword" required />
        </label>
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

export default LoginForm;
