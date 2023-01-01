import alertQueueContext from "@context/alertContext";
import { today } from "@lib/util/dates";
import { selectUser } from "@slice/session";
import { setVisit, visitSignup } from "@slice/visits";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "store";
import { classes, Root } from "./style";

const RegisterButton = ({
  timeslot,
  date,
  registered = undefined,
}: {
  timeslot: string;
  date: postgresDate;
  registered?: UserView;
}) => {
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const [disabled, setDisabled] = useState(false);
  const { addAlert } = useContext(alertQueueContext);

  const user = useTypedSelector(selectUser);

  const registerAlert = () => {
    setDisabled(true);
    addAlert({
      content: `
## Thank you!

Thank you for your kindness and loving spirit. As a courtesy to sister Lloyd,
before you come, please give a phone call ahead of time so that she's aware you
plan to visit.

You can contact her at:

000 000 0000
`,
      confirm: () =>
        dispatch(
          visitSignup({
            method: "POST",
            date,
            timeslot,
            project_id: Number(router.query.id),
            username: user.username,
          })
        ),
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

You can contact her at:

000 000 0000
`,
      confirm: () =>
        dispatch(
          visitSignup({
            method: "DELETE",
            date,
            timeslot,
            project_id: Number(router.query.id),
            username: user.username,
          })
        ),
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
