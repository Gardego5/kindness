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
        --link: #23766d;

        --lt-blue: #d1e9f0;
        --jasmine: #ffecad;
        --pistachio: #c6e6b3;

        // Dimensions
        --small-spacing: 0.65rem;
      }
    `}
  />
);

export default GlobalStyle;
