import {
  DeviceInformationModel,
  AdditionalInfoParam,
} from "./device-information";

export default class DeviceDetails {
  dpId: string;
  rdsId: string;
  rdsVer: string;
  mi: string;
  srno: string;
  sysid: string;

  constructor(deviceInformation: DeviceInformationModel) {
    this.dpId = deviceInformation.attributes.dpId;
    this.rdsId = deviceInformation.attributes.rdsId;
    this.rdsVer = deviceInformation.attributes.rdsVer;
    this.mi = deviceInformation.attributes.mi;
    this.srno = deviceInformation.children[0].children.find(
      (additionalInfoParam: AdditionalInfoParam) => {
        return additionalInfoParam.attributes.name === "srno";
      }
    )?.attributes.value as string;
    this.sysid = deviceInformation.children[0].children.find(
      (additionalInfoParam: AdditionalInfoParam) => {
        return additionalInfoParam.attributes.name === "sysid";
      }
    )?.attributes.value as string;
  }
}
