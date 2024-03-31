import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./contactSlice";

export const store = configureStore({
  reducer: contactReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;
