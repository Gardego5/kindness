import Expandable from "@components/Expandable";
import { localizeDate, oneDay } from "@lib/util/dates";
import { useData } from "hooks/useContexts";
import { useMemo } from "react";
import Day from "./Day";

const Week = ({ date }) => {
  const { visits } = useData();

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

  const pips = useMemo(
    () =>
      visits?.findIndex(
        (visit) =>
          localizeDate(visit?.date).toISOString() === date.toISOString() &&
          visit.users.length > 0
      ) > 0
        ? ["var(--md-gray)"]
        : [],
    [date, visits]
  );

  return (
    <Expandable title={title} btnbg="lt-blue" component="Week" pips={pips}>
      {thisWeek.map((day, idx) => (
        <Day date={day} key={idx} />
      ))}
    </Expandable>
  );
};

export default Week;
