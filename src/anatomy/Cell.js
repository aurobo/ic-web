import React from 'react';

class Cell extends React.Component {
  render() {
    const { path, cells } = this.props;
    return <React.Fragment>{this.props.children({ path, cells })}</React.Fragment>;
  }
}

export default Cell;
