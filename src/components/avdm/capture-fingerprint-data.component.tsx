import React from 'react';

import { Accordion, Badge, Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { captureFingerprintData } from '../../slices/capture-fingerprint-data.slice';
import { CaptureResponseDetails } from '../../models/capture-data-response.model';
import { DeviceStatusDetails } from '../../models/device-status-details.model';
import ListItem from './list-item.component';

function CaptureFingerprintData() {
  const [captureResponseDetails, setCaptureResponseDetails] =
    React.useState<CaptureResponseDetails | null>(null);

  const dispatch = useDispatch();

  const fingerprintData = useSelector((state: RootState) => state.fingerprintData.fingerprintData);
  const deviceStatus = useSelector((state: RootState) => state.deviceStatus.deviceStatus);

  React.useEffect(() => {
    if (!fingerprintData.loading && !fingerprintData.error && fingerprintData.data) {
      setCaptureResponseDetails(new CaptureResponseDetails(fingerprintData.data));
    } else {
      setCaptureResponseDetails(null);
    }
  }, [fingerprintData]);

  const handleStartCapture = () => {
    if (!deviceStatus.loading && !deviceStatus.error && deviceStatus.data) {
      const deviceStatusDetails = new DeviceStatusDetails(deviceStatus.data);
      dispatch(captureFingerprintData(deviceStatusDetails.capturePath?.path || '/info/capture'));
    }
  };

  return (
    <div className="mt-4">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Capture Fingerprint Data{' '}
            {fingerprintData.loading && <Spinner animation="grow" role="status" className="ms-4" />}
          </Accordion.Header>
          <Accordion.Body>
            <Container>
              <Button variant="outline-primary" onClick={handleStartCapture}>
                Start Capture
              </Button>

              {captureResponseDetails && (
                <div className="mt-4">
                  <ListItem label="name" value={captureResponseDetails?.name} />
                  <ListItem
                    label="errCode"
                    value={
                      <>
                        {captureResponseDetails?.errCode}

                        <Badge
                          pill
                          bg={captureResponseDetails?.errCode === '0' ? 'success' : 'danger'}
                          className="ms-4"
                        >
                          {captureResponseDetails?.errCode === '0' ? 'SUCCESS' : 'FAILED'}
                        </Badge>
                      </>
                    }
                  />
                  <ListItem label="errInfo" value={captureResponseDetails?.errInfo} />
                  <ListItem label="fCount" value={captureResponseDetails?.fCount} />
                  <ListItem label="fType" value={captureResponseDetails?.fType} />
                  <ListItem label="nmPoints" value={captureResponseDetails?.nmPoints} />
                  <ListItem label="qScore" value={captureResponseDetails?.qScore} />
                </div>
              )}
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CaptureFingerprintData;
