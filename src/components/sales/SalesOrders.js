import _ from 'lodash';
import React from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import ControlPanel from '@innovic/components/shared/ControlPanel';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { Link } from 'react-router-dom';
import { FlatButton } from '@innovic/components/shared';
import TableWithSorting from '@innovic/components/shared/TableWithSorting';
import Api from '@innovic/components/shared/Api';

class SalesOrders extends React.Component {
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
      <Api url="/salesorders" onSuccess={this.handleSuccess}>
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
        <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.handleDataChange}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell field="key" type="text">
                Key
              </Table.HeaderCell>
              <Table.HeaderCell field="orderDate" type="date">
                Order Date
              </Table.HeaderCell>
              <Table.HeaderCell field="customerName" type="text">
                Customer Name
              </Table.HeaderCell>
              <Table.HeaderCell field="customerReference" type="text">
                Customer Reference
              </Table.HeaderCell>
              <Table.HeaderCell field="description" type="text">
                Description
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, key, orderDate, customerName, customerReference, description }) => (
              <Table.Row key={id}>
                <Table.Cell selectable>
                  <Link to={'/sales/sales-orders/' + id}>{key}</Link>
                </Table.Cell>
                <Table.Cell>{new Date(orderDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{customerName}</Table.Cell>
                <Table.Cell>{customerReference}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </TableWithSorting>
      </Api>
    );
  }
}

export default SalesOrders;
