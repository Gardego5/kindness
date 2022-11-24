import styled from "@emotion/styled";

const component = "ListEntry";

const classes = {
  title: `${component}-title`,
  hideable: `${component}-hideable`,
};

const Root = styled.div`
  width: calc(100% - 2rem);
  max-width: 60ch;
  overflow: hidden;
  z-index: 2;

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
      color: var(--black);
    }
  }

  .${classes.hideable} {
    transform: translateY(${({ expanded }) => (expanded ? 0 : "-100%")});
    height: ${({ expanded }) => (expanded ? "" : 0)};
    padding-top: ${({ expanded }) => (expanded ? "0.5rem" : 0)};
    transition: transform 180ms ease;
    z-index: -1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

export { Root, classes };
