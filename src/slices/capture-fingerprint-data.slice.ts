import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PID_OPTIONS, RD_SERVICE_BASE_URL } from '../configs/rd-service.config';
import getSHA256EncryptedBase64Wadh from '../utils/capture-fingerprint-data.util';
import convertXmlToJson from '../utils/xml-to-json.util';

export const captureFingerprintData = createAsyncThunk(
  'captureFingerprintData/fetch',
  (url: string) =>
    axios
      .request({
        headers: {
          'Content-Type': 'application/xml',
          'Accept': 'application/xml',
        },
        method: 'CAPTURE' as any,
        url: `${RD_SERVICE_BASE_URL}${url}`,
        data: `<?xml version="1.0"?>
        <PID_OPTIONS ver="1.0">
            <Opts fCount="${PID_OPTIONS.fCount}" fType="${PID_OPTIONS.fType}" iCount="${
          PID_OPTIONS.iCount
        }" pCount="${PID_OPTIONS.pCount}" format="${PID_OPTIONS.format}" pidVer="${
          PID_OPTIONS.pidVer
        }" timeout="${PID_OPTIONS.timeout}" posh="${PID_OPTIONS.posh}" env="${
          PID_OPTIONS.env
        }" wadh="${getSHA256EncryptedBase64Wadh(PID_OPTIONS.wadh)}"/>
            <CustOpts>
                <Param name="mantrakey" value="undefined" />
            </CustOpts>
        </PID_OPTIONS>`,
      })
      .then((response) => response.data)
      .catch((error) => error),
);

const initialState = {
  fingerprintData: { loading: false, data: null, error: false },
};

const captureFingerprintDataSlice = createSlice({
  name: 'fingerprintData',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [captureFingerprintData.pending.type]: (state, action) => {
      state.fingerprintData = {
        loading: true,
        data: null,
        error: false,
      };
    },
    [captureFingerprintData.fulfilled.type]: (state, action) => {
      state.fingerprintData = {
        loading: false,
        data: convertXmlToJson(action.payload),
        error: false,
      };
    },
    [captureFingerprintData.rejected.type]: (state, action) => {
      state.fingerprintData = {
        loading: false,
        data: convertXmlToJson(action.payload),
        error: true,
      };
    },
  },
});

export default captureFingerprintDataSlice;
