import { useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "@components/LoginForm";

const Signup = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: event.currentTarget.username.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      first_name: event.currentTarget.first_name.value,
      last_name: event.currentTarget.last_name.value,
      group_id: event.currentTarget.group_id.value,
      group_password: event.currentTarget.group_password.value,
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

      if (res.status === 200) router.push("/login");
      else throw new Error(await res.text());
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <LoginForm
      errorMessage={errorMsg}
      onSubmit={handleSubmit}
      groupID={router.query.group_id}
      groupPassword={router.query.group_password}
      isSignup
    />
  );
};

export default Signup;
