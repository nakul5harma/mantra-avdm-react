export const RD_SERVICE_BASE_URL = "http://localhost:11100";
export const RDSERVICE_ENV = "PP";

const EKYC_API_OPTIONS = {
  ver: "2.5",
  ra: "F",
  rc: "Y",
  lr: "N",
  de: "N",
  pfr: "N",
};

export const PID_OPTIONS = {
  fCount: "1",
  fType: "0",
  iCount: "0",
  pCount: "0",
  format: "0",
  pidVer: "2.0",
  timeout: "10000",
  posh: "UNKNOWN",
  env: RDSERVICE_ENV,
  wadh: `${EKYC_API_OPTIONS.ver}${EKYC_API_OPTIONS.ra}${EKYC_API_OPTIONS.rc}${EKYC_API_OPTIONS.lr}${EKYC_API_OPTIONS.de}${EKYC_API_OPTIONS.pfr}`,
};
