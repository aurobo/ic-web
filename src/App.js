import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginBox from '@innovic/components/shared/LoginBox';
import Dashboard from '@innovic/components/shared/Dashboard';
import LoginLayout from '@innovic/components/shared/LoginLayout';
import Sales from '@innovic/components/sales';
import Redirect from 'react-router/Redirect';
import Purchase from '@innovic/components/purchase';
import NotFound from '@innovic/components/shared/NotFound';

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
                <Route path="/404" component={NotFound} />
                <Route path="/dashboard" render={() => <Dashboard url="/dashboard" onLogout={this.logout} />} />
                <Route path="/sales" render={() => <Sales url="/sales" onLogout={this.logout} />} />
                <Route path="/purchase" render={() => <Purchase url="/purchase" onLogout={this.logout} />} />
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
