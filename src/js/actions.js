export const ADD_CASH = "ADD_CASH";

export const addCash = amount => ({ type: ADD_CASH, amount });

export const HIRE_DESIGNER = "HIRE_DESIGNER";

export const hireDesigner = (quality, tps) => ({
  type: HIRE_DESIGNER,
  quality,
  tps
});

export const RELEASE_GAME = "RELEASE_GAME";

export const releaseGame = amount => ({ type: RELEASE_GAME, amount });

export const RESET_STAGE = "RESET_STAGE";

export const resetStage = () => ({ type: RESET_STAGE });

export const SPEND_CASH = "SPEND_CASH";

export const spendCash = amount => ({ type: SPEND_CASH, amount });

export const SPEND_THOUGHTS = "SPEND_THOUGHTS";

export const spendThoughts = amount => ({ type: SPEND_THOUGHTS, amount });

export const THINK = "THINK";

export const think = amount => ({ type: THINK, amount });

export const TICK = "TICK";

export const tick = () => ({ type: TICK });

export const UPDATE_STAGE = "UPDATE_STAGE";

export const updateStage = stage => ({ type: UPDATE_STAGE, stage });
