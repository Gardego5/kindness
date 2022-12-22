import styled from "@emotion/styled";

const component = "RegisterButton";

const classes = {
  mainButton: `${component}-mainButton`,
};

const Root = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid var(--lt-gray);
  background: var(--white);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: inset 0 -1px 6px -1px var(--lt-gray);
  color: var(--black);

  :hover {
    border: 1px solid var(--md-gray);
  }

  :active {
    box-shadow: none;
  }

  :disabled {
    background: repeating-linear-gradient(
      125deg,
      #eee,
      #eee 3px,
      #fff 5px,
      #fff 8px,
      #eee 10px
    );
    border: 1px solid var(--lt-gray);
    color: var(--md-gray);
    cursor: not-allowed;
  }
`;

export { Root, classes };
