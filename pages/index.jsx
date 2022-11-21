import Router from "next/router";
import { useUser } from "@lib/hooks";
import Layout from "@components/Layout";
import { useEffect } from "react";

const Home = () => {
  const user = useUser();

  useEffect(() => {
    if (!user) Router.push("/login");
  }, [user]);

  return <Layout>You must be logged in!</Layout>;
};

export default Home;
