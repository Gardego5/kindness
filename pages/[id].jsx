import quandary from "@lib/quandary";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Project = (props) => {
  const [visits, setVisits] = useState(null);
  const [project, setProject] = useState(null);

  const router = useRouter();

  useEffect(() => console.log({ project, visits }), [project, visits]);

  const dates = useMemo(() => {
    const daysInMonth = (date) => {
      const month = date.getMonth();
      const year = date.getFullYear();
      return Array.from(
        { length: new Date(year, month + 1, 0).getDate() },
        (_, i) => new Date(year, month, i + 1)
      );
    };
    const today = new Date(new Date().toDateString());

    return [today];
  }, []);

  useEffect(() => {
    if (typeof router.query?.id !== "undefined") {
      quandary(`/api/project/${router.query.id}/visits`, setVisits);
      quandary(`/api/project/${router.query.id}`, setProject);
    }
  }, [router]);

  return visits
    ? dates.map((date, idx) => <p key={idx}>{date.toDateString()}</p>)
    : "Loading...";
};

export default Project;
