import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Navbar } from "react-bootstrap";
import BrandLink, { BrandLinkProps } from "./BrandLink";

const HEADER_LINKS: BrandLinkProps[] = [
  {
    id: "GitHub",
    icon: faGithub,
    link: "https://github.com/nakul5harma/mantra-avdm-react",
  },
  {
    id: "Twitter",
    icon: faTwitter,
    link: "https://twitter.com/nakul5harma",
  },
  {
    id: "LinkedIn",
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/nakul5harma/",
  },
];

function Header() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container className="d-flex justify-content-between my-3">
        <div>
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
        </div>

        <div>
          {HEADER_LINKS.map((linkProps: BrandLinkProps) => {
            return (
              <BrandLink
                key={linkProps.id}
                id={linkProps.id}
                icon={linkProps.icon}
                link={linkProps.link}
              />
            );
          })}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
