import styled from "@emotion/styled";

const component = "Header";

const classes = {};

const Root = styled.header`
  width: calc(100% - 2rem);
  padding: 1rem;
  margin-bottom: 1rem;
  background: linear-gradient(
    to right,
    var(--lt-gray) -300vw,
    var(--white) 100vw
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0 -1px 6px -1px var(--lt-gray);

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
