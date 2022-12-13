import Expandable from "@components/Expandable";
import { localizeDate } from "@lib/util/dates";
import { useData } from "hooks/useContexts";
import { useMemo } from "react";
import Timeslot from "./Timeslot";

const Day = ({ date }) => {
  const { project, visits } = useData();

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
