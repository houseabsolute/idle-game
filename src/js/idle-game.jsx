import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import { addCash, hireDesigner, think, tick } from "./actions";
import { idleApp, tickTime } from "./reducers";
import App from "./App";

const logger = store => next => action => {
  console.log("will dispatch", action);
  const returnValue = next(action);
  console.log("state after dispatch", store.getState());
  return returnValue;
};

const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

const store = createStore(
  idleApp,
  undefined,
  applyMiddleware(asyncDispatchMiddleware, logger)
);

store.dispatch(addCash(5000));
store.dispatch(think(1000));
store.dispatch(
  hireDesigner({ hiringCost: 0, ongoingCost: 5, quality: "mediocre", tps: 1 })
);
store.dispatch(
  hireDesigner({ hiringCost: 0, ongoingCost: 8, quality: "mediocre", tps: 2 })
);

setInterval(() => store.dispatch(tick()), tickTime);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
