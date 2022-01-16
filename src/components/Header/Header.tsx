import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Mantra AVDM React Integration Demo
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
