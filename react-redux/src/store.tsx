import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";

export const Store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
