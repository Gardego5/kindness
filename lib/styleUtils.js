export const passedColor =
  (selector, defaultColor = "white") =>
  ({ [selector]: color }) =>
    color ? `var(--${color})` : defaultColor;
