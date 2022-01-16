import { CaptureDataModel, CaptureDataResponse } from './capture-data';

export class CaptureResponseDetails {
  name: string;
  errCode: string;
  errInfo: string;
  fCount: string;
  fType: string;
  nmPoints: string;
  qScore: string;

  constructor(captureData: CaptureDataModel) {
    const resp = captureData.children.find((captureDataResponse: CaptureDataResponse) => {
      return captureDataResponse.name === 'Resp';
    });

    this.name = captureData.name;
    this.errCode = resp?.attributes.errCode as string;
    this.errInfo = resp?.attributes.errInfo as string;
    this.fCount = resp?.attributes.fCount as string;
    this.fType = resp?.attributes.fType as string;
    this.nmPoints = resp?.attributes.nmPoints as string;
    this.qScore = resp?.attributes.qScore as string;
  }
}
