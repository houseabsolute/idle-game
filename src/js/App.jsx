import React from "react";

import { Col, Row } from "reactstrap";

import VisibleStage from "./containers/VisibleStage";

const App = () => (
  <div className="container">
    <Row>
      <Col>
        <h1>Idle Game Maker: The Idle Game</h1>
      </Col>
    </Row>
    <VisibleStage />
  </div>
);

export default App;
