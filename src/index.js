import "antd/dist/antd.css";
import "./styles/index.scss";

import * as serviceWorker from "./serviceWorker";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
