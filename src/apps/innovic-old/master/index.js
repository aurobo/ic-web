import Tissue from '@aurobo/anatomy/Tissue';
import React from 'react';
import Material from './material';

class Master extends React.Component {
  render() {
    return (
      <div>
        I am Master
        <Tissue component={Material} />
      </div>
    );
  }
}

export default Master;
