import React from 'react';
import { Organism, Organ, Tissue, Cell } from '@aurobo/anatomy';
import Create from './Create';
import Import from './Import';
import List from './List';
import Plasma, { Firestore } from '@aurobo/plasma';
import firebase from 'firebase/app';
import { FullScreenLoader } from '@aurobo/components';
import Table from './Table';

let innovicApp = null;

class Innovic extends React.Component {
  render() {
    return (
      <Firestore.Document path="apps/innovic" schemaless>
        {({ doc, isLoading }) => {
          if (!isLoading && doc) {
            if (!innovicApp) {
              innovicApp = firebase.initializeApp(doc.firebaseConfig, 'innovic');
            }
            return (
              <Plasma.Provider firebase={innovicApp} user={firebase.auth().currentUser}>
                <Organism name="Innovic">
                  <Organ name="Master" iconProps={{ name: 'database' }}>
                    <Tissue name="Customer">
                      <Cell name="List" render={() => <List title="Customers" />} />
                    </Tissue>
                    <Tissue name="Vendor">
                      <Cell name="List" render={() => <List title="Vendors" />} />
                    </Tissue>
                  </Organ>
                  <Organ name="Sales" iconProps={{ name: 'truck', flipped: 'horizontally' }}>
                    <Tissue name="Sales Order">
                      <Cell name="List">
                        {props => (
                          <List
                            title="Sales Orders"
                            {...props}
                            collectionPath="salesOrders"
                            renderTable={({ collection }) => (
                              <Table
                                columns={[
                                  {
                                    Header: 'Key',
                                    accessor: 'key',
                                  },
                                  {
                                    Header: 'Id',
                                    accessor: 'id',
                                  },
                                  {
                                    Header: 'Customer',
                                    accessor: 'customer',
                                  },
                                  {
                                    Header: 'Customer Reference',
                                    accessor: 'customerReference',
                                  },
                                ]}
                                data={collection}
                              />
                            )}
                          />
                        )}
                      </Cell>
                      <Cell name="Create">{props => <Create title="Create Sales Order" {...props} />}</Cell>
                      <Cell name="Import">{props => <Import title="Import Sales Order" {...props} />}</Cell>
                    </Tissue>
                  </Organ>
                  <Organ name="Purchase" iconProps={{ name: 'truck' }} renderExact={() => <List title="Vendors" />} />
                </Organism>
              </Plasma.Provider>
            );
          }

          return <FullScreenLoader />;
        }}
      </Firestore.Document>
    );
  }
}

export default Innovic;
