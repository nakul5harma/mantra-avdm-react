import { combineReducers, configureStore } from "@reduxjs/toolkit";

import deviceStatusSlice from "../slices/device-status-slice";
import deviceInfoSlice from "../slices/device-info-slice";
import captureDataSlice from "../slices/capture-data-slice";

const rootReducer = combineReducers({
  deviceStatus: deviceStatusSlice.reducer,
  deviceInfo: deviceInfoSlice.reducer,
  captureData: captureDataSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
