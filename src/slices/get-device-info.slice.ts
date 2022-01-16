import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RD_SERVICE_BASE_URL } from '../configs/rd-service.config';
import convertXmlToJson from '../utils/xml-to-json.util';

export const getDeviceInfo = createAsyncThunk('getDeviceInfo/fetch', (url: string) =>
  axios
    .request({
      method: 'DEVICEINFO' as any,
      url: `${RD_SERVICE_BASE_URL}${url}`,
    })
    .then((response) => response.data)
    .catch((error) => error),
);

const initialState = {
  deviceInfo: { loading: false, data: null, error: false },
};

const getDeviceInfoSlice = createSlice({
  name: 'deviceInfo',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getDeviceInfo.pending.type]: (state, action) => {
      state.deviceInfo = {
        loading: true,
        data: null,
        error: false,
      };
    },
    [getDeviceInfo.fulfilled.type]: (state, action) => {
      state.deviceInfo = {
        loading: false,
        data: convertXmlToJson(action.payload),
        error: false,
      };
    },
    [getDeviceInfo.rejected.type]: (state, action) => {
      state.deviceInfo = {
        loading: false,
        data: convertXmlToJson(action.payload),
        error: true,
      };
    },
  },
});

export default getDeviceInfoSlice;
