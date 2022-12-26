import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { alertSlice } from "@slice/alert";
import { projectSlice } from "@slice/project";
import { sessionSlice } from "@slice/session";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const makeStore = () =>
  configureStore({
    reducer: {
      [alertSlice.name]: alertSlice.reducer,
      [projectSlice.name]: projectSlice.reducer,
      [sessionSlice.name]: sessionSlice.reducer,
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

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

const store = makeStore();
export default store;
