import { ControlPanel, FlatButton } from '@aurobo/components';
import Plasma, { Firestore } from '@aurobo/plasma';
import firebase from 'firebase/app';
import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Header, Icon, Input, Modal, Segment } from 'semantic-ui-react';

class SalesOrders extends React.Component {
  state = {
    creating: false,
  };

  handleModalOpen = e => {
    this.setState({ creating: true });
  };

  handleModalClose = e => {
    this.setState({ creating: false });
  };

  componentWillMount() {
    // Mousetrap.bind('1', this.handleModalOpen);
  }

  componentWillUnmount() {
    // Mousetrap.unbind('1', this.handleModalOpen);
  }

  render() {
    return (
      <Plasma.Provider firebase={firebase}>
        <ControlPanel title="Sales Orders">
          <Link to="innovic/sales/salesorder/create">
            <FlatButton size="tiny">Create</FlatButton>
          </Link>
          <Link to="/sales/import-excel">
            <FlatButton size="tiny">Import</FlatButton>
          </Link>
        </ControlPanel>
        <Segment attached>
          <Firestore.Collection path="salesOrders" schemaless>
            {({ collection, isLoading, error }) => (
              <div>
                {isLoading ? (
                  'Loading...'
                ) : error ? (
                  error.message
                ) : (
                  <ReactTable
                    className="-highlight"
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id])
                        .toLowerCase()
                        .includes(String(filter.value).toLowerCase())
                    }
                    data={collection}
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
                    defaultPageSize={25}
                    pageSizeOptions={[25, 50, 75, 100]}
                    showPaginationBottom
                    style={{
                      height: 'calc(100vh - 182px)',
                    }}
                    filterable={true}
                    // defaultSorted={[
                    //   {
                    //     id: 'id',
                    //     desc: true,
                    //   },
                    // ]}
                  />
                )}
              </div>
            )}
          </Firestore.Collection>
        </Segment>
      </Plasma.Provider>
    );
  }
}

export default SalesOrders;
