import React from 'react';

import { DeviceStatusDetails } from '../../models/device-status-details.model';
import CaptureFingerprintData from './capture-fingerprint-data.component';
import DeviceInformation from './device-information.component';
import DeviceStatus from './device-status.component';

function AVDM() {
  const [deviceStatusDetails, setDeviceStatusDetails] = React.useState<DeviceStatusDetails | null>(
    null,
  );
  const [isDeviceReady, setIsDeviceReady] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (deviceStatusDetails) {
      setIsDeviceReady(deviceStatusDetails.status === 'READY');
    } else {
      setIsDeviceReady(undefined);
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
