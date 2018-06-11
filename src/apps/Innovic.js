import React from 'react';
import { Organism, Organ, Tissue, Cell } from '@aurobo/anatomy';

class Innovic extends React.Component {
  render() {
    return (
      <Organism name="Innovic">
        <Organ name="Master" icon="database">
          <Tissue name="Customer">
            <Cell name="List" controlPanel={() => <h2>Custom Stuff</h2>} />
          </Tissue>
          <Tissue name="Vendor">
            <Cell name="List" controlPanel={() => <h2>Custom Stuff</h2>} />
            <Cell name="View" controlPanel={() => <h2>Custom Stuff</h2>} />
          </Tissue>
        </Organ>
      </Organism>
    );
  }
}

export default Innovic;
