import alertQueueContext from "@context/alertContext";
import { today } from "@lib/util/dates";
import { selectAlert } from "@slice/alert";
import { selectUser } from "@slice/session";
import { visitSignup } from "@slice/visits";
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

  const alerts = {
    register: useTypedSelector(
      selectAlert({
        project_id: Number(router.query.id),
        location: "timeslot_signup",
      })
    ),
    unregister: useTypedSelector(
      selectAlert({
        project_id: Number(router.query.id),
        location: "timeslot_remove",
      })
    ),
  };

  const triggerChangeRegistration = (register: boolean) => async () => {
    const alert = alerts[register ? "register" : "unregister"];

    setDisabled(true);

    const onConfirm = () =>
      dispatch(
        visitSignup({
          method: register ? "POST" : "DELETE",
          date,
          timeslot,
          project_id: Number(router.query.id),
          username: user.username,
        })
      );

    if (alert)
      addAlert({
        content: alert.content,
        confirm: onConfirm,
        cleanup: () => setDisabled(false),
        yes: alert.yes,
        no: alert.no,
      });
    else {
      await onConfirm();
      setDisabled(false);
    }
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
      onClick={triggerChangeRegistration(!registered)}
    >
      {disabled ? "Loading..." : registered ? name : "register"}
    </Root>
  );
};

export default RegisterButton;
