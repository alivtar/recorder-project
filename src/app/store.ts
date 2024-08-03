import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recorderReducer from "../features/Recorder/recorderSlice";

const rootReducer = combineReducers({
  recorderData: recorderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `TRootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
