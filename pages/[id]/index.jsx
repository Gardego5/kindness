import Week from "@components/Expandable/Week";
import quandary from "@lib/quandary";
import { findStartOfWeek, oneDay, today } from "@lib/util/dates";
import { useData } from "hook/useContexts";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const Project = (props) => {
  const { setVisits, setProject } = useData();

  const router = useRouter();

  const weekStarts = useMemo(() => {
    const startOfWeek = findStartOfWeek(today());

    return [-7, 0, 7, 14, 21].map(
      (m) => new Date(startOfWeek.valueOf() + oneDay * m)
    );
  }, [today().toISOString()]);

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
