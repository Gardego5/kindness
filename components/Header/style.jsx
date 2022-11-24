import styled from "@emotion/styled";

const component = "Header";

const classes = {};

const Root = styled.header`
  width: calc(100% - 2rem);
  padding: 1rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--lt-gray) -20%, var(--white) 120%);
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: var(--link);
  }

  h1 {
    font-size: 1.5rem;
    color: var(--black);
  }

  nav {
    display: flex;
    gap: 1rem;
  }
`;

export { Root, classes };
