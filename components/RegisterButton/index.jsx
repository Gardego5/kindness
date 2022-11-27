import dataContext from "@context/dataContext";
import userContext from "@context/userContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const { Root, classes } = require("./style");

const RegisterButton = ({ timeslot, date, registered }) => {
  const { user } = useContext(userContext);
  const { visits, setVisits } = useContext(dataContext);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleRegister = (signup) => async (event) => {
    setDisabled(true);
    fetch("/api/visit/signup", {
      method: signup ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        timeslot,
        project_id: router.query.id,
        username: user.username,
      }),
    })
      .then((res) => (res.status === 200 ? res.json() : false))
      .then((visit) => {
        const idx = visits.findIndex(
          ({ date, timeslot }) =>
            date === visit.date && timeslot === visit.timeslot
        );

        if (idx > 0) setVisits([...visits, visit]);
        else
          setVisits([...visits.slice(0, idx), visit, ...visits.slice(idx + 1)]);

        setDisabled(false);
      });
  };

  const handleUnregister = (event) => {
    console.log("unregister");
  };

  const name = `${registered?.first_name} ${registered?.last_name?.substring(
    0,
    1
  )}.`;

  return (
    <Root>
      <button
        className={classes.mainButton}
        disabled={
          (registered ? registered?.username !== user.username : false) ||
          disabled
        }
        onClick={handleRegister(!registered)}
      >
        {disabled ? "Loading..." : registered ? name : "register"}
      </button>
    </Root>
  );
};
export default RegisterButton;
