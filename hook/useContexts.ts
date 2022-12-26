import alertQueueContext from "@context/alertContext";
import { useContext } from "react";

export const useAlertQueue = () => useContext(alertQueueContext);
