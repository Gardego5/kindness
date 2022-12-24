import { Root, Pip } from "./style";

const Pips = ({ colors }) => (
  <Root>
    {colors.map((color, idx) => (
      <Pip key={idx} color={color} />
    ))}
  </Root>
);

export default Pips;
