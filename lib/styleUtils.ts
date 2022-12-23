import { DetailedHTMLProps } from "react";

export const passedColor =
  (selector: string, defaultColor = "white") =>
  ({ [selector]: color }: DetailedHTMLProps<any, any>) =>
    color ? `var(--${color})` : defaultColor;
