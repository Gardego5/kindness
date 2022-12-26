import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "store";

const SLICE = "session";

const displayName = (user: UserView) =>
  user.first_name.slice(0, 1).toUpperCase() +
  user.first_name.slice(1) +
  " " +
  user.last_name[0].toUpperCase() +
  ".";

export interface SessionState {
  loggedIn: boolean;
  user: UserView;
  name: string;
}

const initialState: SessionState = {
  loggedIn: false,
  user: {
    username: "Loading...",
    first_name: "Loading...",
    last_name: "Loading...",
  },
  name: "Loading...",
};

export const sessionSlice = createSlice({
  name: SLICE,

  initialState,

  reducers: {
    setSession(state, action: PayloadAction<UserView>) {
      state.loggedIn = typeof action.payload !== "undefined";
      state.user = action.payload;
      state.name = state.loggedIn ? displayName(action.payload) : undefined;
    },
  },
});

export const { setSession } = sessionSlice.actions;

export const selectLoggedIn = (state: AppState) => state[SLICE].loggedIn;
export const selectUser = (state: AppState) => state[SLICE].user;
export const selectName = (state: AppState) => state[SLICE].name;

export default sessionSlice;
