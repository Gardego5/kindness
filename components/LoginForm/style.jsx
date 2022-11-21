import styled from "@emotion/styled";

const component = "LoginForm";

const classes = {
  error: `${component}-error`,
  submit: `${component}-submit`,
};

const Root = styled.div`
  max-width: 19rem;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid var(--lt-gray);
  border-radius: 0.25rem;

  form,
  label {
    display: flex;
    flex-flow: column;

    span {
      font-weight: 600;
    }
  }

  input {
    padding: 8px;
    margin: 0.3rem 0 1rem;
    border: 1px solid var(--lt-gray);
    border-radius: 0.25rem;
  }

  .${classes.submit} {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    justify-content: space-between;

    a {
      text-decoration: none;
    }

    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      background: var(--white);
      border: 1px solid var(--lt-gray);
      border-radius: 0.25rem;

      :hover {
        border-color: var(--md-gray);
      }
    }
  }

  .${classes.error} {
    color: var(--error);
    margin: 1rem 0 0;
  }
`;

export { Root, classes };
