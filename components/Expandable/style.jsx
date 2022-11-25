import styled from "@emotion/styled";

const component = "ListEntry";

const classes = {
  title: `${component}-title`,
  hideable: `${component}-hideable`,
  openButton: `${component}-openButton`,
};

const Root = styled.div`
  width: calc(100% - 2rem);
  max-width: 60ch;
  overflow: hidden;
  z-index: 2;

  button.${classes.openButton} {
    z-index: 2;
    font-size: 1rem;
    padding: 0.5rem;
    width: 100%;
    border: 1px solid var(--lt-gray);
    border-radius: 0.5rem;
    background: var(--white);
    cursor: pointer;
    /* box-shadow: inset 0 -1px 5px -1px var(--lt-gray); */

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
    flex-direction: ${({ rowFlex }) => (rowFlex ? "row" : "column")};
    justify-content: ${({ rowFlex }) => (rowFlex ? "center" : "normal")};
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
  }
`;

export { Root, classes };
