import React from 'react';

class Cell extends React.Component {
  render() {
    const { renderControlPanel } = this.props;
    return <React.Fragment>{renderControlPanel()}</React.Fragment>;
  }
}

export default Cell;
