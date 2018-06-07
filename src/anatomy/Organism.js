import React from 'react';
import { Route, withRouter } from 'react-router-dom';

const Organism = ({ component: Component, name, ...rest }) => {
  return <Route path={rest.match.url + (name || Component.name.toLowerCase())} component={Component} />;
};

export default withRouter(Organism);
