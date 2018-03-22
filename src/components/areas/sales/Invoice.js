import _ from 'lodash';
import React from 'react';
import { Table, Grid, List, Message, Image } from 'semantic-ui-react';
import { api } from '../../common/Utilities';
import ControlPanel from '../../common/ControlPanel';
import { FlatButton, StyledTable } from '../../common';
import styled from 'styled-components';
import innovicLogo from '../../../img/innovic-logo.png';

const PageSection = styled(Message)`
  &&& {
    margin: 15px auto;
    border-radius: 0;
    background: #fff;
  }
  @media screen {
    width: 80%;
  }
`;

class Invoice extends React.Component {
  state = {
    column: null,
    direction: null,
    loading: true,
    invoice: {
      key: '',
    },
  };

  handleSort = clickedColumn => () => {
    const { column, invoiceItems, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        invoiceItems: _.sortBy(invoiceItems, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      invoiceItems: invoiceItems.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  componentWillMount() {
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false }),
    };
    api
      .get('/invoices/' + this.props.match.params.id, config)
      .then(response => {
        this.setState({
          invoiceItems: response.data.invoiceItems,
          invoice: response.data,
        });
      })
      .catch(error => {});
  }

  render() {
    const { column, invoiceItems, direction } = this.state;
    return (
      <div>
        <ControlPanel title={'Invoices / ' + this.state.invoice.key} loading={this.state.loading} className="no-print">
          <FlatButton primary size="tiny" onClick={() => window.print()}>
            Print Invoice
          </FlatButton>
        </ControlPanel>
        <PageSection>
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
          <h1>{this.state.invoice.key}</h1>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <List celled>
                  <List.Item>
                    <List.Content>
                      <List.Header>Customer</List.Header>
                      {this.state.invoice.salesOrderCustomerName}
                    </List.Content>
                  </List.Item>
                  {/* <List.Item>
                    <List.Content>
                      <List.Header>Expiration Date</List.Header>
                      {new Date(
                        this.state.invoice.expirationDate
                      ).toLocaleDateString()}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Order Date</List.Header>
                      {new Date(
                        this.state.invoice.orderDate
                      ).toLocaleDateString()}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Payment Terms</List.Header>
                      {this.state.invoice.paymentTerms}
                    </List.Content>
                  </List.Item> */}
                </List>
              </Grid.Column>
              <Grid.Column>
                <List celled>
                  <List.Item>
                    <List.Content>
                      <List.Header>Created On</List.Header>
                      {new Date(this.state.invoice.createdOn).toLocaleDateString()}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Last Modified On</List.Header>
                      {new Date(this.state.invoice.lastModifiedOn).toLocaleDateString()}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Created By</List.Header>
                      {this.state.invoice.createdByUserName}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Last Modified By</List.Header>
                      {this.state.invoice.lastModifiedByUserName}
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
                invoiceItems,
                ({
                  id,
                  salesOrderItemMaterialNumber,
                  salesOrderItemDescription,
                  salesOrderItemUnitPrice,
                  quantity,
                  materialNumber = salesOrderItemMaterialNumber,
                  description = salesOrderItemDescription,
                  unitPrice = salesOrderItemUnitPrice,
                  value = salesOrderItemUnitPrice * quantity,
                }) => (
                  <Table.Row key={id}>
                    <Table.Cell>{materialNumber}</Table.Cell>
                    <Table.Cell>{description}</Table.Cell>
                    <Table.Cell>{unitPrice}</Table.Cell>
                    <Table.Cell>{quantity}</Table.Cell>
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
                      <List.Header>Total Items</List.Header>
                      {this.state.invoiceItems ? this.state.invoiceItems.length : ''}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Total Quantity</List.Header>
                      {_.sumBy(this.state.invoiceItems, si => si.quantity)}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Total Value</List.Header>
                      {_.sumBy(this.state.invoiceItems, si => si.salesOrderItemUnitPrice * si.quantity)}
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </PageSection>
      </div>
    );
  }
}

export default Invoice;
