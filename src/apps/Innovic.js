import React from 'react';
import { Organism, Organ, Tissue, Cell } from '@aurobo/anatomy';
import { ControlPanel } from '@aurobo/components';
import { Button } from '@aurobo/components/styles';

class Innovic extends React.Component {
  render() {
    return (
      <Organism name="Innovic">
        <Organ name="Master" icon="database">
          <Tissue name="Customer">
            <Cell
              name="List"
              renderControlPanel={() => (
                <ControlPanel title="Customers">
                  <Button size="tiny" flat="true" light="true">
                    Create
                  </Button>
                  <Button size="tiny" flat="true">
                    Import
                  </Button>
                </ControlPanel>
              )}
            />
          </Tissue>
          <Tissue name="Vendor">
            <Cell name="List" renderControlPanel={() => <ControlPanel title="Vendors" />} />
            <Cell name="View" renderControlPanel={() => <ControlPanel title="Vendor" />} />
          </Tissue>
        </Organ>
      </Organism>
    );
  }
}

export default Innovic;
