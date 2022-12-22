import styled from "@emotion/styled";
import { passedColor } from "@lib/styleUtils";
import { useMemo } from "react";

const useStyles = (component: string) =>
  useMemo(() => {
    const classes = {
      title: `ListEntry-${component}-title`,
      hideable: `ListEntry-${component}-hideable`,
      openButton: `ListEntry-${component}-openButton`,
    };

    const Root = styled.div<{ rowFlex?: boolean }>`
      width: calc(100% - 2rem);
      max-width: 60ch;
      overflow: hidden;
      z-index: 2;
      position: relative;

      button.${classes.openButton} {
        z-index: 2;
        font-size: 1rem;
        padding: 0.5rem;
        width: 100%;
        border: 1px solid var(--lt-gray);
        border-radius: 0.5rem;
        background: var(--white);
        cursor: pointer;
        background: ${passedColor("btnbg")};
        box-shadow: inset 0 -1px 6px -1px var(--lt-gray);

        .${classes.title} {
          text-align: center;
          color: var(--black);
        }

        :active {
          box-shadow: none;
        }

        :hover {
          border: 1px solid var(--md-gray);
        }
      }

      .${classes.hideable} {
        margin-top: var(--small-spacing);
        gap: var(--small-spacing);
        z-index: -1;
        position: relative;
        display: flex;
        flex-direction: ${({ rowFlex }) => (rowFlex ? "row" : "column")};
        justify-content: ${({ rowFlex }) => (rowFlex ? "center" : "normal")};
        flex-wrap: wrap;
        align-items: center;
      }
    `;

    return { Root, classes };
  }, [component]);

export default useStyles;
