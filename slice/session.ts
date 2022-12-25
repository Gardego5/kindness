import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "store";

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
  name: "session",

  initialState,

  reducers: {
    setSession(state, action: PayloadAction<UserView>) {
      state.loggedIn = typeof action.payload !== "undefined";
      state.user = action.payload;
      state.name = state.loggedIn ? displayName(action.payload) : undefined;
    },
  },
});

const { name: slice } = sessionSlice;

export const { setSession } = sessionSlice.actions;

export const selectLoggedIn = (state: AppState) => state[slice].loggedIn;
export const selectUser = (state: AppState) => state[slice].user;
export const selectName = (state: AppState) => state[slice].name;
