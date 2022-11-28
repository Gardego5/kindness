import styled from "@emotion/styled";

const component = "LoginForm";

const classes = {
  error: `${component}-error`,
  submit: `${component}-submit`,
  formRow: `${component}-formRow`,
  hiddenField: `${component}-hiddenField`,
};

const Root = styled.div`
  width: 19rem;
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
      font-size: 0.8rem;
    }
  }

  .${classes.formRow} {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1rem;

    label {
      min-width: 6rem;
      flex-grow: 1;
      flex-basis: 7rem;
    }
  }

  input {
    padding: 8px;
    margin: 0.3rem 0 1rem;
    border: 1px solid var(--lt-gray);
    border-radius: 0.25rem;

    &,
    ::placeholder {
      font-weight: 450;
      font-size: 1rem;
    }
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

  .${classes.hiddenField} {
    display: none;
  }
`;

export { Root, classes };
