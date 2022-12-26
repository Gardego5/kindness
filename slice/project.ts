import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "store";

const SLICE = "project";

export interface ProjectState {
  status: "loading" | "idle";
  project?: ProjectView;
  error?: string;
}

const initialState: ProjectState = {
  status: "idle",
};

export const fetchProject = createAsyncThunk<ProjectView, number, ThunkConfig>(
  `${SLICE}/fetchProjects`,
  (projectId: number) =>
    fetch(`/api/project/${projectId}/`).then((r) => r.json())
);

export const projectSlice = createSlice({
  name: SLICE,

  initialState,

  reducers: {
    setProject(state, action: PayloadAction<ProjectView | undefined>) {
      state.project = action.payload;
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<ProjectState>) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    });

    builder.addCase(fetchProject.fulfilled, (state, { payload }) => {
      state.project = payload;
      state.status = "idle";
    });

    builder.addCase(fetchProject.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const { setProject } = projectSlice.actions;

export const selectProjectStatus = (state: AppState) => state[SLICE].status;
export const selectProject = (state: AppState) => state[SLICE].project;

export default projectSlice;
