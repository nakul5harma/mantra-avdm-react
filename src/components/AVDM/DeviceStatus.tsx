import React from "react";

import { Accordion, Badge, Container, Spinner } from "react-bootstrap";
import { DeviceStatusDetails } from "../../models/device-status-details";

import DeviceNotReady from "./DeviceNotReady";
import ListItem from "./ListItem";

const XMLParser = require("react-xml-parser");

const sampleResponse = `<?xml version="1.0"?>
<RDService status="READY" info="Mantra Authentication Vendor Device Manager">
    <Interface id="DEVICEINFO" path="/rd/info" />
    <Interface id="CAPTURE" path="/rd/capture" />
</RDService>`;

export interface DeviceStatusProps {
  isDeviceReady: boolean | undefined;
  deviceStatusDetails: DeviceStatusDetails | null;
  setDeviceStatusDetails: React.Dispatch<
    React.SetStateAction<DeviceStatusDetails | null>
  >;
}

function DeviceStatus(props: DeviceStatusProps) {
  const { isDeviceReady, deviceStatusDetails, setDeviceStatusDetails } = props;

  React.useEffect(() => {
    const deviceStatusTimeout = setTimeout(() => {
      const deviceStatus = new XMLParser().parseFromString(sampleResponse);
      setDeviceStatusDetails(new DeviceStatusDetails(deviceStatus));

      clearTimeout(deviceStatusTimeout);
    }, 2000);
  }, [setDeviceStatusDetails]);

  const checkConnectivityAgain = () => {
    console.log("checking!");
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Device Status
            <Badge
              pill
              bg={isDeviceReady ? "success" : "danger"}
              className="ms-4"
            >
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
