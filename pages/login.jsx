import { useContext, useState } from "react";
import LoginForm from "@components/LoginForm";
import userContext from "@context/userContext";
import { useRouter } from "next/router";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(userContext);
  const router = useRouter();

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

      if (res.status === 200) router.push("/");
      else throw new Error(await res.text());
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  };

  return <LoginForm onSubmit={handleSubmit} errorMessage={errorMsg} />;
};

export default Login;
