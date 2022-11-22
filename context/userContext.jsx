import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();
const { Provider } = userContext;

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user && !["/login", "/signup"].includes(router.pathname))
      (async () => {
        const fetchedUser = await fetch("/api/user")
          .then((res) => (res.status === 200 ? res.json() : null))
          .then((data) => data?.user || null);

        if (fetchedUser) setUser(fetchedUser);
        else router.push("/login");
      })();
  }, [user, router]);

  return <Provider value={{ user, setUser }}>{children}</Provider>;
};

export default UserContextProvider;
