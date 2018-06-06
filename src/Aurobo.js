import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginBox, Dashboard } from '@aurobo/components';
import { DeadCenter } from '@aurobo/components/styles';
import { Sales } from '@aurobo/apps/innovic';

class App extends Component {
  state = {
    isAuthenticated: false,
  };

  handleAuthSuccess = () => {
    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  };

  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.setState({ isAuthenticated: true });
    } else {
      this.logout();
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
              <DeadCenter>
                <LoginBox onAuthSuccess={this.handleAuthSuccess} />
              </DeadCenter>
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
                <Route path="/dashboard" render={() => <Dashboard url="/dashboard" onLogout={this.logout} />} />
                <Route path="/sales" render={() => <Sales url="/sales" onLogout={this.logout} />} />
                <Redirect to="/dashboard" />
              </Switch>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
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
