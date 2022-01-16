import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Accordion, Spinner, Badge } from 'react-bootstrap';

import { RootState } from '../../store/store';
import { getDeviceInfo } from '../../slices/get-device-info.slice';
import DeviceDetails from '../../models/device-details.model';
import { DeviceStatusDetails } from '../../models/device-status-details.model';
import ListItem from './list-item.component';

function DeviceInformation() {
  const [deviceDetails, setDeviceDetails] = React.useState<DeviceDetails | null>(null);

  const dispatch = useDispatch();

  const deviceInfo = useSelector((state: RootState) => state.deviceInfo.deviceInfo);
  const deviceStatus = useSelector((state: RootState) => state.deviceStatus.deviceStatus);

  React.useEffect(() => {
    if (!deviceStatus.loading && !deviceStatus.error && deviceStatus.data) {
      const deviceStatusDetails = new DeviceStatusDetails(deviceStatus.data);
      dispatch(getDeviceInfo(deviceStatusDetails.deviceInfoPath?.path || '/info/path'));
    }
  }, [dispatch, deviceStatus]);

  React.useEffect(() => {
    if (!deviceInfo.loading && !deviceInfo.error && deviceInfo.data) {
      setDeviceDetails(new DeviceDetails(deviceInfo.data));
    } else {
      setDeviceDetails(null);
    }
  }, [deviceInfo]);

  return (
    <div className="mt-4">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Device Details
            <Badge bg="secondary" className="ms-4">
              {deviceDetails?.mi}
            </Badge>
          </Accordion.Header>
          <Accordion.Body>
            {deviceDetails ? (
              <Container>
                <ListItem label="dpId" value={deviceDetails?.dpId} />
                <ListItem label="rdsId" value={deviceDetails?.rdsId} />
                <ListItem label="rdsVer" value={deviceDetails?.rdsVer} />
                <ListItem label="mi" value={deviceDetails?.mi} />
                <ListItem label="srno" value={deviceDetails?.srno} />
                <ListItem label="sysid" value={deviceDetails?.sysid} />
              </Container>
            ) : (
              <Spinner animation="grow" role="status"></Spinner>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default DeviceInformation;
