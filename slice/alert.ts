import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { actions, reducer: alertReducer } = createSlice({
  name: "alert",

  initialState: {
    login: [],
    project: [],
    timeslot_signup: [],
    timeslot_remove: [],
  },

  reducers: {
    addLoginAlert: (store, action: PayloadAction<number>) => {
      console.log({ store });
      store.login = [...store.login, action.payload];
    },
  },
});

export const { addLoginAlert } = actions;

export default alertReducer;
