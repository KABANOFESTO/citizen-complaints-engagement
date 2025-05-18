// src/lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";

// Temporary dummy reducer just to satisfy Redux
const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer, // Placeholder until real slices are added
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
