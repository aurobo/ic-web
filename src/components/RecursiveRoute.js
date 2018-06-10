import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '@aurobo/components';

const RecursiveRoute = ({ component: Component, children, name, parentPath, ...rest }) => {
  const path = parentPath ? parentPath + '/' + name : '/' + name;
  console.log(rest.match);
  console.log(path);
  return (
    <React.Fragment>
      <PrivateRoute {...rest} path={path} component={Component} />
      {children ? React.Children.map(children, child => <RecursiveRoute {...child.props} parentPath={path} />) : ''}
    </React.Fragment>
  );
};

export default withRouter(RecursiveRoute);
