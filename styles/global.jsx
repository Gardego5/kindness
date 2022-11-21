import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      :root {
        &,
        * {
          font-family: Nunito, sans-serif;
        }

        // Colors
        --white: #ffffff;
        --lt-gray: #cccccc;
        --md-gray: #888888;
        --dk-gray: #333333;
        --black: #000000;
        --error: brown;
      }
    `}
  />
);

export default GlobalStyle;
