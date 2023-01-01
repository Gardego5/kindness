import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import alertSlice from "@slice/alert";
import projectSlice from "@slice/project";
import sessionSlice from "@slice/session";
import visitsSlice from "@slice/visits";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    [alertSlice.name]: alertSlice.reducer,
    [projectSlice.name]: projectSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [visitsSlice.name]: visitsSlice.reducer,
  },

  devTools: true,
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useTypedDispatch = useDispatch<AppDispatch>;

export default store;
