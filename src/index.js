import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "./App.css";

import { hydrate, render } from "react-dom";
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerMiddleware,
  syncHistoryWithStore
} from "react-router-redux";

import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import Routes from "./Routes";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducers from "./reducers";

import App from "./App";
import ComponentOne from "./ComponentOne";
import ComponentTwo from "./ComponentTwo";

const history = createHistory();
const middleware = [routerMiddleware(history), thunk];
if (process.env.NODE_ENV !== "production") {
  //middleware.push(createLogger());
}
//console.log("window.__PRELOADED_STATE__", window.__PRELOADED_STATE__);

// let preloadedState = undefined;

// if (typeof window !== "undefined") {
//   preloadedState = window.__PRELOADED_STATE__;
//   delete window.__PRELOADED_STATE__;
// }
// if (typeof window === "undefined") {
//   global.window = {};
// }

// console.log("window.__INITIAL_STATE__", window.__INITIAL_STATE__);

console.log("preloadedState", window.__INITIAL_STATE__);
const preloadedState = window.__INITIAL_STATE__;
//delete window__INITIAL_STATE__;

export const store = createStore(
  reducers,
  preloadedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const Routes2 = props => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(Routes)}
      </ConnectedRouter>
    </Provider>
  );
};

hydrate(<Routes2 />, document.getElementById("root"));
