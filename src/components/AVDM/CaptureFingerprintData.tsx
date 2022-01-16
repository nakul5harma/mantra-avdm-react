import React from "react";

import { Accordion, Badge, Button, Container, Spinner } from "react-bootstrap";
import { CaptureResponseDetails } from "../../models/capture-response";
import ListItem from "./ListItem";

const XMLParser = require("react-xml-parser");

const sampleResponse = `<?xml version="1.0"?>
<PidData>
    <Resp errCode="0" errInfo="Success" fCount="1" fType="0" nmPoints="46" qScore="71" />
    <DeviceInfo dpId="MANTRA.MSIPL" rdsId="MANTRA.WIN.001" rdsVer="1.0.3" mi="MFS100" mc="MIIEGDCCAwCgAwIBAgIEA1Z+ADANBgkqhkiG9w0BAQsFADCB6jEqMCgGA1UEAxMhRFMgTWFudHJhIFNvZnRlY2ggSW5kaWEgUHZ0IEx0ZCA3MUMwQQYDVQQzEzpCIDIwMyBTaGFwYXRoIEhleGEgb3Bwb3NpdGUgR3VqYXJhdCBIaWdoIENvdXJ0IFMgRyBIaWdod2F5MRIwEAYDVQQJEwlBaG1lZGFiYWQxEDAOBgNVBAgTB0d1amFyYXQxHTAbBgNVBAsTFFRlY2huaWNhbCBEZXBhcnRtZW50MSUwIwYDVQQKExxNYW50cmEgU29mdGVjaCBJbmRpYSBQdnQgTHRkMQswCQYDVQQGEwJJTjAeFw0yMjAxMTMxMzA3MzVaFw0yMjAyMTIxMzIxNTZaMIGwMSUwIwYDVQQDExxNYW50cmEgU29mdGVjaCBJbmRpYSBQdnQgTHRkMR4wHAYDVQQLExVCaW9tZXRyaWMgTWFudWZhY3R1cmUxDjAMBgNVBAoTBU1TSVBMMRIwEAYDVQQHEwlBSE1FREFCQUQxEDAOBgNVBAgTB0dVSkFSQVQxCzAJBgNVBAYTAklOMSQwIgYJKoZIhvcNAQkBFhVzdXBwb3J0QG1hbnRyYXRlYy5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1e+xHN9EO3ixnia1vnbxenMvqY6pphb76TN2XbAWOGlXl47FYl1kwHSLh9rif2V6TPNHNw56zxzTYXN+Cfb4z+aSI68pWvAxOipy7yOAEt7OOTLMapP04xk0tg8ock7HqaTnq12YPqWmBvIB8tk711/blesjkXqhwR7DndHUr0A/AqFo8qKCCLUdFJIvhtfZp9MWyIYp65Tc/TOUIBBLFYczaX1As8p6Zo3doakbcluDMJcTpXYkZRw95NN+kRBkkcO2elg+Hq9QZW8YdLkMyS4QuOm+oLaZ7OrLrifnTS0Pghji1PPlMfAinHVLKILwb4D/XAp+5HAycqvVNCmItAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAH48pF+lz+24Tm1zrp5rrTKObwZ3nhAQfQYUfBCl7/GUuXKRFY/BafQtMFjouMaf7Tx5PfO/99lkiidT/5Bj9sWZvubO7rhaSF1UDk5z1FNZworz4eojwTZorLHWpYDisVL1HQVvv0g3NCBdLPiH23EFwvwV1gKaFpmcvPfZ5fTf9wcPlYUWMKWWAtjrvXbcE1nmxhyWmkc7OHHSgl4qVYnzCuws/oAAwf4/eyUZLpy9kQqepGWQ6w2do+QOvr6OZ3VMSh17PQ3wR8Am5AFGPWV5WX2p5G2c5eeuH2Y/XZPd8dRNH47Gh+OW98mN34TklwJhCFtjbgy1nDBVX5HEtYw=" dc="21045a54-85e4-4ebd-8b31-2220c4144d7f">
        <additional_info>
            <Param name="srno" value="3567278" />
            <Param name="sysid" value="6ECFEBF8608AA99FBFF0" />
            <Param name="ts" value="2022-01-13T18:54:03+05:30" />
        </additional_info>
    </DeviceInfo>
    <Skey ci="20221021">nvTyVf0gUZT2NrfjGNHjMaFJvqBZH4LKerlDk/ZtL0Ib+/BSvLO7FQJaByo3+EuHsQfQeirHfGT4yxuEYbm5v3ybzWMDoLpNwAn2fSKaHD2MGFrfnpjRLhwCFVajMAoGwH8bT0jIgHe60EvroTa+ZDAYchCwr715tBjGooyAAtupye+awE269FdDfrQpsfVqDcxQYxzmFDatqpX8DbrzIe44brW1yvtbOFKISFANCS9loy/F02hnKINrgbcm8vvemPFQ014YShQM/UbKm0A7rZPk4904ItBwzx7LhSRLCljZZOf1bVkZULZKUruv2AldhJ5D8kd1nT8iUXi8eNjl3g==</Skey>
    <Hmac>SGmRzr/4ji24GbEi/AHd7iXaf4pbJvLOZDDJz8KVEAktcj5BfzJwZa2ctxwx0GVs</Hmac>
    <Data type="X">MjAyMi0wMS0xM1QxODo1NDowM4gSNsXgpJXcR5+jJV3PwUp6T2Q7mCXyJYey7OEkJo0TRtkz/eM3reIS1HpZRLyCBThvEEdQ4R4EQfU9SE23fHxV5tB1I+qpmKJa3sqNRI5Z1lk7XiUiUZy99NfZNOb3MecLVmq3mjfS8jK+AvyE+n7TBhWDeQA8vj9VDQGRm5P+DPk2NtDzWcul2/1CfDHr9F4KRsUoQqsMZPpO25MZO1Zy0HJIx98R/EI8c4hhV6lZ54wGTBkXBdprBsheWQIKL8OC4XxDu4L+qVzk+pptkVyeCpXFjMLpYRcgHakvW0VIDfib9Amw/J6TQ78aVTtMDexsVPopdjpg84z+DJuj3WrDCwxezz4CeJrMc/BFEsTez6rA+kglWoX5X1u0IpkOBGgUMXHSFJKqiJTimNYUs0YZcLyW+lItKe7zi8doqKXPDFT/vWFp4VLJncGorWRcq0vkzg6+QNBQjYbIlcCkZxfwTfa7gdICpn/DJm7UKnLEQRYxixVIoTgj8b9Wsn81gc/mdjV0oG/01UNWci8E2MepQRZRyN9EGkJF4xFHYNrDSh0rKa2pPCz3CzEIvqNt8GQzWRLXUPrfURevmZKsEtfcxB7aG/ij494D0kQblalDiyEka7qBvqEPT0IXYGtbEMHIdPNTeEPS2bU6EkNfRa4G37HYzk/88/Bt64g3fHDyRRbdDrR37OVnWtkcqqc1+Bx0e64afqKn/PqC/r+oaWJq4RqlNqSs8LF6TXJG2ALnxHPuDJYHCbzB4LwMD7brk3Gs2wh1wUiz1A3VUZZhRT/JR2YBPk5XZQTxZnCwAXUJDfa7o6oLYXK48UXi4TxHzzVD4vui90ZkmxTRkQ2F6Ge8lB5tJqvu7lBnRILfman2GP6WKxEqGAgt3JxXmSwu51X991tuyqQdGc8QRGbPCDTD1yUd3AcvyO9fLDVq/RVr8NQSVWvkgXzs0DL+WWTN1EmanF2ofYsRd8wAGCHGcDoGA0teBObrhI2DkRKFOekg73VvR3jr1H0zE2EbSIqYPEql5PdLalS4pKybmzcRpiYreyL+M0hGUCCC+I73vvAysWfz+3NkKWzD/d9gudOGd+YRWq1adqOHjYXSe5xm+Q1QizBVgqvI3sO9yv5lAfzbMxZEsqCVcsCId+cdJ9RpHxUjQP8uSzG9XbcEpAeI44jodDptTdDsbv98yFQH1mloFWUlH4zLtBJfYUv0ROl78DBYI3+Ubq2FRYtDLYvZmyPnlm3EoD3YWcso5hJTCTwUUs/6Y5IsJCcocA5cZkLi2qwwMT+oZRPLIb+93GOeUwiRFBaSrDjqRPO3Gd+ftnzzdApKrP4hEPtHVz+f6UogJg==</Data>
</PidData>`;

