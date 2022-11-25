import quandary from "@lib/quandary";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();
const { Provider } = userContext;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const router = useRouter();

  const name =
    user?.first_name && user?.last_name
      ? `${
          user.first_name.slice(0, 1).toUpperCase() + user.first_name.slice(1)
        } ${user.last_name[0].toUpperCase()}.`
      : null;

  useEffect(() => {
    if (!user && !["/login", "/signup"].includes(router.pathname))
      quandary("/api/user/me", (fetchedUser) => {
        if (fetchedUser) setUser(fetchedUser);
        else router.push("/login");
      });
  }, [user, router]);

  return <Provider value={{ user, setUser, name }}>{children}</Provider>;
};

export default userContext;
