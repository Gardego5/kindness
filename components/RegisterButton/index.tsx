import { today } from "@lib/util/dates";
import { useAlertQueue, useData } from "@hook/useContexts";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@slice/session";

const { Root, classes } = require("./style");

const RegisterButton = ({ timeslot, date, registered = undefined }) => {
  const user = useSelector(selectUser);
  const { visits, setVisits } = useData();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { addAlert } = useAlertQueue();

  const handleRegister = (signup: boolean) => async (event: Event) => {
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
        const idx = (visits ?? []).findIndex(
          ({ date, timeslot }) =>
            date === visit.date && timeslot === visit.timeslot
        );

        if (idx === -1) setVisits([...(visits ?? []), visit]);
        else
          setVisits([...visits.slice(0, idx), visit, ...visits.slice(idx + 1)]);
      });
  };

  const registerAlert = () => {
    setDisabled(true);
    addAlert({
      content: `
## Thank you!

Thank you for your kindness and loving spirit. As a courtesy to sister Lloyd,
before you come, please give a phone call ahead of time so that she's aware you
plan to visit.

You can contact her at:\n
000 000 0000
`,
      confirm: handleRegister(true),
      cleanup: () => setDisabled(false),
      yes: "Sign Up",
      no: "Cancel",
    });
  };

  const unregisterAlert = () => {
    setDisabled(true);
    addAlert({
      content: `
If you've already contacted her please let her know you will not be able to
visit.

You can contact her at:\n
000 000 0000
`,
      confirm: handleRegister(false),
      cleanup: () => setDisabled(false),
      yes: "I can't make it",
      no: "Cancel",
    });
  };

  const name = useMemo(
    () =>
      `${registered?.first_name} ${registered?.last_name?.substring(0, 1)}.`,
    [registered]
  );

  return (
    <Root
      className={classes.mainButton}
      disabled={
        (registered ? registered?.username !== user.username : false) ||
        disabled ||
        new Date(date) < today()
      }
      onClick={registered ? unregisterAlert : registerAlert}
    >
      {disabled ? "Loading..." : registered ? name : "register"}
    </Root>
  );
};

export default RegisterButton;
