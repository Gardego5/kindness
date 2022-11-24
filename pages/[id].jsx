import WeekExpandable from "@components/WeekExpandable";
import quandary from "@lib/quandary";
import { findStartOfWeek, oneDay, today } from "@lib/util/dates";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Project = (props) => {
  const [visits, setVisits] = useState(null);
  const [project, setProject] = useState(null);

  const router = useRouter();

  useEffect(() => console.log({ project, visits }), [project, visits]);

  const weekStarts = useMemo(() => {
    const startOfWeek = findStartOfWeek(today());

    return [-14, -7, 0, 7, 14].map(
      (m) => new Date(startOfWeek.valueOf() + oneDay * m)
    );
  }, []);

  useEffect(() => {
    if (typeof router.query?.id !== "undefined") {
      quandary(`/api/project/${router.query.id}/visits`, setVisits);
      quandary(`/api/project/${router.query.id}`, setProject);
    }
  }, [router]);

  return weekStarts
    ? weekStarts.map((date, idx) => <WeekExpandable date={date} key={idx} />)
    : "Loading...";
};

export default Project;
