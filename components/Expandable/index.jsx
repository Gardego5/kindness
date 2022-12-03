import { useMemo, useState } from "react";
import useStyles from "./style";

const Expandable = ({
  children,
  title,
  callback = () => null,
  component = "Default",
  ...restProps
}) => {
  const [expanded, setExpanded] = useState(false);

  const { Root, classes } = useStyles(component);

  const handleClick = (event) => {
    setExpanded(!expanded);
    callback(expanded);
  };

  return (
    <Root {...restProps}>
      <button onClick={handleClick} className={classes.openButton}>
        <p className={classes.title}>{title}</p>
      </button>

      {expanded && <div className={classes.hideable}>{children}</div>}
    </Root>
  );
};

export default Expandable;
