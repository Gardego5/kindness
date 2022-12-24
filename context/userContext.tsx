import quandary from "@lib/quandary";
import { useRouter } from "next/router";
import { createContext, Dispatch, useEffect, useMemo, useState } from "react";

type UserKeys = keyof UserView;

export const userContext = createContext<{
  user: UserView;
  setUser: Dispatch<UserView>;
  name: string;
}>(undefined);
const { Provider } = userContext;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState<UserView>({} as UserView);
  const router = useRouter();
  const userSet = user.first_name && user.last_name && user.username;

  const name = useMemo(
    () =>
      userSet
        ? `${
            user.first_name.slice(0, 1).toUpperCase() + user.first_name.slice(1)
          } ${user.last_name[0].toUpperCase()}.`
        : "unknown - user not set",
    [user]
  );

  useEffect(() => {
    if (!userSet && !["/login", "/signup"].includes(router.pathname))
      quandary("/api/user/me", (fetchedUser) => {
        if (fetchedUser) setUser(fetchedUser);
        else router.push("/login");
      });
  }, [user, router]);

  return <Provider value={{ user, setUser, name }}>{children}</Provider>;
};

export default userContext;
