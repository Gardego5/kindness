import Layout from "@components/Layout";
import UserContextProvider from "@context/userContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
