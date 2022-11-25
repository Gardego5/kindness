import Expandable from "@components/Expandable";
import { oneDay } from "@lib/util/dates";
import { useMemo } from "react";
import Day from "./Day";

const Week = ({ date }) => {
  const { thisWeek, title } = useMemo(() => {
    const thisWeek = Array.from(
      { length: 7 },
      (_, i) => new Date(date.valueOf() + i * oneDay)
    );
    const title = [
      thisWeek[0].toDateString().split(" ").slice(1, 3).join(" "),
      thisWeek[6].toDateString().split(" ").slice(1, 3).join(" "),
    ].join(" - ");

    return { thisWeek, title };
  }, [date]);

  return (
    <Expandable title={title}>
      {thisWeek.map((day, idx) => (
        <Day date={day} key={idx} />
      ))}
    </Expandable>
  );
};

export default Week;
