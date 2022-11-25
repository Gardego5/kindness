import styled from "@emotion/styled";

const component = "RegisterButton";

const classes = {
  mainButton: `${component}-mainButton`,
};

const Root = styled.span`
  font-style: italic;

  button.${classes.mainButton} {
    padding: 0;
  }
`;

export { Root, classes };
