import React from "react";

import Stage1 from "./Stage1";

const Stages = ({ cash, currentStage, dispatch, stage1 }) =>
  currentStage === 1 ? (
    <Stage1 cash={cash} dispatch={dispatch} {...stage1} />
  ) : null;

export default Stages;
