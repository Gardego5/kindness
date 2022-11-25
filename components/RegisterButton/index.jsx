import userContext from "@context/userContext";
import { useContext } from "react";

const { Root, classes } = require("./style");

const RegisterButton = ({ timeslot, date, registered }) => {
  const { user } = useContext(userContext);

  return (
    <Root>
      <button
        className={classes.mainButton}
        disabled={registered ? registered?.username !== user.username : false}
      >
        {registered
          ? `${registered.first_name} ${registered.last_name[0]}.`
          : "register"}
      </button>
    </Root>
  );
};
export default RegisterButton;
