import { combineReducers } from "redux";

import {
  ADD_CASH,
  addCash,
  DESIGNER_TICK,
  designerTick,
  GAME_TICK,
  gameTick,
  HIRE_DESIGNER,
  RELEASE_GAME,
  RESET_STAGE,
  SPEND_CASH,
  SPEND_THOUGHTS,
  THINK,
  think,
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

const tickTime = 100;
const ticksPerSecond = 1000 / tickTime;

const stage1 = (
  state = {
    designers: [],
    designerTimers: [],
    games: 0,
    gameTimers: [],
    gameValue: 1,
    thoughts: 500
  },
  action
) => {
  switch (action.type) {
    case DESIGNER_TICK: {
      action.asyncDispatch(
        think(state.designers.reduce((t, d) => t + d.tps) / ticksPerSecond)
      );
      return state;
    }
    case GAME_TICK: {
      action.asyncDispatch(
        addCash(state.games * state.gameValue / ticksPerSecond)
      );
      return state;
    }
    case HIRE_DESIGNER: {
      const id = setInterval(() => {
        action.asyncDispatch(designerTick());
      }, tickTime);
      return {
        ...state,
        designerTimers: [...state.designerTimers, id],
        designers: [
          ...state.designers,
          { quality: action.quality, tps: action.tps }
        ]
      };
    }
    case RELEASE_GAME: {
      const id = setInterval(() => {
        action.asyncDispatch(gameTick());
      }, tickTime);
      return {
        ...state,
        gameTimers: [...state.gameTimers, id],
        games: state.games + 1
      };
    }
    case SPEND_THOUGHTS:
      return {
        ...state,
        thoughts: state.thoughts - action.amount
      };
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
