import DayExpandable from "@components/DayExpandable";
import { oneDay } from "@lib/util/dates";
import { useMemo } from "react";
import { Root } from "./style";

const WeekExpandable = ({ date }) => {
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
    <Root title={title}>
      {thisWeek.map((day, idx) => (
        <DayExpandable date={day} key={idx} />
      ))}
    </Root>
  );
};

export default WeekExpandable;
