import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RD_SERVICE_BASE_URL } from "../configs/rd-service-config";

const XMLParser = require("react-xml-parser");

export const captureData = createAsyncThunk(
  "captureData/fetch",
  (url: string) =>
    axios
      .request({
        method: "CAPTURE" as any,
        url: `${RD_SERVICE_BASE_URL}${url}`,
      })
      .then((response) => response.data)
      .catch((error) => error)
);

const initialState = {
  captureData: { loading: false, data: null, error: false },
};

const captureDataSlice = createSlice({
  name: "captureData",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [captureData.pending.type]: (state, action) => {
      state.captureData = {
        loading: true,
        data: null,
        error: false,
      };
    },
    [captureData.fulfilled.type]: (state, action) => {
      state.captureData = {
        loading: false,
        data: new XMLParser().parseFromString(action.payload),
        error: false,
      };
    },
    [captureData.rejected.type]: (state, action) => {
      state.captureData = {
        loading: false,
        data: new XMLParser().parseFromString(action.payload),
        error: true,
      };
    },
  },
});

export default captureDataSlice;
