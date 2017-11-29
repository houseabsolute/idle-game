import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import idleApp from "./reducers";
import App from "./App";

const logger = store => next => action => {
  console.log("will dispatch", action);
  const returnValue = next(action);
  console.log("state after dispatch", store.getState());
  return returnValue;
};

const store = createStore(idleApp, undefined, applyMiddleware(logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
