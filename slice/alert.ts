import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from "store";

const SLICE = "alert";

export interface AlertState {
  status: "loading" | "idle";
  alerts?: AlertView[];
  error?: string;
}

const initialState: AlertState = {
  status: "idle",
};

export const fetchAlerts = createAsyncThunk<AlertView[], never, ThunkConfig>(
  `${SLICE}/fetchAlerts`,
  (): Promise<AlertView[]> => fetch(`/api/alert/`).then((r) => r.json())
);

export const alertSlice = createSlice({
  name: "alert",

  initialState,

  reducers: {},

  extraReducers(builder: ActionReducerMapBuilder<AlertState>) {
    builder.addCase(fetchAlerts.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    });

    builder.addCase(fetchAlerts.fulfilled, (state, { payload }) => {
      state.status = "loading";
      state.alerts = payload;
    });

    builder.addCase(fetchAlerts.rejected, (state, { payload }) => {
      state.status = "idle";
      if (payload) state.error = payload.message;
    });
  },
});

export const {} = alertSlice.actions;

export const selectAlertsStatus = (state: AppState) => state[SLICE].status;
export const selectAlerts = (state: AppState) => state[SLICE].alerts;
export const selectAlert =
  ({
    project_id,
    location,
  }: {
    project_id: number;
    location: alertPlacement;
  }) =>
  (state: AppState) =>
    state[SLICE].alerts.find(
      (alert) =>
        alert.location === location && alert.project_ids.includes(project_id)
    );

export default alertSlice;
