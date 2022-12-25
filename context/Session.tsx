import quandary from "@lib/quandary";
import { selectLoggedIn, setSession } from "@slice/session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Session = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);

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
