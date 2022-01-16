import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RD_SERVICE_BASE_URL } from "../configs/rd-service-config";

const XMLParser = require("react-xml-parser");

export const fetchDeviceInfo = createAsyncThunk(
  "deviceInfo/fetch",
  (url: string) =>
    axios
      .request({
        method: "DEVICEINFO" as any,
        url: `${RD_SERVICE_BASE_URL}${url}`,
      })
      .then((response) => response.data)
      .catch((error) => error)
);

const initialState = {
  deviceInfo: { loading: false, data: null, error: false },
};

const deviceInfoSlice = createSlice({
  name: "deviceInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchDeviceInfo.pending.type]: (state, action) => {
      state.deviceInfo = {
        loading: true,
        data: null,
        error: false,
      };
    },
    [fetchDeviceInfo.fulfilled.type]: (state, action) => {
      state.deviceInfo = {
        loading: false,
        data: new XMLParser().parseFromString(action.payload),
        error: false,
      };
    },
    [fetchDeviceInfo.rejected.type]: (state, action) => {
      state.deviceInfo = {
        loading: false,
        data: new XMLParser().parseFromString(action.payload),
        error: true,
      };
    },
  },
});

export default deviceInfoSlice;
