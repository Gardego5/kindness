import { useState } from "react";
import Router from "next/router";
import { useUser } from "@lib/hooks";
import LoginForm from "@components/LoginForm";
import Layout from "@components/Layout";

const Signup = () => {
  useUser({ redirectTo: "/login", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    if (body.password !== event.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) Router.push("/login");
      else throw new Error(await res.text());
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <Layout>
      <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} isSignup />
    </Layout>
  );
};

export default Signup;
