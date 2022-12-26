import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "store";

export interface ProjectState {
  project?: ProjectView;
  visits?: VisitView[];
}

const initialState: ProjectState = {};

export const projectSlice = createSlice({
  name: "project",

  initialState,

  reducers: {
    setProject(state, action: PayloadAction<ProjectView | null>) {
      state.project = action.payload;
    },

    setVisits(state, action: PayloadAction<VisitView[] | null>) {
      state.visits = action.payload;
    },
  },
});

const { name: slice } = projectSlice;

export const { setProject, setVisits } = projectSlice.actions;

export const selectProject = (state: AppState) => state[slice].project;
export const selectVisits = (state: AppState) => state[slice].visits;
export const selectVisitByDateAndTime =
  ({ date, timeslot }: { date: postgresDate; timeslot: string }) =>
  (state: AppState) =>
    state[slice].visits.find(
      (visit) =>
        new Date(visit.date) === new Date(date) && visit.timeslot === timeslot
    );
