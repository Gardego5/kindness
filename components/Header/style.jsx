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

  a,
  p {
    text-decoration: none;
    font-weight: 700;
  }

  a {
    color: var(--link);
  }

  svg {
    transform: scale(1.8);
  }

  h1 {
    font-size: 1.5rem;
    color: var(--black);
  }

  nav {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

export { Root, classes };
