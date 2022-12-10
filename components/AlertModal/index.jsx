import { useEffect, useState } from "react";
import { useRemark } from "react-remark";
import { classes, Root } from "./style";

const AlertModal = ({ contentMd, confirmCallback }) => {
  const [content, setContent] = useRemark();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setContent(contentMd);
  }, [contentMd]);

  const handleCancel = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return open ? (
    <Root>
      <div className={classes.container}>
        <div className={classes.modal}>
          <div className={classes.wrapper}>
            <div className={classes.content}>{content}</div>
          </div>

          <div className={classes.confirmation}>
            <button onClick={handleCancel}>
              {confirmCallback ? "Cancel" : "Okay"}
            </button>
            {confirmCallback && <button onClick={handleSubmit}>Submit</button>}
          </div>
        </div>
      </div>
    </Root>
  ) : null;
};

export default AlertModal;
