import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { projectSlice } from "@slice/project";
import { sessionSlice } from "@slice/session";

const makeStore = () =>
  configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [projectSlice.name]: projectSlice.reducer,
    },

    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

const store = makeStore();
export default store;
