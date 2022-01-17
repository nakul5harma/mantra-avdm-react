import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RD_SERVICE_BASE_URL } from '../configs/rd-service.config';
import convertXmlToJson from '../utils/xml-to-json.util';

export const getDeviceStatus = createAsyncThunk('getDeviceStatus/fetch', () =>
  axios
    .request({
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/xml',
      },
      method: 'RDSERVICE' as any,
      url: RD_SERVICE_BASE_URL,
    })
    .then((response) => response.data)
    .catch((error) => error),
);

const initialState = {
  deviceStatus: { loading: false, data: null, error: false },
};

const getDeviceStatusSlice = createSlice({
  name: 'deviceStatus',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getDeviceStatus.pending.type]: (state, action) => {
      state.deviceStatus = {
        loading: true,
        data: null,
        error: false,
      };
    },
    [getDeviceStatus.fulfilled.type]: (state, action) => {
      state.deviceStatus = {
        loading: false,
        data: convertXmlToJson(action.payload),
        error: false,
      };
    },
    [getDeviceStatus.rejected.type]: (state, action) => {
      state.deviceStatus = {
        loading: false,
        data: convertXmlToJson(action.payload),
        error: true,
      };
    },
  },
});

export default getDeviceStatusSlice;
