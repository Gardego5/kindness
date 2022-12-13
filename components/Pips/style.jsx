import { css } from "@emotion/react";
import styled from "@emotion/styled";

const component = "Pips";

const classes = {};

const Root = styled.div`
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
`;

const Pip = styled.div`
  width: 0.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  ${({ color }) =>
    css`
      background-color: ${color};
    `}
`;

export { Root, Pip, classes };
