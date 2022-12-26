import quandary from "@lib/quandary";
import { selectLoggedIn, setSession } from "@slice/session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "store";

export const Session = ({ children }) => {
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const loggedIn = useTypedSelector(selectLoggedIn);

  useEffect(() => {
    if (!loggedIn && !["/login", "/signup"].includes(router.pathname))
      quandary("/api/user/me", (fetchedUser) => {
        if (fetchedUser) dispatch(setSession(fetchedUser));
        else router.push("/login");
      });
  }, [loggedIn, router]);

  return children;
};

export default Session;
