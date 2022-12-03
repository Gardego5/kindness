import getExpandable from "@components/Expandable";
import dataContext from "@context/dataContext";
import { useContext } from "react";
import Timeslot from "./Timeslot";

const Expandable = getExpandable("Day");

const Day = ({ date }) => {
  const { project } = useContext(dataContext);

  return (
    <Expandable title={date.toDateString()} btnbg="pistachio">
      {project?.timeslots?.map((timeslot, idx) => (
        <Timeslot timeslot={timeslot} date={date} key={idx} />
      )) ?? "Loading..."}
    </Expandable>
  );
};

export default Day;
