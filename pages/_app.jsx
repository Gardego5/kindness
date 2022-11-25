import Layout from "@components/Layout";
import compose from "@context/compose";
import { DataContextProvider } from "@context/dataContext";
import { UserContextProvider } from "@context/userContext";

const Provider = compose([UserContextProvider, DataContextProvider]);

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
