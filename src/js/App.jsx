import React from "react";

import { Col, Row } from "reactstrap";

import LogContainer from "./containers/LogContainer";
import VisibleStage from "./containers/VisibleStage";

const App = () => (
  <div className="container">
    <Row>
      <Col>
        <h1>Idle Game Maker: The Idle Game</h1>
      </Col>
    </Row>
    <VisibleStage />
    <LogContainer />
  </div>
);

export default App;
