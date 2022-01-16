import React from "react";

import { DeviceStatusDetails } from "../../models/device-status-details";
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
    <div className="AVDM">
      <DeviceStatus
        isDeviceReady={isDeviceReady}
        deviceStatusDetails={deviceStatusDetails}
        setDeviceStatusDetails={setDeviceStatusDetails}
      />
      {isDeviceReady && <DeviceInformation />}
    </div>
  );
}

export default AVDM;
