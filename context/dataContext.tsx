import { useRouter } from "next/router";
import { createContext, Dispatch, useEffect, useState } from "react";

export const dataContext = createContext<{
  visits?: VisitView[];
  setVisits: Dispatch<VisitView[]>;
  project?: any;
  setProject: Dispatch<any>;
}>(undefined);
const { Provider } = dataContext;

export const DataContextProvider = ({ children }) => {
  const [visits, setVisits] = useState(null);
  const [project, setProject] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setVisits(null);
    setProject(null);
  }, [router]);

  useEffect(() => {
    console.log({ visits, project });
  }, [visits, project]);

  return (
    <Provider value={{ visits, setVisits, project, setProject }}>
      {children}
    </Provider>
  );
};

export default dataContext;
