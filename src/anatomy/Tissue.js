import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Cell } from '@aurobo/anatomy';

class Tissue extends React.Component {
  render() {
    const { children, path, name, render } = this.props;
    let firstChildPath = null;
    return (
      <React.Fragment>
        <h1>{path}</h1>
        <Switch>
          {children
            ? React.Children.map(children, (cell, i) => {
                const { name: cellName } = cell.props;
                let cellPath = path + '/' + cellName;
                if (i === 0) {
                  firstChildPath = cellPath;
                }
                return <Route render={() => <Cell {...cell.props} path={cellPath} />} path={cellPath} />;
              })
            : null};
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

export default withRouter(Tissue);
