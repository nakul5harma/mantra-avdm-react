import { Container } from 'react-bootstrap';

import AVDM from '../avdm/avdm.component';
import Header from '../header/header.component';

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
