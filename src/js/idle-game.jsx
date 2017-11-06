import React from "react";
import ReactDOM from "react-dom";

import { Button } from "reactstrap";

const App = () => (
  <div>
    <h1>Idle Game Maker: The Idle Game</h1>
    <Button>Think</Button>
  </div>
);
ReactDOM.render(<App />, document.getElementById("root"));
