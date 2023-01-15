import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Root, classes } from "./style";

export interface LoginFormData {
  username?: string;
  email?: string;
  password?: string;
  rpassword?: string;
  first_name?: string;
  last_name?: string;
  group_id?: string;
  group_password?: string;
  recaptcha?: string;
}

export interface LoginFormProps {
  /**
   * This automatically prevents default, and sends the reCAPTCHA token needed
   * to validate the form submission.
   * @param formData The data captured from this form.
   * @param captchaToken This is the token that is recieved from reCAPTCHA. */
  onSubmit(formData: LoginFormData): Promise<void>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  isSignup?: boolean;
  errorMessage?: string;
  groupID?: string;
  groupPassword?: string;
}

const LoginForm = ({
  onSubmit,
  setErrorMessage,
  isSignup = false,
  errorMessage = undefined,
  groupID = undefined,
  groupPassword = undefined,
}: LoginFormProps) => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rpassword, setRpassword] = useState<string>();
  const [first_name, setFirst_name] = useState<string>();
  const [last_name, setLast_name] = useState<string>();
  const [group_id, setGroup_id] = useState<string>();
  const [group_password, setGroup_password] = useState<string>();

  const recaptchaRef = useRef<ReCAPTCHA>();

  useEffect(function () {
    /* If groupID or groupPassword were already set (because they were passed
     * as query params) then set their state the first time the form is
     * rendered. */
    if (groupID) setGroup_id(groupID);
    if (groupPassword) setGroup_password(groupPassword);
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const recaptcha = await recaptchaRef.current.executeAsync();

    if (recaptcha)
      onSubmit({
        username,
        email,
        password,
        rpassword,
        first_name,
        last_name,
        group_id,
        group_password,
        recaptcha,
      });
    else setErrorMessage("Please complete the reCaptcha.");

    recaptchaRef.current.reset();
  }

  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <ReCAPTCHA
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
          ref={recaptchaRef}
        />

        <label>
          <span className={classes.label}>Username</span>
          <input
            type="text"
            name="username"
            required
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </label>

        {isSignup && (
          <label>
            <span className={classes.label}>Email</span>
            <input
              type="email"
              name="email"
              required
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
          </label>
        )}

        <label>
          <span className={classes.label}>Password</span>
          <input
            type="password"
            name="password"
            required
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </label>

        {isSignup && (
          <>
            <label>
              <span className={classes.label}>Repeat password</span>
              <input
                type="password"
                name="rpassword"
                required
                onChange={({ target }) => setRpassword(target.value)}
                value={rpassword}
              />
            </label>

            <div className={classes.formRow}>
              <label>
                <span className={classes.label}>First name</span>
                <input
                  type="text"
                  name="first_name"
                  required
                  onChange={({ target }) => setFirst_name(target.value)}
                  value={first_name}
                />
              </label>

              <label>
                <span className={classes.label}>Last name</span>
                <input
                  type="text"
                  name="last_name"
                  required
                  onChange={({ target }) => setLast_name(target.value)}
                  value={last_name}
                />
              </label>
            </div>

            <label
              className={
                typeof groupID !== "undefined" ? classes.hiddenField : ""
              }
            >
              <span className={classes.label}>Group ID</span>
              <input
                type="text"
                name="group_id"
                required
                defaultValue={groupID}
                onChange={({ target }) => setGroup_id(target.value)}
                value={group_id}
              />
            </label>

            <label
              className={
                typeof groupPassword !== "undefined" ? classes.hiddenField : ""
              }
            >
              <span className={classes.label}>Group Password</span>
              <input
                type="password"
                name="group_password"
                required
                defaultValue={groupPassword}
                onChange={({ target }) => setGroup_password(target.value)}
                value={group_password}
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
