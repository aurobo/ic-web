import React from 'react';
import { Organism, Organ, Tissue, Cell } from '@aurobo/anatomy';

const innovic = {
  name: 'Innovic',
  alias: 'innovic',
  component: () => (
    <Organism name="innovic" render={() => <h1 />}>
      <Organ name="sales" render={() => <h1 />} />
      <Organ name="master" render={() => <h1 />}>
        <Tissue name="vendor" render={() => <h1 />} />
        <Tissue name="customer" render={() => <h1 />}>
          <Cell name="customer-list" render={() => <h1 />} />
        </Tissue>
      </Organ>
    </Organism>
  ),
};

const organisms = [innovic];

export { organisms };
