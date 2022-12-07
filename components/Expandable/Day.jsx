import Expandable from "@components/Expandable";
import dataContext from "@context/dataContext";
import { useContext } from "react";
import Timeslot from "./Timeslot";

const Day = ({ date }) => {
  const { project } = useContext(dataContext);

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
