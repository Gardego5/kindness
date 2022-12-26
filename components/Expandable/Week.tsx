import Expandable from "@components/Expandable";
import { localizeDate, oneDay } from "@lib/util/dates";
import { useMemo } from "react";
import Day from "./Day";
import { useSelector } from "react-redux";
import { selectVisits } from "@slice/project";

const Week = ({ date }) => {
  const visits = useSelector(selectVisits);

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
      visits
        ? visits.findIndex(
            (visit) =>
              thisWeek
                .map((d) => d.toDateString())
                .includes(localizeDate(visit?.date).toDateString()) &&
              visit.users.length > 0
          ) !== -1
          ? ["var(--md-gray)"]
          : []
        : [],
    [thisWeek, visits]
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
