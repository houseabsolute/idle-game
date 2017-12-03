import React from "react";

import Stage1 from "./Stage1";

const Stages = ({ currentStage, dispatch, stage1 }) =>
  currentStage === 1 ? <Stage1 dispatch={dispatch} stage1={stage1} /> : null;

export default Stages;
