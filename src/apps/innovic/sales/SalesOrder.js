import { FlatButton, StyledTable } from '@aurobo/components';
import ControlPanel from '@aurobo/components/ControlPanel';
import Plasma, { Firestore } from '@aurobo/plasma';
import firebase from 'firebase';
import _ from 'lodash';
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'react-router/Route';
import { Checkbox, Icon, Input, Segment } from 'semantic-ui-react';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import SalesOrderForm from './SalesOrderForm';
// const SalesOrderSection = styled(Message)`
//   &&& {
//     margin: 15px auto;
//     border-radius: 0;
//     background: #fff;
//   }
//   @media screen {
//     width: 80%;
//   }
// `;

// const StyledDropdown = styled(Dropdown)`
//   &&& {
//     border-radius: 0;
//     padding: 8.5px;
//   }
// `;

class SalesOrder extends React.Component {
  // state = {
  //   hasError: false,
  //   column: null,
  //   salesOrderItems: null,
  //   direction: null,
  //   loading: true,
  //   salesOrder: {
  //     key: '',
  //     metaData: {},
  //     invoices: [],
  //     links: [],
  //   },
  // };

  // data = {
  //   customer: 'preexisting ',
  //   customerReference: '',
  //   meta: {
  //     createdBy: { email: 'admin@aurobo.in', uid: '2s5JSVnyPJVGDikjZld8huUNwtL2' },
  //     createdOn: { seconds: 1527752386, nanoseconds: 336000000 },
  //     lastModifiedBy: { email: 'admin@aurobo.in', uid: '2s5JSVnyPJVGDikjZld8huUNwtL2' },
  //     lastModifiedOn: { seconds: 1527752386, nanoseconds: 336000000 },
  //   },
  // };

  // componentDidMount() {
  //   let config = {
  //     onDownloadProgress: progressEvent => this.setState({ loading: false }),
  //   };
  //   api
  //     .get('/salesorders/' + this.props.match.params.id, config)
  //     .then(response => {
  //       _.each(response.data.salesOrderItems, item => {
  //         item.invoicedQuantity = item.metaData.remainingQuantity;
  //         item.quantity < item.invoicedQuantity || item.invoicedQuantity <= 0
  //           ? (item.valid = false)
  //           : (item.valid = true);
  //         item.checked = false;
  //       });
  //       this.setState({
  //         salesOrderItems: response.data.salesOrderItems,
  //         salesOrder: response.data,
  //       });
  //     })
  //     .catch(error => {});
  // }

  // handleSort = clickedColumn => () => {
  //   const { column, salesOrderItems, direction } = this.state;

  //   if (column !== clickedColumn) {
  //     this.setState({
  //       column: clickedColumn,
  //       salesOrderItems: _.sortBy(salesOrderItems, [clickedColumn]),
  //       direction: 'ascending',
  //     });

  //     return;
  //   }

  //   this.setState({
  //     salesOrderItems: salesOrderItems.reverse(),
  //     direction: direction === 'ascending' ? 'descending' : 'ascending',
  //   });
  // };

  // handleQuantityChange = (event, id) => {
  //   let salesOrderItems = { ...this.state.salesOrderItems };

  //   _.map(salesOrderItems, item => {
  //     if (item.id === id) {
  //       item.invoicedQuantity = event.target.value;
  //       item.quantity < item.invoicedQuantity || item.invoicedQuantity <= 0
  //         ? (item.valid = false)
  //         : (item.valid = true);
  //     }
  //   });

  //   this.setState({ salesOrderItems });
  // };

  // handleItemCheck = (event, data, id) => {
  //   let salesOrderItems = { ...this.state.salesOrderItems };

  //   _.map(salesOrderItems, item => {
  //     if (item.id === id) {
  //       item.checked = data.checked;
  //     }
  //   });

  //   this.setState({ salesOrderItems });
  // };

  // handleSubmitInvoice = () => {
  //   let checkedSalesOrderItems = _.filter(this.state.salesOrderItems, item => {
  //     return item.checked;
  //   });

  //   let invoice = {
  //     salesOrderId: this.state.salesOrder.id,
  //     invoiceItems: _.map(checkedSalesOrderItems, item => {
  //       return { salesOrderItemId: item.id, quantity: item.invoicedQuantity, materialId: item.materialId };
  //     }),
  //   };

  //   let config = {
  //     onDownloadProgress: progressEvent => this.setState({ loading: false }),
  //   };

  //   this.setState({ loading: true });

