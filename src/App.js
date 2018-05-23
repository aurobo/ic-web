import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginBox, Dashboard, LoginLayout, NotFound } from '@innovic/components/shared';
import { Sales, Master, Purchase } from '@innovic/components';
import firebase from 'firebase';

class App extends Component {
  state = {
    isAuthenticated: false,
  };

  handleAuthSuccess = () => {
    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        response => {
          window.localStorage.clear();
          this.setState({ isAuthenticated: false });
        },
        error => {
          console.log(error.code + ' ' + error.message);
        }
      );
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        console.log('current User' + JSON.stringify(firebase.auth().currentUser));
        this.setState({ isAuthenticated: true });
      } else {
        this.logout();
      }
    });
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
                <Route path="/master" render={() => <Master url="/master" onLogout={this.logout} />} />
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
