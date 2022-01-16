import React from "react";

import { Container, Row, Col, Accordion } from "react-bootstrap";

import DeviceDetails from "../../models/device-details";

const XMLParser = require("react-xml-parser");

const sampleResponse = `<?xml version="1.0"?>
<DeviceInfo dpId="MANTRA.MSIPL" rdsId="MANTRA.WIN.001" rdsVer="1.0.3" mi="MFS100" mc="MIIEGDCCAwCgAwIBAgIEA1Z+ADANBgkqhkiG9w0BAQsFADCB6jEqMCgGA1UEAxMhRFMgTWFudHJhIFNvZnRlY2ggSW5kaWEgUHZ0IEx0ZCA3MUMwQQYDVQQzEzpCIDIwMyBTaGFwYXRoIEhleGEgb3Bwb3NpdGUgR3VqYXJhdCBIaWdoIENvdXJ0IFMgRyBIaWdod2F5MRIwEAYDVQQJEwlBaG1lZGFiYWQxEDAOBgNVBAgTB0d1amFyYXQxHTAbBgNVBAsTFFRlY2huaWNhbCBEZXBhcnRtZW50MSUwIwYDVQQKExxNYW50cmEgU29mdGVjaCBJbmRpYSBQdnQgTHRkMQswCQYDVQQGEwJJTjAeFw0yMjAxMTMxMzA3MzVaFw0yMjAyMTIxMzIxNTZaMIGwMSUwIwYDVQQDExxNYW50cmEgU29mdGVjaCBJbmRpYSBQdnQgTHRkMR4wHAYDVQQLExVCaW9tZXRyaWMgTWFudWZhY3R1cmUxDjAMBgNVBAoTBU1TSVBMMRIwEAYDVQQHEwlBSE1FREFCQUQxEDAOBgNVBAgTB0dVSkFSQVQxCzAJBgNVBAYTAklOMSQwIgYJKoZIhvcNAQkBFhVzdXBwb3J0QG1hbnRyYXRlYy5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1e+xHN9EO3ixnia1vnbxenMvqY6pphb76TN2XbAWOGlXl47FYl1kwHSLh9rif2V6TPNHNw56zxzTYXN+Cfb4z+aSI68pWvAxOipy7yOAEt7OOTLMapP04xk0tg8ock7HqaTnq12YPqWmBvIB8tk711/blesjkXqhwR7DndHUr0A/AqFo8qKCCLUdFJIvhtfZp9MWyIYp65Tc/TOUIBBLFYczaX1As8p6Zo3doakbcluDMJcTpXYkZRw95NN+kRBkkcO2elg+Hq9QZW8YdLkMyS4QuOm+oLaZ7OrLrifnTS0Pghji1PPlMfAinHVLKILwb4D/XAp+5HAycqvVNCmItAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAH48pF+lz+24Tm1zrp5rrTKObwZ3nhAQfQYUfBCl7/GUuXKRFY/BafQtMFjouMaf7Tx5PfO/99lkiidT/5Bj9sWZvubO7rhaSF1UDk5z1FNZworz4eojwTZorLHWpYDisVL1HQVvv0g3NCBdLPiH23EFwvwV1gKaFpmcvPfZ5fTf9wcPlYUWMKWWAtjrvXbcE1nmxhyWmkc7OHHSgl4qVYnzCuws/oAAwf4/eyUZLpy9kQqepGWQ6w2do+QOvr6OZ3VMSh17PQ3wR8Am5AFGPWV5WX2p5G2c5eeuH2Y/XZPd8dRNH47Gh+OW98mN34TklwJhCFtjbgy1nDBVX5HEtYw=" dc="21045a54-85e4-4ebd-8b31-2220c4144d7f">
  <additional_info>
    <Param name="srno" value="3567278" />
    <Param name="sysid" value="6ECFEBF8608AA99FBFF0" />
    <Param name="ts" value="2022-01-13T19:00:00+05:30" />
  </additional_info>
</DeviceInfo>`;

export interface DeviceInformationValueProps {
  label: string;
  value: string | undefined;
}

function DeviceInformationValue(props: DeviceInformationValueProps) {
  return (
    <Row>
      <Col className="fw-bold">{props.label}</Col>
      <Col>:</Col>
      <Col>{props.value}</Col>
    </Row>
  );
}

function DeviceInformation() {
  const [deviceDetails, setDeviceDetails] =
    React.useState<DeviceDetails | null>(null);

  React.useEffect(() => {
    const deviceInformation = new XMLParser().parseFromString(sampleResponse);
    setDeviceDetails(new DeviceDetails(deviceInformation));
  }, []);

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Device Details</Accordion.Header>
          <Accordion.Body>
            <Container>
              <DeviceInformationValue
                label="dpId"
                value={deviceDetails?.dpId}
              />
              <DeviceInformationValue
                label="rdsId"
                value={deviceDetails?.rdsId}
              />
              <DeviceInformationValue
                label="rdsVer"
                value={deviceDetails?.rdsVer}
              />
              <DeviceInformationValue label="mi" value={deviceDetails?.mi} />
              <DeviceInformationValue
                label="srno"
                value={deviceDetails?.srno}
              />
              <DeviceInformationValue
                label="sysid"
                value={deviceDetails?.sysid}
              />
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default DeviceInformation;
