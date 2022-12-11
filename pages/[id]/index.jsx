import Week from "@components/Expandable/Week";
import quandary from "@lib/quandary";
import { findStartOfWeek, oneDay, today } from "@lib/util/dates";
import { useData } from "hooks/useContexts";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const Project = (props) => {
  const { setVisits, setProject } = useData();

  const router = useRouter();

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
    ? weekStarts.map((date, idx) => <Week date={date} key={idx} />)
    : "Loading...";
};

export default Project;
