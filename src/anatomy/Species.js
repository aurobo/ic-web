import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

class Species extends React.Component {
  render() {
    return <Switch>{React.Children.map(this.props.children, child => child)}</Switch>;
  }
}

export default withRouter(Species);
