import { useState } from "react";
import Router from "next/router";
import { useUser } from "@lib/hooks";
import LoginForm from "@components/LoginForm";
import Layout from "@components/Layout";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) Router.push("/");
      else throw new Error(await res.text());
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <Layout>
      <LoginForm onSubmit={handleSubmit} errorMessage={errorMsg} />
    </Layout>
  );
};

export default Login;
