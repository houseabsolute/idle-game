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
    showIf: (cash, thoughts) => thoughts >= 1,
    requires: (cash, thoughts) => thoughts >= 50,
    effect: dispatch => {
      dispatch(releaseGame(1));
      dispatch(spendThoughts(50));
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

const Actions = ({ cash, dispatch, thoughts }) =>
  actions.map(a => {
    if (!a.showIf(cash, thoughts)) {
      return null;
    }

    return (
      <div key={a.name}>
        <Button
          disabled={!a.requires(cash, thoughts)}
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