  //   api
  //     .post('/invoices', invoice, config)
  //     .then(response => {
  //       this.props.history.push('/sales/invoices/' + response.data.id);
  //     })
  //     .catch(error => {
  //       this.setState({ hasError: true });
  //     });
  // };

  render() {
    const { column, salesOrderItems, direction, hasError } = this.state;
    return (
      <Switch>
        <Route
          path="/sales/sales-orders/:id/invoice"
          render={() => (
            <div>
              <ControlPanel
                title={'Sales Orders / ' + this.state.salesOrder.key + ' / New Invoice'}
                loading={this.state.loading}
                className="no-print"
              >
                <FlatButton primary size="tiny" onClick={this.handleSubmitInvoice}>
                  Submit
                </FlatButton>
              </ControlPanel>
              {hasError ? (
                <Segment>
                  <Message negative floating icon>
                    <Icon name="meh" />
                    <Message.Content>
                      <Message.Header>Error</Message.Header>
                    </Message.Content>
                  </Message>
                </Segment>
              ) : (
                ''
              )}
              <StyledTable sortable celled fixed compact selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">Select</Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'number' ? direction : null}
                      onClick={this.handleSort('number')}
                    >
                      Item Number
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'materialNumber' ? direction : null}
                      onClick={this.handleSort('materialNumber')}
                    >
                      Material Number
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'description' ? direction : null}
                      onClick={this.handleSort('description')}
                    >
                      Description
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'unitPrice' ? direction : null}
                      onClick={this.handleSort('unitPrice')}
                    >
                      Unit Price
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'quantity' ? direction : null}
                      onClick={this.handleSort('quantity')}
                    >
                      Quantity
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'value' ? direction : null} onClick={this.handleSort('value')}>
                      Value
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(
                    salesOrderItems,
                    ({
                      id,
                      number,
                      materialNumber,
                      description,
                      unitPrice,
                      metaData,
                      invoicedQuantity,
                      value,
                      valid,
                      checked,
                    }) => (
                      <Table.Row key={id}>
                        <Table.Cell textAlign="center">
                          <Checkbox
                            disabled={!valid}
                            checked={checked && valid}
                            onChange={(e, data) => this.handleItemCheck(e, data, id)}
                          />
                        </Table.Cell>
                        <Table.Cell>{number}</Table.Cell>
                        <Table.Cell>{materialNumber}</Table.Cell>
                        <Table.Cell>{description}</Table.Cell>
                        <Table.Cell>{unitPrice}</Table.Cell>
                        <Table.Cell>
                          <Input
                            label={{
                              basic: true,
                              content: metaData.remainingQuantity - invoicedQuantity,
                            }}
                            labelPosition="right"
                            value={invoicedQuantity}
                            onChange={e => this.handleQuantityChange(e, id)}
                            size="mini"
                            error={!valid}
                          />
                        </Table.Cell>
                        <Table.Cell>{value}</Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </StyledTable>
            </div>
          )}
        />
        <Route
          path="/sales/sales-orders/create"
          render={() => (
            <React.Fragment>
              <ControlPanel
                title={'Sales Orders / ' + this.state.salesOrder.key + ' / New Invoice'}
                loading={this.state.loading}
                className="no-print"
              />
              <Plasma.Provider instance={firebase}>
                <Firestore.Set
                  collectionPath="salesOrders"
                  schemaless
                  onSubmit={data => this.setState({ creating: false })}
                >
                  {({ set, batch, isLoading, error }) => <SalesOrderForm set={set} batch={batch} />}
                </Firestore.Set>
              </Plasma.Provider>
            </React.Fragment>
          )}
        />
        <Route
          path="/sales/sales-orders/:id"
          render={() => (
            <div>
              <ControlPanel
                title={'Sales Orders / ' + this.state.salesOrder.key + ' / New Invoice'}
                loading={this.state.loading}
                className="no-print"
              />
              <Plasma.Provider instance={firebase}>
                <Firestore.Document path={`salesOrders/${this.props.match.params.id}`} schemaless>
                  {({ doc, isLoading, error }) =>
                    isLoading ? null : (
                      <Firestore.Set collectionPath={`salesOrders`} schemaless>
                        {({ set, batch, isLoading, error }) => (
                          <SalesOrderForm
                            set={set}
                            batch={batch}
                            data={{ id: doc.id, customer: doc.customer, customerReference: doc.customerReference }}
                          />
                        )}
                      </Firestore.Set>
                    )
                  }
                </Firestore.Document>
              </Plasma.Provider>
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default SalesOrder;
