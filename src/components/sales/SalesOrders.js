import _ from 'lodash';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import ControlPanel from '@innovic/components/shared/ControlPanel';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { Link } from 'react-router-dom';
import { FlatButton } from '@innovic/components/shared';
import TableWithSorting from '@innovic/components/shared/TableWithSorting';
import Api from '@innovic/components/shared/Api';
import React from 'react';
import Plasma, { Firestore } from '@innovic/plasma';
import firebase from 'firebase/app';

class SalesOrders extends React.Component {
  render() {
    return (
      <div>
        <Plasma.Provider instance={firebase}>
          <ControlPanel title="Sales Orders">
            <Popup
              inverted
              trigger={
                <span>
                  <FlatButton size="tiny" primary disabled>
                    Create
                  </FlatButton>
                </span>
              }
              content="Temporarily inactive. Use import method instead."
            />
            <Link to="/sales/import-excel">
              <FlatButton size="tiny">Import</FlatButton>
            </Link>
          </ControlPanel>
          <Firestore.Collection path="salesOrders" schemaless>
            {({ collection, isLoading, error }) => (
              <div>{isLoading ? 'Loading...' : error ? error.message : JSON.stringify(collection)}</div>
            )}
          </Firestore.Collection>
          <Firestore.Document path="salesOrders/abc" schemaless>
            {({ doc, isLoading, error }) => (
              <div>{isLoading ? 'Loading...' : error ? error.message : JSON.stringify(doc)}</div>
            )}
          </Firestore.Document>
        </Plasma.Provider>
      </div>
    );
  }
}

export default SalesOrders;
