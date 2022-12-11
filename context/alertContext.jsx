import AlertModal from "@components/AlertModal";
import { createContext, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

export const alertContext = createContext();
const { Provider } = alertContext;

export const AlertContextProvider = ({ children }) => {
  const [alertQueue, setAlertQueue] = useState([]);
  const [
    {
      alert: { content, confirm, decline, cleanup },
      id: currentAlertId,
    },
    setAlert,
  ] = useState({ alert: {} });
  const [open, setOpen] = useState(false);

  const addAlert = (alert, id = uuid()) =>
    setAlertQueue((currentQueue) => [...currentQueue, { alert, id }]);

  const getAlert = (id) =>
    typeof id !== "undefined" ? alertQueue.find(id) : alertQueue[0];

  const fullCleanup = async (event) => {
    typeof cleanup !== "undefined" && (await cleanup(event));
    const oldAlertId = alertQueue.findIndex(({ id }) => id === currentAlertId);
    setAlertQueue([
      ...alertQueue
        .splice(0, oldAlertId)
        .concat(alertQueue.splice(oldAlertId + 1)),
    ]);
    setAlert({ alert: {} });
  };

  useEffect(() => {
    if (open) return; // don't overwrite existing alerts
    if (alertQueue.length === 0) return; // don't try if there aren't any alerts

    setAlert(getAlert() ?? { alert: {} });
  }, [open, alertQueue]);

  return (
    <Provider value={{ alertQueue, addAlert, getAlert }}>
      <AlertModal
        open={open}
        setOpen={setOpen}
        content={content}
        confirm={confirm}
        decline={decline}
        cleanup={fullCleanup}
      />
      {children}
    </Provider>
  );
};

export default alertContext;
