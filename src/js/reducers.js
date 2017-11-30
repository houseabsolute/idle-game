import { combineReducers } from "redux";

import {
  ADD_CASH,
  addCash,
  RELEASE_GAME,
  RESET_STAGE,
  SPEND_CASH,
  SPEND_THOUGHTS,
  THINK,
  think,
  TICK,
  UPDATE_STAGE
} from "./actions";

const cash = (state = 0, action) => {
  switch (action.type) {
    case ADD_CASH:
      return state + action.amount;
    case SPEND_CASH:
      return state - action.amount;
    default:
      return state;
  }
};

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

const stage1 = (state = { designers: 0, games: 0, thoughts: 0 }, action) => {
  switch (action.type) {
    case RELEASE_GAME: {
      return {
        ...state,
        games: state.games + action.amount
      };
    }
    case SPEND_THOUGHTS:
      return {
        ...state,
        thoughts: state.thoughts - action.amount
      };
    case TICK: {
      if (state.games) {
        action.asyncDispatch(addCash(state.games));
      }
      if (state.designers) {
        action.asyncDispatch(think(state.designers));
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

const idleApp = combineReducers({
  cash,
  currentStage,
  stage1
});

export default idleApp;
