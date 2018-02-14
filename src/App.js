import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginBox from "./components/common/LoginBox";
import Dashboard from "./components/common/Dashboard";
import Sales from "./components/mApps/Sales";
import LoginLayout from "./components/common/LoginLayout";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <LoginLayout>
              <LoginBox />
            </LoginLayout>
          )}
        />
        <Route
          path="/"
          render={() => (
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/sales" component={Sales} />
            </Switch>
          )}
        />
      </Switch>
    );
  }
}

export default App;
