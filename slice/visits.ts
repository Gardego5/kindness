import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "store";

const SLICE = "visits";

export interface VisitsState {
  status: "loading" | "idle";
  visits?: VisitView[];
  error?: string;
}

const initialState: VisitsState = {
  status: "idle",
};

export const fetchVisits = createAsyncThunk<VisitView[], number, ThunkConfig>(
  `${SLICE}/fetchVisits`,
  (projectId: number, { rejectWithValue }) =>
    fetch(`/api/project/${projectId}/visits/`).then((r) => r.json())
);

export const visitsSlice = createSlice({
  name: SLICE,

  initialState,

  reducers: {
    setVisits(state, action: PayloadAction<VisitView[] | undefined>) {
      state.visits = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchVisits.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    });

    builder.addCase(fetchVisits.fulfilled, (state, { payload }) => {
      state.visits = payload;
      state.status = "idle";
    });

    builder.addCase(fetchVisits.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const { setVisits } = visitsSlice.actions;

export const selectVisitsStatus = (state: AppState) => state[SLICE].status;
export const selectVisits = (state: AppState) => state[SLICE].visits;
export const selectVisitByDateAndTime =
  ({ date, timeslot }: { date: postgresDate; timeslot: string }) =>
  (state: AppState) =>
    state[SLICE].visits.find(
      (visit) =>
        new Date(visit.date) === new Date(date) && visit.timeslot === timeslot
    );

export default visitsSlice;
