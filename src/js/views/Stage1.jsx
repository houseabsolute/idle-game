import React from "react";

import { Button, Col, Row } from "reactstrap";

import { think } from "../actions";

import Actions from "./Stage1/Actions";

const Stage1 = ({ dispatch, stage1 }) => {
  const onThinkClick = e => {
    e.preventDefault();
    dispatch(think(1));
  };

  let games;
  const gameRate = stage1.games.length * stage1.gameMultiplier;
  if (stage1.games) {
    games = (
      <div className="assets">
        Games: {stage1.games.length} - ${gameRate}/s
      </div>
    );
  }

  let designers;
  const designerRate = stage1.designers.reduce((t, d) => t + d.ongoingCost, 0);
  if (stage1.designers.length) {
    const totalTps = stage1.designers.reduce((t, d) => t + d.tps, 0);
    const noun = totalTps > 1 ? "thoughts" : "thought";
    designers = (
      <div className="asset">
        Designers: {totalTps} {noun}/s | ${designerRate}/s
      </div>
    );
  }

  const cashflow = gameRate - designerRate;
  const sign = cashflow > 0 ? "+" : "-";
  const cashflowStr = `${cashflow}`.replace(/^-/, "");
  return (
    <Row>
      <Col>
        <div className="asset">
          Cash: ${Math.round(stage1.cash)} ({sign}${cashflowStr}/s)
        </div>
        <div className="asset">Thoughts: {Math.round(stage1.thoughts)}</div>
        {games}
        {designers}
      </Col>
      <Col>
        <Button onClick={onThinkClick}>Think</Button>
      </Col>
      <Col>
        <Actions dispatch={dispatch} stage1={stage1} />
      </Col>
    </Row>
  );
};

export default Stage1;
