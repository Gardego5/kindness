import alertQueueContext from "@context/alertContext";
import dataContext from "@context/dataContext";
import userContext from "@context/userContext";
import { useContext } from "react";

export const useAlertQueue = () => useContext(alertQueueContext);

export const useData = () => useContext(dataContext);

export const useUser = () => useContext(userContext);
