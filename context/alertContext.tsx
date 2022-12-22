import AlertModal from "@components/AlertModal";
import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const noAlert = { alert: {}, id: "" };

export const alertQueueContext = createContext<{
  addAlert: (alert: AlertMessage, id?: string) => void;
  getAlert: (id?: string) => AlertEntry;
}>(undefined);

const { Provider } = alertQueueContext;

export const AlertQueueContextProvider = ({ children }) => {
  const [alertQueue, setAlertQueue] = useState<AlertEntry[]>([]);
  const [
    {
      alert: { content, confirm, decline, cleanup, yes, no },
      id: currentAlertId,
    },
    setAlert,
  ] = useState<AlertEntry>(noAlert);
  const [open, setOpen] = useState(false);

  const addAlert = (alert: AlertMessage, id = uuid()) =>
    setAlertQueue((currentQueue) => [...currentQueue, { alert, id }]);

  const getAlert = (id?: string) =>
    typeof id !== "undefined"
      ? alertQueue.find((alert) => alert.id === id)
      : alertQueue[0];

  const fullCleanup = async (event: Event) => {
    typeof cleanup !== "undefined" && (await cleanup(event));
    const oldAlertId = alertQueue.findIndex(({ id }) => id === currentAlertId);
    setAlertQueue([
      ...alertQueue
        .splice(0, oldAlertId)
        .concat(alertQueue.splice(oldAlertId + 1)),
    ]);
    setAlert(noAlert);
  };

  useEffect(() => {
    if (open) return; // don't overwrite existing alerts
    if (alertQueue.length === 0) return; // don't try if there aren't any alerts

    setAlert(getAlert());
  }, [open, alertQueue]);

  return (
    <Provider value={{ addAlert, getAlert }}>
      <AlertModal
        open={open}
        setOpen={setOpen}
        content={content}
        confirm={confirm}
        decline={decline}
        cleanup={fullCleanup}
        yes={yes}
        no={no}
      />
      {children}
    </Provider>
  );
};

export default alertQueueContext;
