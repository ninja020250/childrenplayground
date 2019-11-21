import { HomePage, Login } from "./page";
import { Route, Switch } from "react-router-dom";

import React from "react";

class App extends React.Component {
  componentDidMount() {
    document.getElementById("init-loading").style.display = "none";
  }
  render() {
    return (
      <div className="App">
        {/* <!-- Preload page --> */}
        <div className="circle-load" id="init-loading">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login"  component={Login} />
          <Route path="/home" component={HomePage} />
          <Route component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
