import React from 'react';
import { ControlPanel } from '@aurobo/components';

class Cell extends React.Component {
  render() {
    const { name, renderControlPanel, renderBody } = this.props;
    return (
      <React.Fragment>
        <ControlPanel title={name}>{renderControlPanel()}</ControlPanel>
        {renderBody()}
      </React.Fragment>
    );
  }
}

export default Cell;
