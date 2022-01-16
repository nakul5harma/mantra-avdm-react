export interface CaptureDataModel {
  name: string;
  attributes: CaptureDataAttributes;
  children: CaptureDataResponse[];
  value: string;
}

export interface CaptureDataResponse {
  name: string;
  attributes: CaptureResponseAttributes;
  children: DeviceInfo[];
  value: string;
}

export interface DeviceInfo {
  name: string;
  attributes: CaptureDataAttributes;
  children: AdditionalInfo[];
  value: string;
}

export interface AdditionalInfo {
  name: string;
  attributes: AdditionalInfoAttributes;
  children: any[];
  value: string;
}

export interface AdditionalInfoAttributes {
  name: string;
  value: string;
}

export interface CaptureResponseAttributes {
  errCode?: string;
  errInfo?: string;
  fCount?: string;
  fType?: string;
  nmPoints?: string;
  qScore?: string;
  dpId?: string;
  rdsId?: string;
  rdsVer?: string;
  mi?: string;
  mc?: string;
  ci?: string;
  type?: string;
}

export interface CaptureDataAttributes {}
