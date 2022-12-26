import Week from "@components/Expandable/Week";
import { findStartOfWeek, oneDay, today } from "@lib/util/dates";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { fetchVisits } from "@slice/visits";
import { useTypedDispatch } from "store";
import { fetchProject } from "@slice/project";

const Project = () => {
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const weekStarts = useMemo(() => {
    const startOfWeek = findStartOfWeek(today());

    return [-7, 0, 7, 14, 21].map(
      (m) => new Date(startOfWeek.valueOf() + oneDay * m)
    );
  }, [today().toISOString()]);

  useEffect(() => {
    if (typeof router.query?.id !== "undefined") {
      const projectId = Number(router.query.id);

      dispatch(fetchVisits(projectId));
      dispatch(fetchProject(projectId));
    }
  }, [router]);

  return weekStarts
    ? weekStarts.map((date, idx) => <Week date={date} key={idx} />)
    : "Loading...";
};

export default Project;
