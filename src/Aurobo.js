import React from 'react';
import Organism from '@aurobo/anatomy/Organism';
import Innovic from '@aurobo/apps/innovic';

class Aurobo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Organism component={Innovic} />
      </React.Fragment>
    );
  }
}

export default Aurobo;
