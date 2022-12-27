import quandary from "@lib/quandary";
import { fetchAlerts, selectAlertsStatus } from "@slice/alert";
import { selectLoggedIn, setSession } from "@slice/session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "store";

export const Session = ({ children }) => {
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const loggedIn = useTypedSelector(selectLoggedIn);
  const alertsStatus = useTypedSelector(selectAlertsStatus);

  useEffect(() => {
    if (!loggedIn && !["/login", "/signup"].includes(router.pathname))
      quandary("/api/user/me", (fetchedUser) => {
        if (fetchedUser) dispatch(setSession(fetchedUser));
        else router.push("/login");
      });

    // TODO: This is temporary ...
    if (alertsStatus === "idle") dispatch(fetchAlerts());
  }, [loggedIn, router]);

  return children;
};

export default Session;
