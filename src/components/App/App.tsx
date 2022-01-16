import { Container } from 'react-bootstrap';

import AVDM from '../AVDM/AVDM';
import Header from '../Header/Header';

function App() {
  return (
    <div>
      <Header></Header>
      <Container>
        <AVDM></AVDM>
      </Container>
    </div>
  );
}

export default App;
