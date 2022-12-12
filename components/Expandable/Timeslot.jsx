import Expandable from "@components/Expandable";
import RegisterButton from "@components/RegisterButton";
import { useData, useUser } from "hooks/useContexts";
import { useMemo } from "react";

const Timeslot = ({ timeslot, date }) => {
  const { visits } = useData();
  const { user } = useUser();

  const thisVisit = useMemo(() => {
    return visits?.find(
      (visit) =>
        new Date(
          new Date(visit?.date).valueOf() +
            new Date().getTimezoneOffset() * 60 * 1000
        ).toDateString() === date.toDateString() && visit?.timeslot === timeslot
    );
  }, [visits]);

  return (
    <Expandable title={timeslot} rowFlex btnbg="jasmine" component="Timeslot">
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
