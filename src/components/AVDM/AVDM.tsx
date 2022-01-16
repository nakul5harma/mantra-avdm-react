import React from "react";

import DeviceNotReady from "./DeviceNotReady";
import DeviceInformation from "./DeviceInformation";

function AVDM() {
  const [isDeviceReady, setIsDeviceReady] = React.useState<boolean>(true);

  const checkConnectivityAgain = () => {
    console.log("checking!");
  };

  return (
    <div className="AVDM">
      {!isDeviceReady ? (
        <DeviceNotReady checkConnectivityAgain={checkConnectivityAgain} />
      ) : (
        <DeviceInformation />
      )}
    </div>
  );
}

export default AVDM;
