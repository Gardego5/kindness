const { default: styled } = require("@emotion/styled");

const component = "Projects";

const classes = {};

const Root = styled.div`
  pre code {
    font-family: "Courier New", "Courier", monospace;
    font-size: 0.8rem;
  }
`;

export { Root, classes };
