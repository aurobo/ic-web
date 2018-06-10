import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { PrivateRoute } from '@aurobo/components';

class Tissue extends React.Component {
  render() {
    const { children, parentPath } = this.props;
    return (
      <React.Fragment>
        {children
          ? React.Children.map(children, cell => {
              const { component: cellComponent, name: cellName } = cell.props;
              let cellPath = parentPath + '/' + cellName;
              return <PrivateRoute path={cellPath} component={cellComponent} />;
            })
          : null}
      </React.Fragment>
    );
  }
}

export default withRouter(Tissue);
