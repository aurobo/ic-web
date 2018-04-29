import _ from 'lodash';
import React from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import ControlPanel from '../../common/ControlPanel';
import { api } from '../../common/Utilities';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import styled from 'styled-components';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import innovicLogo from '../../../img/innovic-logo.png';
import { FlatButton, StyledTable } from '../../common';
import Link from 'react-router-dom/Link';
import Route from 'react-router/Route';
import { Switch } from 'react-router-dom';
import { Input, Checkbox, Dropdown, Segment, Icon } from 'semantic-ui-react';

const SalesOrderSection = styled(Message)`
  &&& {
    margin: 15px auto;
    border-radius: 0;
    background: #fff;
  }
  @media screen {
    width: 80%;
  }
`;

const StyledDropdown = styled(Dropdown)`
  &&& {
    border-radius: 0;
    padding: 8.5px;
  }
`;

class SalesOrder extends React.Component {
  state = {
    hasError: false,
    column: null,
    salesOrderItems: null,
    direction: null,
    loading: true,
    salesOrder: {
      key: '',
      metaData: {},
    },
  };

  componentDidMount() {
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false }),
    };
    api
      .get('/salesorders/' + this.props.match.params.id, config)
      .then(response => {
        _.each(response.data.salesOrderItems, item => {
          item.invoicedQuantity = item.metaData.remainingQuantity;
          item.quantity < item.invoicedQuantity || item.invoicedQuantity <= 0
            ? (item.valid = false)
            : (item.valid = true);
          item.checked = false;
        });
        this.setState({
          salesOrderItems: response.data.salesOrderItems,
          salesOrder: response.data,
        });
      })
      .catch(error => {});
  }

  handleSort = clickedColumn => () => {
    const { column, salesOrderItems, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        salesOrderItems: _.sortBy(salesOrderItems, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      salesOrderItems: salesOrderItems.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  handleQuantityChange = (event, id) => {
    let salesOrderItems = { ...this.state.salesOrderItems };

    _.map(salesOrderItems, item => {
      if (item.id === id) {
        item.invoicedQuantity = event.target.value;
        item.quantity < item.invoicedQuantity || item.invoicedQuantity <= 0
          ? (item.valid = false)
          : (item.valid = true);
      }
    });

    this.setState({ salesOrderItems });
  };

  handleItemCheck = (event, data, id) => {
    let salesOrderItems = { ...this.state.salesOrderItems };

    _.map(salesOrderItems, item => {
      if (item.id === id) {
        item.checked = data.checked;
      }
    });

    this.setState({ salesOrderItems });
  };

  handleSubmitInvoice = () => {
    let checkedSalesOrderItems = _.filter(this.state.salesOrderItems, item => {
      return item.checked;
    });

    let invoice = {
      salesOrderId: this.state.salesOrder.id,
      invoiceItems: _.map(checkedSalesOrderItems, item => {
        return { salesOrderItemId: item.id, quantity: item.invoicedQuantity, materialId: item.materialId };
      }),
    };

    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false }),
    };

    this.setState({ loading: true });

    api
      .post('/invoices', invoice, config)
      .then(response => {
        this.props.history.push('/sales/invoices/' + response.data.id);
      })
      .catch(error => {
        this.setState({ hasError: true });
      });
  };

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
          render={() => (
            <div>
              <ControlPanel
                title={'Sales Orders / ' + this.state.salesOrder.key}
                loading={this.state.loading}
                className="no-print"
              >
                <FlatButton primary size="tiny" disabled={!this.state.salesOrder.metaData.canCreateInvoice}>
                  <Link
                    style={{ display: 'block', height: '100%', color: 'white' }}
                    to={this.props.location.pathname + '/invoice'}
                  >
                    Create Invoice
                  </Link>
                </FlatButton>
                <StyledDropdown text="Invoices" floating labeled className="icon">
                  <Dropdown.Menu>
                    {_.map(this.state.salesOrder.invoices, invoice => (
                      <Dropdown.Item key={invoice.id}>
                        <Link to={'/sales/invoices/' + invoice.id}>{invoice.key}</Link>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </StyledDropdown>
              </ControlPanel>
              <SalesOrderSection>
                <Grid divided="vertically" className="no-screen">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Image src={innovicLogo} size="medium" />
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      Address : Plot No: 11/1/A, Phase - II, GIDC Estate V U Nagar,<br />
                      Anand, Gujarat (INDIA) - 388121 <br />
                      Contact Person : Vinay Makwana<br />
                      Mobile : + 91 99099 20457 / + 91 98793 36897 <br />
                      E-Mail Id : japan@innovictechnology.com <br />
                      Website : www.innovictechnology.com<br />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <h1>{this.state.salesOrder.key}</h1>
                <Grid divided="vertically">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <List celled>
                        <List.Item>
                          <List.Content>
                            <List.Header>Customer</List.Header>
                            {this.state.salesOrder.customerName}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Expiration Date</List.Header>
                            {new Date(this.state.salesOrder.expirationDate).toLocaleDateString()}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Order Date</List.Header>
                            {new Date(this.state.salesOrder.orderDate).toLocaleDateString()}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Description</List.Header>
                            {this.state.salesOrder.description}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Customer Reference</List.Header>
                            {this.state.salesOrder.customerReference}
                          </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Column>
                    <Grid.Column>
                      <List celled>
                        <List.Item>
                          <List.Content>
                            <List.Header>Payment Terms</List.Header>
                            {this.state.salesOrder.paymentTerms}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Created On</List.Header>
                            {new Date(this.state.salesOrder.createdOn).toLocaleDateString()}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Last Modified On</List.Header>
                            {new Date(this.state.salesOrder.lastModifiedOn).toLocaleDateString()}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Created By</List.Header>
                            {this.state.salesOrder.createdByUserName}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Last Modified By</List.Header>
                            {this.state.salesOrder.lastModifiedByUserName}
                          </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <StyledTable sortable celled fixed compact selectable>
                  <Table.Header>
                    <Table.Row>
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
                      <Table.HeaderCell
                        sorted={column === 'deliveryDate' ? direction : null}
                        onClick={this.handleSort('deliveryDate')}
                      >
                        Delivery Date
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === 'wbsElement' ? direction : null}
                        onClick={this.handleSort('wbsElement')}
                      >
                        WBS Element
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === 'remainingQuantity' ? direction : null}
                        onClick={this.handleSort('remainingQuantity')}
                      >
                        Remaining Quantity
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === 'value' ? direction : null}
                        onClick={this.handleSort('value')}
                      >
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
                        quantity,
                        deliveryDate,
                        wbsElement,
                        value,
                        metaData,
                        remainingQuantity = metaData.remainingQuantity,
                      }) => (
                        <Table.Row key={id}>
                          <Table.Cell>{number}</Table.Cell>
                          <Table.Cell>{materialNumber}</Table.Cell>
                          <Table.Cell>{description}</Table.Cell>
                          <Table.Cell>{unitPrice}</Table.Cell>
                          <Table.Cell>{quantity}</Table.Cell>
                          <Table.Cell>{new Date(deliveryDate).toLocaleDateString()}</Table.Cell>
                          <Table.Cell>{wbsElement}</Table.Cell>
                          <Table.Cell>{remainingQuantity}</Table.Cell>
                          <Table.Cell>{value}</Table.Cell>
                        </Table.Row>
                      )
                    )}
                  </Table.Body>
                </StyledTable>

                <Grid divided="vertically">
                  <Grid.Row columns={2}>
                    <Grid.Column />
                    <Grid.Column>
                      <List celled>
                        <List.Item>
                          <List.Content>
                            <List.Header>Total Sales Items</List.Header>
                            {this.state.salesOrderItems ? this.state.salesOrderItems.length : ''}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Total Quantity</List.Header>
                            {_.sumBy(this.state.salesOrderItems, si => si.quantity)}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Total Value</List.Header>
                            {_.sumBy(this.state.salesOrderItems, si => si.value)}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Pending SalesOrder Value</List.Header>
                            {this.state.salesOrder.metaData
                              ? this.state.salesOrder.metaData.pendingSalesOrderValue
                              : ''}
                          </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </SalesOrderSection>
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default SalesOrder;
