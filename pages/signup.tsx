import { useState } from "react";
import { useRouter } from "next/router";
import LoginForm, { LoginFormData } from "@components/LoginForm";

const Signup = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async ({
    username,
    email,
    password,
    rpassword,
    first_name,
    last_name,
    group_id,
    group_password,
    recaptcha,
  }: LoginFormData) => {
    if (errorMsg) setErrorMsg("");

    const body = {
      username,
      email,
      password,
      first_name,
      last_name,
      group_id,
      group_password,
      recaptcha,
    };

    if (password !== rpassword) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) router.push("/");
      else throw new Error(await res.text());
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  };

  const group_id = Array.isArray(router.query.group_id)
    ? router.query.group_id[0]
    : router.query.group_id;
  const group_password = Array.isArray(router.query.group_password)
    ? router.query.group_password[0]
    : router.query.group_password;

  console.log({ group_id, group_password });

  return (
    <LoginForm
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMsg}
      errorMessage={errorMsg}
      groupID={group_id}
      groupPassword={group_password}
      isSignup
    />
  );
};

export default Signup;
