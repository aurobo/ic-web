import React from 'react';
import { withRouter } from 'react-router-dom';

class Cell extends React.Component {
  render() {
    const { component: Component, name, path } = this.props;
    return (
      <React.Fragment>
        <h1>{path}</h1>
      </React.Fragment>
    );
  }
}

export default withRouter(Cell);
