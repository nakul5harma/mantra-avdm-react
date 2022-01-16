import React from "react";

import { DeviceStatusDetails } from "../../models/device-status-details";
import CaptureFingerprintData from "./CaptureFingerprintData";
import DeviceInformation from "./DeviceInformation";
import DeviceStatus from "./DeviceStatus";

function AVDM() {
  const [deviceStatusDetails, setDeviceStatusDetails] =
    React.useState<DeviceStatusDetails | null>(null);
  const [isDeviceReady, setIsDeviceReady] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (deviceStatusDetails) {
      setIsDeviceReady(deviceStatusDetails.status === "READY");
    }
  }, [deviceStatusDetails, setIsDeviceReady]);

  return (
    <div className="mt-4 mb-4">
      <DeviceStatus
        isDeviceReady={isDeviceReady}
        deviceStatusDetails={deviceStatusDetails}
        setDeviceStatusDetails={setDeviceStatusDetails}
      />
      {isDeviceReady && <DeviceInformation />}
      {isDeviceReady && <CaptureFingerprintData />}
    </div>
  );
}

export default AVDM;
