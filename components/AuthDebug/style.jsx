const { default: styled } = require("@emotion/styled");

const component = "AuthDebug";

const classes = {
  userInfo: `${component}-userInfoTable`,
};

const Root = styled.div`
  pre code {
    font-family: "Courier New", "Courier", monospace;
    font-size: 0.8rem;
  }

  table.${classes.userInfo} {
    th,
    td {
      padding: 0.125rem 0.25rem;
    }

    td {
      :nth-child(1) {
        text-align: right;
        border-right: 1px solid var(--md-gray);
      }

      :nth-child(2) {
      }
    }
  }
`;

export { Root, classes };
