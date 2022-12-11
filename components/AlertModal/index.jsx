import { useEffect, useState } from "react";
import { useRemark } from "react-remark";
import { classes, Root } from "./style";

const AlertModal = ({ open, setOpen, content, confirm, decline, cleanup }) => {
  const [parsedContent, setParsedContent] = useRemark();

  useEffect(() => {
    if (typeof content === "undefined") return;

    setOpen(true);
    setParsedContent(content);
  }, [content]);

  const handleCancel = async (event) => {
    event.preventDefault();
    typeof decline !== "undefined" && (await decline(event));
    typeof cleanup !== "undefined" && (await cleanup(event));
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    typeof confirm !== "undefined" && (await confirm(event));
    typeof cleanup !== "undefined" && (await cleanup(event));
    setOpen(false);
  };

  return open ? (
    <Root>
      <div className={classes.container}>
        <div className={classes.modal}>
          <div className={classes.wrapper}>
            <div className={classes.content}>{parsedContent}</div>
          </div>

          <div className={classes.confirmation}>
            <button onClick={handleCancel}>
              {confirm ? "Cancel" : "Okay"}
            </button>
            {confirm && <button onClick={handleSubmit}>Okay</button>}
          </div>
        </div>
      </div>
    </Root>
  ) : null;
};

export default AlertModal;
