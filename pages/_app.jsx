import Layout from "@components/Layout";
import { AlertQueueContextProvider } from "@context/alertContext";
import compose from "@context/compose";
import { DataContextProvider } from "@context/dataContext";
import { UserContextProvider } from "@context/userContext";
import Head from "next/head";

const Provider = compose(
  UserContextProvider,
  DataContextProvider,
  AlertQueueContextProvider
);

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" herf="/public/favicon.ico" />
        <title>Kindness</title>
      </Head>

      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
