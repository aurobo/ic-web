import React from 'react';
import { ControlPanel, Button } from '@aurobo/components';
import { Link } from 'react-router-dom';
import { Firestore } from '@aurobo/plasma';
import { Segment } from 'semantic-ui-react';

const List = props => (
  <React.Fragment>
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
    <Segment attached>
      <Firestore.Collection path={props.collectionPath} schemaless>
        {({ collection, isLoading, error }) => (
          <React.Fragment>
            {isLoading ? 'Loading...' : error ? error.message : props.renderTable({ collection })}
          </React.Fragment>
        )}
      </Firestore.Collection>
    </Segment>
  </React.Fragment>
);

export default List;
