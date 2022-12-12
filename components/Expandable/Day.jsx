import Expandable from "@components/Expandable";
import { useData } from "hooks/useContexts";
import Timeslot from "./Timeslot";

const Day = ({ date }) => {
  const { project } = useData();

  return (
    <Expandable title={date.toDateString()} btnbg="pistachio" component="Day">
      {project?.timeslots?.length
        ? project.timeslots.map((timeslot, idx) => (
            <Timeslot timeslot={timeslot} date={date} key={idx} />
          ))
        : "No entries for this day"}
    </Expandable>
  );
};

export default Day;
