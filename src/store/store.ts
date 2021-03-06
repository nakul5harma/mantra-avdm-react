import { combineReducers, configureStore } from '@reduxjs/toolkit';

import getDeviceStatusSlice from '../slices/get-device-status.slice';
import getDeviceInfoSlice from '../slices/get-device-info.slice';
import captureFingerprintDataSlice from '../slices/capture-fingerprint-data.slice';

const rootReducer = combineReducers({
  deviceStatus: getDeviceStatusSlice.reducer,
  deviceInfo: getDeviceInfoSlice.reducer,
  fingerprintData: captureFingerprintDataSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
