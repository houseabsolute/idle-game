import React from "react";

import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";

const Log = ({ log }) => {
  const messages = log.map(m => <li>{m}</li>);
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle>Log</CardTitle>
            <CardText>
              <ul className="game-log">{messages}</ul>
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Log;
