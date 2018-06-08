import React from 'react';
import { withRouter } from 'react-router-dom';
import { PrivateRoute } from '@aurobo/components';

const Organism = ({ component: Component, name, ...rest }) => {
  const url = rest.match.url + '/' + (name || Component.name.toLowerCase());
  return (
    <React.Fragment>
      <PrivateRoute path={url} component={Component} />
      {React.Children.map(rest.children, child =>
        React.cloneElement(child, {
          url: url,
        })
      )}
    </React.Fragment>
  );
};

export default withRouter(Organism);
