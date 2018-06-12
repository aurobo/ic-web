import React from 'react';
import { ControlPanel, Button } from '@aurobo/components';
import { Link } from 'react-router-dom';

const Import = props => (
  <ControlPanel title={props.title}>
    <Link to={props.cells.create}>
      <Button size="tiny" flat="true" light="true">
        Create
      </Button>
    </Link>
    <Link to={props.cells.import}>
      <Button size="tiny" flat="true">
        Import
      </Button>
    </Link>
  </ControlPanel>
);

export default Import;
