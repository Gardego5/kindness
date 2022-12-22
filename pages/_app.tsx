import Layout from "@components/Layout";
import { AlertQueueContextProvider } from "@context/alertContext";
import ComposedProviders from "@context/compose";
import { DataContextProvider } from "@context/dataContext";
import { UserContextProvider } from "@context/userContext";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";
import store from "store";

const MyApp = ({ Component, pageProps }) => (
  <ComposedProviders
    providers={[
      [ReduxProvider, { store }],
      UserContextProvider,
      DataContextProvider,
      AlertQueueContextProvider,
    ]}
  >
    <Head>
      <link rel="icon" href="/public/favicon.ico" />
      <title>Kindness</title>
    </Head>

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ComposedProviders>
);

export default MyApp;
