import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "store";

export interface AlertState {
  alerts: AlertData[];
  queue: AlertEntry[];
}

const initialState: AlertState = {
  alerts: [],
  queue: [],
};

export const alertSlice = createSlice({
  name: "alert",

  initialState,

  reducers: {},
});

const { name: slice } = alertSlice;

export const {} = alertSlice.actions;

export const selectAlerts = (state: AppState) => state[slice].alerts;
export const selectQueue = (state: AppState) => state[slice].queue;

export default alertSlice;
