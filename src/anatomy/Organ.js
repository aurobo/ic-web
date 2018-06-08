import React from 'react';
import { withRouter } from 'react-router-dom';
import { PrivateRoute } from '@aurobo/components';

class Organ extends React.Component {
  render() {
    const { component: Component, name, url } = this.props;
    return (
      <React.Fragment>
        <PrivateRoute
          path={(url || this.props.match.url) + '/' + (name || Component.name.toLowerCase())}
          component={Component}
        />
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            url: (url || this.props.match.url) + '/' + (name || Component.name.toLowerCase()),
          })
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Organ);
