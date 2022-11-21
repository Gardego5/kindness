import { Head, Html, Main, NextScript } from "next/document";

import Reset from "@styles/reset";
import GlobalStyle from "@styles/global";

const Document = () => (
  <Html>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap"
      />

      <Reset />
      <GlobalStyle />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
