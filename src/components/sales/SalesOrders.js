import { ControlPanel, FlatButton } from '@innovic/components/shared';
import Plasma, { Firestore } from '@innovic/plasma';
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
      <Plasma.Provider instance={firebase}>
        <ControlPanel title="Sales Orders">
          <Modal
            trigger={
              <FlatButton size="tiny" onClick={this.handleModalOpen}>
                Create
              </FlatButton>
            }
            open={this.state.creating}
            onClose={this.handleModalClose}
          >
            <Plasma.Provider instance={firebase}>
              <Modal.Header>Create Sales Order</Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  <Header>Modal Header</Header>
                  <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
                </Modal.Description>
                <Firestore.Create
                  path="salesOrders"
                  alias="SO"
                  schemaless
                  onSubmit={() => this.setState({ creating: false })}
                >
                  {({ create }) => (
                    <Formik
                      initialValues={{ customer: '', customerReference: '' }}
                      onSubmit={create}
                      render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                          <Input
                            type="text"
                            name="customer"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.customer}
                          />
                          {touched.customer && errors.customer && <div>{errors.customer}</div>}
                          <Input
                            type="password"
                            name="customerReference"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.customerReference}
                          />
                          {touched.customerReference &&
                            errors.customerReference && <div>{errors.customerReference}</div>}
                          <FlatButton type="submit" disabled={isSubmitting}>
                            Submit
                          </FlatButton>
                        </form>
                      )}
                    />
                  )}
                </Firestore.Create>
              </Modal.Content>
              <Modal.Actions>
                <FlatButton primary>
                  Proceed <Icon name="chevron right" />
                </FlatButton>
              </Modal.Actions>
            </Plasma.Provider>
          </Modal>
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
