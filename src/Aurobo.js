import React from 'react';
import { Organism } from '@aurobo/anatomy';
import { Innovic } from '@aurobo/apps';
import Plasma from '@aurobo/plasma';
import firebase from 'firebase/app';
import { Login } from '@aurobo/components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Dashboard } from '@aurobo/components';

var config = {
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
    isAuthenticated: false,
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
      <Plasma.Provider firebase={firebase}>
        <Switch>
          <Route exact path="/login" render={() => (!isAuthenticated ? <Login /> : <Redirect to="/dashboard" />)} />
          <Route
            path="/"
            render={() =>
              isAuthenticated ? (
                <React.Fragment>
                  <Route path="/dashboard" component={Dashboard} />
                  <Organism component={Innovic} />
                </React.Fragment>
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
      </Plasma.Provider>
    );
  }
}

export default Aurobo;
