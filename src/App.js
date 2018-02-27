import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginBox from "./components/common/LoginBox";
import Dashboard from "./components/common/Dashboard";
import LoginLayout from "./components/common/LoginLayout";
import Sales from "./components/areas/sales";
import Redirect from "react-router/Redirect";

class App extends Component {
  state = {
    isAuthenticated: false
  };

  handleAuthSuccess = () => {
    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  };

  componentWillMount() {
    if (window.localStorage.getItem("token")) {
      this.setState({ isAuthenticated: true });
    }
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/login"
          render={() =>
            !this.state.isAuthenticated ? (
              <LoginLayout>
                <LoginBox onAuthSuccess={this.handleAuthSuccess} />
              </LoginLayout>
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          path="/"
          render={() =>
            this.state.isAuthenticated ? (
              <Switch>
                <Route
                  path="/dashboard"
                  render={() => (
                    <Dashboard url="/dashboard" onLogout={this.logout} />
                  )}
                />
                <Route
                  path="/sales"
                  render={() => <Sales url="/sales" onLogout={this.logout} />}
                />
                <Redirect to="/dashboard" />
              </Switch>
            ) : (
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
            )
          }
        />
      </Switch>
    );
  }
}

export default App;
