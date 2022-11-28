import Expandable from "@components/Expandable";
import RegisterButton from "@components/RegisterButton";
import dataContext from "@context/dataContext";
import userContext from "@context/userContext";
import { useContext, useMemo } from "react";

const Timeslot = ({ timeslot, date }) => {
  const { visits } = useContext(dataContext);
  const { user } = useContext(userContext);

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
    <Expandable title={timeslot} rowFlex>
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
