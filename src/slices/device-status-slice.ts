import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RD_SERVICE_BASE_URL } from "../configs/rd-service-config";

export const fetchDeviceStatus = createAsyncThunk("deviceStatus/fetch", () =>
  axios
    .request({
      method: "RDSERVICE" as any,
      url: RD_SERVICE_BASE_URL,
    })
    .then((response) => response.data)
    .catch((error) => error)
);

const initialState = {
  deviceStatus: { loading: false, data: null, error: false },
};

const deviceStatusSlice = createSlice({
  name: "deviceStatus",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchDeviceStatus.pending.type]: (state, action) => {
      state.deviceStatus = {
        loading: true,
        data: null,
        error: false,
      };
    },
    [fetchDeviceStatus.fulfilled.type]: (state, action) => {
      state.deviceStatus = {
        loading: false,
        data: action.payload,
        error: false,
      };
    },
    [fetchDeviceStatus.rejected.type]: (state, action) => {
      state.deviceStatus = {
        loading: false,
        data: action.payload,
        error: true,
      };
    },
  },
});

export default deviceStatusSlice;
