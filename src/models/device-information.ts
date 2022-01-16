export interface DeviceInformationModel {
  name: string;
  attributes: DeviceInfoAttributes;
  children: AdditionalInfo[];
  value: string;
}

export interface AdditionalInfo {
  name: string;
  attributes: AdditionalInfoAttributes;
  children: AdditionalInfoParam[];
  value: string;
}

export interface AdditionalInfoParam {
  name: string;
  attributes: AdditionalInfoParamValue;
  children: any[];
  value: string;
}

export interface AdditionalInfoParamValue {
  name: string;
  value: string;
}

export interface AdditionalInfoAttributes {}

export interface DeviceInfoAttributes {
  dpId: string;
  rdsId: string;
  rdsVer: string;
  mi: string;
  mc: string;
}
