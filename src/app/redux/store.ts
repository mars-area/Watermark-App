import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import fileReducer from "./slices/fileSlice";

export const store = configureStore({
  reducer: {
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      // .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
