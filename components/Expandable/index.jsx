import { useState } from "react";
import { classes, Root } from "./style";

const Expandable = ({ children, title, callback = () => null }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = (event) => {
    setExpanded(!expanded);
    callback(expanded);
  };

  return (
    <Root expanded={expanded}>
      <button onClick={handleClick}>
        <p className={classes.title}>{title}</p>
      </button>

      <div className={classes.hideable}>{children}</div>
    </Root>
  );
};

export default Expandable;
