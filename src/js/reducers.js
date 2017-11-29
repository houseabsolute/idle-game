import { combineReducers } from "redux";

import {
  ADD_CASH,
  RESET_STAGE,
  SPEND_CASH,
  SPEND_THOUGHTS,
  THINK,
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

const stage1 = (state = { thoughts: 0 }, action) => {
  switch (action.type) {
    case THINK:
      return {
        ...state,
        thoughts: state.thoughts + 1
      };
    case SPEND_THOUGHTS:
      return {
        ...state,
        thoughts: state.thoughts - action.amount
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
