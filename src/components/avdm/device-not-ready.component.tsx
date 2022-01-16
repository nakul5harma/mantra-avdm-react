import { Alert, Button } from 'react-bootstrap';

export interface DeviceNotReadyProps {
  checkConnectivityAgain: () => void;
}

function DeviceNotReady(props: DeviceNotReadyProps) {
  const { checkConnectivityAgain } = props;

  return (
    <Alert variant="danger">
      <Alert.Heading>Oops! Device not ready.</Alert.Heading>
      <p>
        It looks like Mantra device is not connected properly or RD service is not installed/
        running in the system. Please try again after ensuring the proper connection.
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={checkConnectivityAgain} variant="danger">
          Click Me To Check Again
        </Button>
      </div>
    </Alert>
  );
}

export default DeviceNotReady;
