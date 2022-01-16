export interface DeviceStatusModel {
  name: string;
  attributes: DeviceStatusAttributes;
  children: DeviceInterfaceDetails[];
  value: string;
}

export interface DeviceInterfaceDetails {
  name: string;
  attributes: DeviceInterfacePath;
  children: any[];
  value: string;
}

export interface DeviceInterfacePath {
  id: string;
  path: string;
}

export interface DeviceStatusAttributes {
  status: string;
  info: string;
}
