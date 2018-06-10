import { FullScreenLoader } from '@aurobo/components';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

class PrivateRoute extends React.Component {
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
    const { component: Component, render, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={() =>
          isAuthenticated !== undefined ? (
            isAuthenticated ? (
              Component ? (
                <Component />
              ) : (
                render()
              )
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            )
          ) : (
            <FullScreenLoader />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
