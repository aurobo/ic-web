import React from 'react';
import { PrivateRoute, NotFound, TopNav } from '@aurobo/components';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom';

const Organism = ({ component, children, name, ...rest }) => {
  return (
    <React.Fragment>
      <h1>{name}</h1>
      <Switch>
        {children
          ? React.Children.map(children, organ => {
              const { name: organName, render } = organ.props;
              let path = '/' + name + '/' + organName;
              return <PrivateRoute render={render} path={path} />;
            })
          : null}
        {/* <Route render={() => <Redirect to="/not-found" />} /> */}
      </Switch>
      {React.Children.map(children, organ =>
        React.cloneElement(organ, { parentPath: '/' + name + '/' + organ.props.name })
      )}
    </React.Fragment>
  );
};

export default withRouter(Organism);
