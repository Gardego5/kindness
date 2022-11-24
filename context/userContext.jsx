import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();
const { Provider } = userContext;

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const router = useRouter();

  const name =
    user?.first_name && user?.last_name
      ? `${
          user.first_name.slice(0, 1).toUpperCase() + user.first_name.slice(1)
        } ${user.last_name.slice(0, 1).toUpperCase()}.`
      : null;

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

  return <Provider value={{ user, setUser, name }}>{children}</Provider>;
};

export default UserContextProvider;
