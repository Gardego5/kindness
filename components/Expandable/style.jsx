import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { passedColor } from "@lib/styleUtils";

const getStyles = (component) => {
  const styles = {};
  styles.classes = {
    title: `ListEntry-${component}-title`,
    hideable: `ListEntry-${component}-hideable`,
    openButton: `ListEntry-${component}-openButton`,
  };

  styles.Root = styled.div`
    width: calc(100% - 2rem);
    max-width: 60ch;
    overflow: hidden;
    z-index: 2;

    button.${styles.classes.openButton} {
      z-index: 2;
      font-size: 1rem;
      padding: 0.5rem;
      width: 100%;
      border: 1px solid var(--lt-gray);
      border-radius: 0.5rem;
      background: var(--white);
      cursor: pointer;
      background: ${passedColor("btnbg")};
      box-shadow: inset 0 -1px 5px -1px var(--md-gray);

      .${styles.classes.title} {
        text-align: center;
        color: var(--black);
      }
    }

    .${styles.classes.hideable} {
      ${(props) =>
        props.expanded
          ? css`
              margin-top: var(--small-spacing);
            `
          : css`
              height: 0;
              transform: translateY(-100%);
            `}
      transition: all 180ms ease;
      z-index: -1;
      position: relative;
      display: flex;
      flex-direction: ${({ rowFlex }) => (rowFlex ? "row" : "column")};
      justify-content: ${({ rowFlex }) => (rowFlex ? "center" : "normal")};
      flex-wrap: wrap;
      align-items: center;
      gap: var(--small-spacing);
    }
  `;

  return styles;
};

export default getStyles;
