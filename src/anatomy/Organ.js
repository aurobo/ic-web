import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Tissue } from '@aurobo/anatomy';

class Organ extends React.Component {
  render() {
    const { children, path, render, name } = this.props;
    console.log(this.props.location);
    let firstChildPath = null;
    return (
      <React.Fragment>
        <h1>{path}</h1>
        <Switch>
          {children
            ? React.Children.map(children, (tissue, i) => {
                const { name: tissueName } = tissue.props;
                let tissuePath = path + '/' + tissueName;
                if (i === 0) {
                  firstChildPath = tissuePath;
                }
                return <Route render={() => <Tissue {...tissue.props} path={tissuePath} />} path={tissuePath} />;
              })
            : null}
          {render ? (
            <Route exact render={render} />
          ) : children ? (
            <Route render={() => <Redirect to={firstChildPath} />} />
          ) : (
            <Route render={() => <Redirect to="/not-found" />} />
          )}
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(Organ);
