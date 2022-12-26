import Expandable from "@components/Expandable";
import RegisterButton from "@components/RegisterButton";
import { localizeDate } from "@lib/util/dates";
import { useMemo } from "react";
import { selectUser } from "@slice/session";
import { selectVisitByDateAndTime, selectVisits } from "@slice/visits";
import { useTypedSelector } from "store";

const Timeslot = ({ timeslot, date }) => {
  const visits = useTypedSelector(selectVisits);
  const user = useTypedSelector(selectUser);

  const _thisVisit = useMemo(() => {
    return visits?.find(
      (visit) =>
        localizeDate(visit?.date).toDateString() === date.toDateString() &&
        visit?.timeslot === timeslot
    );
  }, [visits]);

  const thisVisit = useTypedSelector(
    selectVisitByDateAndTime({ date, timeslot })
  );
  console.log(thisVisit);

  const pips = useMemo(
    () => (thisVisit?.users.length > 0 ? ["var(--md-gray)"] : []),
    [thisVisit]
  );

  return (
    <Expandable
      title={timeslot}
      rowFlex
      btnbg="jasmine"
      component="Timeslot"
      pips={pips}
    >
      {thisVisit?.users.map(
        (registeredUser, idx) =>
          registeredUser?.username && (
            <RegisterButton
              timeslot={timeslot}
              date={date}
              registered={registeredUser}
              key={idx}
            />
          )
      )}

      {(thisVisit?.users.findIndex(
        ({ username }) => username === user?.username
      ) === -1 ||
        typeof thisVisit === "undefined") && (
        <RegisterButton timeslot={timeslot} date={date} />
      )}
    </Expandable>
  );
};

export default Timeslot;
