import Week from "@components/Expandable/Week";
import quandary from "@lib/quandary";
import { findStartOfWeek, oneDay, today } from "@lib/util/dates";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setProject, setVisits } from "@slice/project";

const Project = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const weekStarts = useMemo(() => {
    const startOfWeek = findStartOfWeek(today());

    return [-7, 0, 7, 14, 21].map(
      (m) => new Date(startOfWeek.valueOf() + oneDay * m)
    );
  }, [today().toISOString()]);

  useEffect(() => {
    if (typeof router.query?.id !== "undefined") {
      quandary(`/api/project/${router.query.id}/visits`, (data) =>
        dispatch(setVisits(data))
      );
      quandary(`/api/project/${router.query.id}`, (data) =>
        dispatch(setProject(data))
      );
    }
  }, [router]);

  return weekStarts
    ? weekStarts.map((date, idx) => <Week date={date} key={idx} />)
    : "Loading...";
};

export default Project;
