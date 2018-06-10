import React from 'react';
import { withRouter } from 'react-router-dom';
import { PrivateRoute } from '@aurobo/components';

class Cell extends React.Component {
  render() {
    const { component: Component, name, parentPath } = this.props;
    const path = parentPath + '/' + name;
    return (
      <React.Fragment>
        <div>Cell</div>
      </React.Fragment>
    );
  }
}

export default withRouter(Cell);
