import React from 'react';
import ControlPanel from '@aurobo/components/ControlPanel';
import { Table, Popup } from 'semantic-ui-react';
import { FlatButton } from '@aurobo/components';
import Link from 'react-router-dom/Link';
import TableWithSorting from '@aurobo/components/TableWithSorting';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

class List extends React.Component {
  state = {
    isCreateGoodsReceiptDisabled: true,
  };

  handleItemCheck = (e, checkboxProps, itemId) => {
    const { data, selectedRows } = this.props;
    let isCreateGoodsReceiptDisabled = false;

    if (checkboxProps.checked) {
      selectedRows.push(_.find(data, item => item.id === itemId));
    } else {
      _.remove(selectedRows, item => item.id === itemId);
    }

    if (selectedRows.length > 0) {
      isCreateGoodsReceiptDisabled = false;
    } else {
      isCreateGoodsReceiptDisabled = true;
    }

    this.props.onRowSelect(_.orderBy(selectedRows, 'key', 'desc'));

    this.setState({
      isCreateGoodsReceiptDisabled: isCreateGoodsReceiptDisabled,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <ControlPanel title="Goods Receipts">
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
        </ControlPanel>
        <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.props.onDataChange}>
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
                  <Link to={'/purchase/goods-receipts/' + id}>{key}</Link>
                </Table.Cell>
                <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{createdByUserName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </TableWithSorting>
      </div>
    );
  }
}

export default withRouter(List);
