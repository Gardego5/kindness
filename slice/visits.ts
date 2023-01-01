import { localizeDate } from "@lib/util/dates";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
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
  (projectId: number, thunkAPI): Promise<VisitView[]> =>
    fetch(`/api/project/${projectId}/visits/`)
      .then((r) => r.json())
      .catch((reason) => thunkAPI.rejectWithValue({ message: reason }))
);

export interface SignUp {
  method: "POST" | "DELETE";
  date: postgresDate;
  timeslot: string;
  project_id: number;
  username: string;
}

export const visitSignup = createAsyncThunk<VisitView, SignUp, ThunkConfig>(
  `${SLICE}/signup`,
  (
    { method, date, timeslot, project_id, username }: SignUp,
    thunkAPI
  ): Promise<VisitView> =>
    fetch("/api/visit/signup/", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        timeslot,
        project_id,
        username,
      }),
    })
      .then((r) => r.json())
      .catch((reason) => thunkAPI.rejectWithValue({ message: String(reason) }))
);

export const visitsSlice = createSlice({
  name: SLICE,

  initialState,

  reducers: {
    setVisits(state, action: PayloadAction<VisitView[]>) {
      state.visits = action.payload;
    },

    setVisit(state, action: PayloadAction<VisitView>) {
      const idx = state.visits.findIndex(
        (visit) =>
          visit.date === action.payload.date &&
          visit.timeslot === action.payload.timeslot
      );

      if (idx === -1) state.visits.push(action.payload);
      else state.visits[idx] = action.payload;
    },
  },

  extraReducers: ({ addCase }: ActionReducerMapBuilder<VisitsState>) => {
    addCase(fetchVisits.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    });

    addCase(visitSignup.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    });

    addCase(fetchVisits.fulfilled, (state, { payload }) => {
      state.visits = payload;
      state.status = "idle";
    });

    addCase(visitSignup.fulfilled, (state, { payload }) => {
      const idx = state.visits.findIndex(
        ({ date, timeslot }) =>
          payload.date === date && payload.timeslot === timeslot
      );

      if (idx === -1) state.visits.push(payload);
      else state.visits[idx] = payload;

      state.status = "idle";
    });

    addCase(fetchVisits.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    addCase(visitSignup.rejected, (state, { payload }) => {
      console.log({ payload });
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const { setVisits, setVisit } = visitsSlice.actions;

export const selectVisitsStatus = (state: AppState) => state[SLICE].status;
export const selectVisits = (state: AppState) => state[SLICE].visits;
export const selectVisitByDateAndTime =
  ({ date, timeslot }: { date: postgresDate; timeslot: string }) =>
  (state: AppState) =>
    state[SLICE].visits?.find(
      (visit) =>
        localizeDate(visit?.date).toDateString() ===
          new Date(date).toDateString() && visit?.timeslot === timeslot
    ) ?? undefined;

export default visitsSlice;
