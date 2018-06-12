import { Dashboard, Login, FullScreenLoader, PrivateRoute, NotFound } from '@aurobo/components';
import Plasma from '@aurobo/plasma';
import firebase from 'firebase/app';
import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { kebabize, camelize } from './utils';

const theme = {
  primary: { default: '#4a148c', light: '#7c43bd', dark: '#12005e' },
  secondary: { default: '#00c853', light: '#5efc82', dark: '#009624' },
};

const config = {
  apiKey: process.env.REACT_APP_AUROBO_API_KEY,
  authDomain: process.env.REACT_APP_AUROBO_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_AUROBO_DATABASE_URL,
  projectId: process.env.REACT_APP_AUROBO_PROJECT_ID,
  storageBucket: process.env.REACT_APP_AUROBO_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_AUROBO_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

class Aurobo extends React.Component {
  state = {
    isAuthenticated: undefined,
  };

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(
        user => (user ? this.setState({ isAuthenticated: true }) : this.setState({ isAuthenticated: false }))
      );
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Plasma.Provider firebase={firebase}>
            <Switch>
              <Route
                exact
                path="/login"
                render={() =>
                  isAuthenticated !== undefined ? (
                    !isAuthenticated ? (
                      <Login />
                    ) : (
                      <Redirect to="/dashboard" />
                    )
                  ) : (
                    <FullScreenLoader />
                  )
                }
              />
              <PrivateRoute
                path="/dashboard"
                render={() => (
                  <Dashboard
                    name="Dashboard"
                    url="/dashboard"
                    links={this.props.organisms.map(organism => ({
                      iconProps: organism.iconProps,
                      to: '/' + kebabize(organism.name),
                      name: organism.name,
                    }))}
                  />
                )}
              />
              {this.props.organisms.map(organism => (
                <PrivateRoute
                  key={camelize(organism.name)}
                  path={'/' + kebabize(organism.name)}
                  component={organism.component}
                />
              ))}
              <Route path="/not-found" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </Plasma.Provider>
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export default Aurobo;
