import React from 'react';

class Cell extends React.Component {
  render() {
    return <React.Fragment>{this.props.render()}</React.Fragment>;
  }
}

export default Cell;
