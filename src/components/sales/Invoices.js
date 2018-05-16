import _ from 'lodash';
import React from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import ControlPanel from '@innovic/components/shared/ControlPanel';
import { Link } from 'react-router-dom';
import TableWithSorting from '@innovic/components/shared/TableWithSorting';
import Api from '@innovic/components/shared/Api';

class Invoices extends React.Component {
  state = {
    data: null,
  };

  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleSuccess = data => {
    this.setState({ data: data });
  };

  render() {
    const { data } = this.state;
    return (
      <Api url="/invoices" onSuccess={this.handleSuccess}>
        <ControlPanel title="Invoices">
          {/* <Popup
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
          </Link> */}
        </ControlPanel>
        <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.handleDataChange}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell field="key" type="text">
                Key
              </Table.HeaderCell>
              <Table.HeaderCell field="salesOrderKey" type="text">
                Sales Order
              </Table.HeaderCell>
              <Table.HeaderCell field="salesOrderCustomerName" type="text">
                Customer
              </Table.HeaderCell>
              <Table.HeaderCell field="createdOn" type="text">
                Created On
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              data,
              ({ id, key, salesOrderKey, salesOrderId, createdOn, salesOrderCustomerId, salesOrderCustomerName }) => (
                <Table.Row key={id}>
                  <Table.Cell selectable>
                    <Link to={'/sales/invoices/' + id}>{key}</Link>
                  </Table.Cell>
                  <Table.Cell selectable>
                    <Link to={'/sales/sales-orders/' + salesOrderId}>{salesOrderKey}</Link>
                  </Table.Cell>
                  <Table.Cell selectable>
                    <Link to={'/master/customer/' + salesOrderCustomerId + '/view'}>{salesOrderCustomerName}</Link>
                  </Table.Cell>
                  <Table.Cell>{new Date(createdOn).toLocaleDateString()}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </TableWithSorting>
      </Api>
    );
  }
}

export default Invoices;
