import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '@aurobo/components';

class Organ extends React.Component {
  render() {
    const { name, children, parentPath } = this.props;
    return (
      <React.Fragment>
        <h2>{name}</h2>
        <Switch>
          {children
            ? React.Children.map(children, tissue => {
                const { name: tissueName, render } = tissue.props;
                let path = parentPath + '/' + tissueName;
                return <PrivateRoute render={render} path={path} />;
              })
            : null}
          {/* <Route render={() => <Redirect to="/not-found" />} /> */}
        </Switch>
        {React.Children.map(children, tissue =>
          React.cloneElement(tissue, { parentPath: tissue.props.parentPath + '/' + tissue.props.name })
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Organ);
