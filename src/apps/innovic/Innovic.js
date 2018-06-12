import React from 'react';
import { Organism, Organ, Tissue, Cell } from '@aurobo/anatomy';
import { ControlPanel, Button } from '@aurobo/components';

const List = props => (
  <ControlPanel title={props.title}>
    <Button size="tiny" flat="true" light="true">
      Create
    </Button>
    <Button size="tiny" flat="true">
      Import
    </Button>
  </ControlPanel>
);

class Innovic extends React.Component {
  render() {
    return (
      <Organism name="Innovic">
        <Organ name="Master Zero" icon="database">
          <Tissue name="Customer">
            <Cell name="List" render={() => <List title="Customers" />} />
          </Tissue>
          <Tissue name="Vendor">
            <Cell name="List" render={() => <List title="Vendors" />} />
            <Cell name="View" render={() => <List title="Vendor /" />} />
          </Tissue>
        </Organ>
        <Organ name="Purchase" icon="truck" renderExact={() => <List title="Vendors" />} />
      </Organism>
    );
  }
}

export default Innovic;
