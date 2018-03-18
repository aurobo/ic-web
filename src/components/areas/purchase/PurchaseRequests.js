import _ from 'lodash';
import React from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import ControlPanel from '../../common/ControlPanel';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { Link } from 'react-router-dom';
import { FlatButton } from '../../common';
import TableWithSorting from '../../common/TableWithSorting';
import Api from '../../common/Api';

class PurchaseRequests extends React.Component {
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
      <Api url="/purchaserequests" onSuccess={this.handleSuccess}>
        <ControlPanel title="Purchase Requests">
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
          <Link to="/purchase/import-excel">
            <FlatButton size="tiny">Import</FlatButton>
          </Link>
        </ControlPanel>
        <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.handleDataChange}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell field="key" type="text">
                Key
              </Table.HeaderCell>
              <Table.HeaderCell field="date" type="date">
                Date
              </Table.HeaderCell>
              <Table.HeaderCell field="createdByUserName" type="text">
                Created By
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, key, date, createdByUserName }) => (
              <Table.Row key={id}>
                <Table.Cell selectable>
                  <Link to={'/purchase/purchase-requests/' + id}>{key}</Link>
                </Table.Cell>
                <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{createdByUserName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </TableWithSorting>
      </Api>
    );
  }
}

export default PurchaseRequests;
