import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface BrandLinkProps {
  id: string;
  icon: IconDefinition;
  link: string;
}

function BrandLink(props: BrandLinkProps) {
  const { icon, link } = props;

  return (
    <a className="mx-2" href={link} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={icon} color="#ffffff" size="lg" />
    </a>
  );
}

export default BrandLink;
