import { FormEvent, useState } from "react";
import LoginForm, { LoginFormData } from "@components/LoginForm";
import { useRouter } from "next/router";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit({
    username,
    password,
    recaptcha,
  }: LoginFormData) {
    if (errorMsg) setErrorMsg("");

    const body = { username, password, recaptcha };

    try {
      const res = await fetch("/api/login", {
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
  }

  return (
    <LoginForm
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMsg}
      errorMessage={errorMsg}
    />
  );
};

export default Login;
