import Pips from "@components/Pips";
import { useState } from "react";
import useStyles from "./style";

const Expandable = ({
  children,
  title,
  component = "Default",
  pips = [],
  ...restProps
}) => {
  const [expanded, setExpanded] = useState(false);

  const { Root, classes } = useStyles(component);

  const handleClick = (event) => {
    setExpanded(!expanded);
  };

  return (
    <Root {...restProps}>
      <button onClick={handleClick} className={classes.openButton}>
        <p className={classes.title}>{title}</p>
        {pips && <Pips colors={pips} />}
      </button>

      {expanded && <div className={classes.hideable}>{children}</div>}
    </Root>
  );
};

export default Expandable;
