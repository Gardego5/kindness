import Expandable from "@components/Expandable";
import { localizeDate } from "@lib/util/dates";
import { useMemo } from "react";
import Timeslot from "./Timeslot";
import { selectProject, selectVisits } from "@slice/project";
import { useTypedSelector } from "store";

const Day = ({ date }) => {
  const project = useTypedSelector(selectProject);
  const visits = useTypedSelector(selectVisits);

  const pips = useMemo(
    () =>
      visits?.findIndex(
        (visit) =>
          localizeDate(visit?.date).toDateString() === date.toDateString() &&
          visit.users.length > 0
      ) !== -1
        ? ["var(--md-gray)"]
        : [],
    [visits, date]
  );

  return (
    <Expandable
      title={date.toDateString()}
      btnbg="pistachio"
      component="Day"
      pips={pips}
    >
      {project?.timeslots?.length
        ? project.timeslots.map((timeslot, idx) => (
            <Timeslot timeslot={timeslot} date={date} key={idx} />
          ))
        : "No entries for this day"}
    </Expandable>
  );
};

export default Day;
