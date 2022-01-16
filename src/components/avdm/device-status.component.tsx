import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Badge, Container, Spinner } from 'react-bootstrap';

import { RootState } from '../../store/store';
import { getDeviceStatus } from '../../slices/get-device-status.slice';
import { DeviceStatusDetails } from '../../models/device-status-details.model';
import DeviceNotReady from './device-not-ready.component';
import ListItem from './list-item.component';

export interface DeviceStatusProps {
  isDeviceReady: boolean | undefined;
  deviceStatusDetails: DeviceStatusDetails | null;
  setDeviceStatusDetails: React.Dispatch<React.SetStateAction<DeviceStatusDetails | null>>;
}

function DeviceStatus(props: DeviceStatusProps) {
  const { isDeviceReady, deviceStatusDetails, setDeviceStatusDetails } = props;

  const dispatch = useDispatch();

  const deviceStatus = useSelector((state: RootState) => state.deviceStatus.deviceStatus);

  React.useEffect(() => {
    dispatch(getDeviceStatus());
  }, [dispatch]);

  React.useEffect(() => {
    if (!deviceStatus.loading && !deviceStatus.error && deviceStatus.data) {
      setDeviceStatusDetails(new DeviceStatusDetails(deviceStatus.data));
    } else {
      setDeviceStatusDetails(null);
    }
  }, [deviceStatus, setDeviceStatusDetails]);

  const checkConnectivityAgain = () => {
    dispatch(getDeviceStatus());
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Device Status
            <Badge pill bg={isDeviceReady ? 'success' : 'danger'} className="ms-4">
              {deviceStatusDetails?.status}
            </Badge>
          </Accordion.Header>
          <Accordion.Body>
            {isDeviceReady === false && (
              <DeviceNotReady checkConnectivityAgain={checkConnectivityAgain} />
            )}

            {deviceStatusDetails ? (
              <Container>
                <ListItem label="name" value={deviceStatusDetails?.name} />
                <ListItem label="status" value={deviceStatusDetails?.status} />
                <ListItem label="info" value={deviceStatusDetails?.info} />
                <ListItem
                  label="deviceInfoPath"
                  value={`${deviceStatusDetails?.deviceInfoPath?.path} (${deviceStatusDetails?.deviceInfoPath?.id})`}
                />
                <ListItem
                  label="capturePath"
                  value={`${deviceStatusDetails?.capturePath?.path} (${deviceStatusDetails?.capturePath?.id})`}
                />
              </Container>
            ) : (
              <Spinner animation="grow" role="status"></Spinner>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default DeviceStatus;