function CaptureFingerprintData() {
  const [isCapturing, setIsCapturing] = React.useState<boolean>(false);
  const [captureData, setCaptureData] = React.useState(null);
  const [captureResponseDetails, setCaptureResponseDetails] =
    React.useState<CaptureResponseDetails | null>(null);

  React.useEffect(() => {
    if (captureData) {
      setCaptureResponseDetails(new CaptureResponseDetails(captureData));
    } else {
      setCaptureResponseDetails(null);
    }
  }, [captureData]);

  const handleStartCapture = () => {
    setIsCapturing(true);
    setCaptureData(null);

    const captureTimeout = setTimeout(() => {
      setCaptureData(new XMLParser().parseFromString(sampleResponse));

      setIsCapturing(false);
      clearTimeout(captureTimeout);
    }, 3000);
  };

  return (
    <div className="mt-4">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Capture Fingerprint Data{" "}
            {isCapturing && (
              <Spinner animation="grow" role="status" className="ms-4" />
            )}
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
                          bg={
                            captureResponseDetails?.errCode === "0"
                              ? "success"
                              : "danger"
                          }
                          className="ms-4"
                        >
                          {captureResponseDetails?.errCode === "0"
                            ? "SUCCESS"
                            : "FAILED"}
                        </Badge>
                      </>
                    }
                  />
                  <ListItem
                    label="errInfo"
                    value={captureResponseDetails?.errInfo}
                  />
                  <ListItem
                    label="fCount"
                    value={captureResponseDetails?.fCount}
                  />
                  <ListItem
                    label="fType"
                    value={captureResponseDetails?.fType}
                  />
                  <ListItem
                    label="nmPoints"
                    value={captureResponseDetails?.nmPoints}
                  />
                  <ListItem
                    label="qScore"
                    value={captureResponseDetails?.qScore}
                  />
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
