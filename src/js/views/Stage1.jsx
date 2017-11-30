import React from "react";

import { Button, Col, Row } from "reactstrap";

import { think } from "../actions";

import Actions from "./Stage1/Actions";

const Stage1 = ({ cash, dispatch, stage1 }) => {
  const onThinkClick = e => {
    e.preventDefault();
    dispatch(think(1));
  };

  return (
    <Row>
      <Col>
        Cash: ${cash}
        <br />
        Thoughts: {stage1.thoughts}
      </Col>
      <Col>
        <Button onClick={onThinkClick}>Think</Button>
      </Col>
      <Col>
        <Actions cash={cash} dispatch={dispatch} {...stage1} />
      </Col>
    </Row>
  );
};

export default Stage1;
