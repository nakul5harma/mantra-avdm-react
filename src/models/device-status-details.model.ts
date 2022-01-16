import {
  DeviceInterfaceDetails,
  DeviceInterfacePath,
  DeviceStatusModel,
} from './device-status.model';

export class DeviceStatusDetails {
  name: string;
  status: string;
  info: string;
  deviceInfoPath: DeviceInterfacePath | undefined;
  capturePath: DeviceInterfacePath | undefined;

  constructor(deviceStatus: DeviceStatusModel) {
    this.name = deviceStatus.name;
    this.status = deviceStatus.attributes.status;
    this.info = deviceStatus.attributes.info;
    this.deviceInfoPath = deviceStatus.children.find((deviceInterface: DeviceInterfaceDetails) => {
      return deviceInterface.attributes.id === 'DEVICEINFO';
    })?.attributes;
    this.capturePath = deviceStatus.children.find((deviceInterface: DeviceInterfaceDetails) => {
      return deviceInterface.attributes.id === 'CAPTURE';
    })?.attributes;
  }
}
