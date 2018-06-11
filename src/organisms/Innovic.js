import React from 'react';
import { Organism, Organ, Tissue, Cell } from '@aurobo/anatomy';

class Innovic extends React.Component {
  render() {
    return (
      <Organism name="Innovic">
        <Organ name="Sales" />
        <Organ name="Master" render={() => <h1>Custom Stuff</h1>}>
          <Tissue name="Customer">
            <Cell name="List" render={() => <h1>Custom Stuff</h1>} />
          </Tissue>
          <Tissue name="Vendor" render={() => <h1>Custom Stuff</h1>} />
        </Organ>
      </Organism>
    );
  }
}

export default Innovic;
