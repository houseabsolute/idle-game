import React from "react";

import { Button, Col, Row } from "reactstrap";

import { think } from "../actions";

const Stage1 = ({ cash, dispatch, thoughts }) => {
  const onThinkClick = e => {
    e.preventDefault();
    dispatch(think(1));
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          Cash: ${cash}
          <br />
          Thoughts: {thoughts}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={onThinkClick}>Think</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Stage1;
