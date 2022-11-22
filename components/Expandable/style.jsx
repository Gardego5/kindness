import styled from "@emotion/styled";

const component = "ListEntry";

const classes = {
  title: `${component}-title`,
  hideable: `${component}-hideable`,
};

const Root = styled.div`
  width: calc(100% - 4rem);
  max-width: 60ch;
  overflow: hidden;

  button {
    z-index: 2;
    font-size: 1rem;
    padding: 0.5rem;
    width: 100%;
    border: 1px solid var(--lt-gray);
    border-radius: 0.25rem;
    background: var(--white);
    cursor: pointer;

    .${classes.title} {
      text-align: center;
    }
  }

  .${classes.hideable} {
    transform: translateY(${({ expanded }) => (expanded ? 0 : "-100%")});
    height: ${({ expanded }) => (expanded ? "" : 0)};
    transition: transform 150ms ease;
    z-index: -1;
    position: relative;
  }
`;

export { Root, classes };
