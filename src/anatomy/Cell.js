import React from 'react';
import { Route, withRouter } from 'react-router-dom';

class Cell extends React.Component {
  render() {
    const { component: Component, name } = this.props;
    return <Route path={this.props.match.url + '/' + (name || Component.name.toLowerCase())} component={Component} />;
  }
}

export default withRouter(Cell);
