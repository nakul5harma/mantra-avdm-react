import { Col, Row } from "react-bootstrap";

export interface ListItemProps {
  label: string;
  value: JSX.Element | string | undefined;
}

function ListItem(props: ListItemProps) {
  return (
    <Row>
      <Col className="fw-bold">{props.label}</Col>
      <Col>:</Col>
      <Col>{props.value}</Col>
    </Row>
  );
}

export default ListItem;
