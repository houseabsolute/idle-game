import React from "react";

import { Button } from "reactstrap";

import {
  hireDesigner,
  releaseGame,
  spendCash,
  spendThoughts
} from "../../actions";

const actions = [
  {
    name: "Release your first idle game (50 thoughts)",
    description: "+$10 per second",
    showIf: (cash, stage1) => stage1.thoughts >= 1 && !stage1.games,
    requires: (cash, stage1) => stage1.thoughts >= 50,
    effect: dispatch => {
      dispatch(releaseGame());
      dispatch(spendThoughts(50));
    }
  },
  {
    name: "Release another idle game (100 thoughts)",
    description: "+$10 per second",
    showIf: (cash, stage1) => stage1.thoughts >= 1 && stage1.games,
    requires: (cash, stage1) => stage1.thoughts >= 100,
    effect: dispatch => {
      dispatch(releaseGame());
      dispatch(spendThoughts(100));
    }
  },
  {
    name: "Hire a mediocre game designer ($1,000)",
    description: "+1 thought per second",
    showIf: cash => cash >= 100,
    requires: cash => cash >= 1000,
    effect: dispatch => {
      dispatch(hireDesigner("mediocre", 1));
      dispatch(spendCash(1000));
    }
  }
];

const Actions = ({ cash, dispatch, stage1 }) =>
  actions.map(a => {
    if (!a.showIf(cash, stage1)) {
      return null;
    }

    return (
      <div key={a.name}>
        <Button
          disabled={!a.requires(cash, stage1)}
          onClick={() => a.effect(dispatch)}
        >
          <strong>{a.name}</strong>
          <br />
          {a.description}
        </Button>
      </div>
    );
  });

export default Actions;
