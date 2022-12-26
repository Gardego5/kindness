import Layout from "@components/Layout";
import { AlertQueueContextProvider } from "@context/alertContext";
import Composer from "@context/Composer";
import Session from "@context/Session";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "store";

const MyApp = ({ Component, pageProps }) => (
  <Composer
    wrappers={[[Provider, { store }], Session, AlertQueueContextProvider]}
  >
    <Head>
      <link rel="icon" href="/public/favicon.ico" />
      <title>Kindness</title>
    </Head>

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Composer>
);

export default MyApp;
