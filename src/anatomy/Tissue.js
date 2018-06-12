import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Cell } from '@aurobo/anatomy';
import { kebabize } from '../utils';

class Tissue extends React.Component {
  render() {
    const { children, path, renderExact, renderCommon } = this.props;
    let firstChildPath = null;
    return (
      <React.Fragment>
        <Switch>
          {children
            ? React.Children.map(children, (cell, i) => {
                let { name: cellName } = cell.props;
                let cellPath = path + '/' + kebabize(cellName);
                if (i === 0) {
                  firstChildPath = cellPath;
                }
                return <Route render={() => <Cell {...cell.props} path={cellPath} />} path={cellPath} />;
              })
            : null};
          {renderExact || renderCommon ? (
            <Route exact render={renderExact} />
          ) : children ? (
            <Route render={() => <Redirect to={firstChildPath} />} />
          ) : (
            <Route render={() => <Redirect to="/not-found" />} />
          )}
        </Switch>
        {renderCommon ? renderCommon() : null}
      </React.Fragment>
    );
  }
}

export default Tissue;
