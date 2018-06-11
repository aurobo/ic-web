import React from 'react';
import { ControlPanel } from '@aurobo/components';

class Cell extends React.Component {
  render() {
    const { controlPanel } = this.props;
    return (
      <React.Fragment>
        <ControlPanel>{controlPanel()}</ControlPanel>
      </React.Fragment>
    );
  }
}

export default Cell;
