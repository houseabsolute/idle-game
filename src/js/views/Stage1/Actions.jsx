import React from "react";

import { Button } from "reactstrap";

import { hireDesigner, releaseGame } from "../../actions";

const actions = [
  {
    name: "Release your first idle game (50 thoughts)",
    description: "+$10 per second",
    showIf: ({ games, thoughts }) => thoughts >= 1 && !games.length,
    requires: ({ thoughts }) => thoughts >= 50,
    effect: dispatch => {
      dispatch(releaseGame(50));
    }
  },
  {
    name: "Release another idle game (100 thoughts)",
    description: "+$10 per second",
    showIf: ({ games, thoughts }) => thoughts >= 1 && games.length,
    requires: ({ thoughts }) => thoughts >= 100,
    effect: dispatch => {
      dispatch(releaseGame(100));
    }
  },
  {
    name: "Hire a mediocre game designer ($100)",
    description: "+1 thought per second, $100 initial cost, -$5 per second",
    showIf: ({ cash }) => cash >= 10,
    requires: ({ cash }) => cash >= 100,
    effect: dispatch => {
      dispatch(
        hireDesigner({
          hiringCost: 100,
          ongoingCost: 5,
          quality: "mediocre",
          tps: 1
        })
      );
    }
  }
];

const Actions = ({ dispatch, stage1 }) =>
  actions.map(a => {
    if (!a.showIf(stage1)) {
      return null;
    }

    return (
      <div key={a.name}>
        <Button
          disabled={!a.requires(stage1)}
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
