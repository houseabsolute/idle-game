import { combineReducers } from "redux";

import {
  ADD_CASH,
  addCash,
  HIRE_DESIGNER,
  LOG_MESSAGE,
  logMessage,
  RELEASE_GAME,
  RESET_STAGE,
  SPEND_CASH,
  spendCash,
  SPEND_THOUGHTS,
  spendThoughts,
  TICK,
  THINK,
  think,
  UPDATE_STAGE
} from "./actions";

export const tickTime = 20;
const ticksPerSecond = 1000 / tickTime;

const currentStage = (state = 1, action) => {
  switch (action.type) {
    case UPDATE_STAGE:
      return action.stage;
    case RESET_STAGE:
      return 1;
    default:
      return state;
  }
};

const log = (state = [], action) => {
  switch (action.type) {
    case LOG_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
};

const stage1 = (
  state = {
    cash: 0,
    cps: 0,
    designers: [],
    games: [],
    gameMultiplier: 5,
    thoughts: 0,
    tps: 0
  },
  action
) => {
  switch (action.type) {
    case ADD_CASH:
      return { ...state, cash: state.cash + action.amount };
    case HIRE_DESIGNER: {
      action.asyncDispatch(spendCash(action.designer.hiringCost));
      action.asyncDispatch(
        logMessage(
          `Hired ${action.designer.name}, a ${
            action.designer.quality
          } designer.`
        )
      );
      return {
        ...state,
        designers: [...state.designers, action.designer]
      };
    }
    case RELEASE_GAME: {
      action.asyncDispatch(spendThoughts(action.game.thoughts));
      action.asyncDispatch(logMessage(`Released ${action.game.name}.`));
      return {
        ...state,
        games: [...state.games, action.game]
      };
    }
    case SPEND_CASH:
      return { ...state, cash: state.cash - action.amount };
    case SPEND_THOUGHTS:
      return {
        ...state,
        thoughts: state.thoughts - action.amount
      };
    case TICK: {
      const earnings =
        state.games.length * state.gameMultiplier / ticksPerSecond;
      if (earnings !== 0) {
        action.asyncDispatch(addCash(earnings));
      }

      const cost = state.designers.reduce((t, d) => t + d.ongoingCost, 0);
      if (cost > state.cash) {
        return state;
      }
      action.asyncDispatch(spendCash(cost / ticksPerSecond));

      const tps = state.designers.reduce((t, d) => t + d.tps, 0);
      if (tps !== 0) {
        action.asyncDispatch(think(tps / ticksPerSecond));
      }
      return state;
    }
    case THINK:
      return {
        ...state,
        thoughts: state.thoughts + 1
      };
    default:
      return state;
  }
};

export const idleApp = combineReducers({
  currentStage,
  log,
  stage1
});
