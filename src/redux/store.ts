import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import fileReducer from "./slices/fileSlice";
import watermarkReducer from "./slices/watermarkSlice";

export const store = configureStore({
  reducer: {
    file: fileReducer,
    watermark: watermarkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
