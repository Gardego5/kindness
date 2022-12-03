import styled from "@emotion/styled";

const component = "ProjectDisplay";

const classes = {
  primaryLink: `${component}-primaryLink`,
};

const Root = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--lt-gray);
  color: var(--dk-gray);
  width: 100%;
  max-width: 60ch;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);

  a {
    color: var(--link);
    text-decoration: none;
  }

  .${classes.primaryLink} {
    grid-column: 1 / span 2;
  }
`;

export { Root, classes };
