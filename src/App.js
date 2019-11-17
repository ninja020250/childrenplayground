import { HomePage, Login } from "./page";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import React from "react";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={HomePage} />
        <Route component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
