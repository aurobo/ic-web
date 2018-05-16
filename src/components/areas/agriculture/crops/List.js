import React from 'react';
import ControlPanel from '../../../common/ControlPanel';
import TableRow, { Table, Popup } from 'semantic-ui-react';
import { FlatButton } from '../../../common';
import Link from 'react-router-dom/Link';
import TableWithSorting from '../../../common/TableWithSorting';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import Api from '../../../common/Api';
import TableCell from 'semantic-ui-react';

class List extends React.Component {
  state = {
    isCreateGoodsIssueDisabled: true,
    data: null,
  };
  handleSuccess = data => {
    console.log(data);
    this.setState({ data: data });
  };
  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleItemCheck = (e, checkboxProps, itemId) => {
    const { data, selectedRows } = this.props;
    let isCreateGoodsIssueDisabled = false;

    if (checkboxProps.checked) {
      selectedRows.push(_.find(data, item => item.id === itemId));
    } else {
      _.remove(selectedRows, item => item.id === itemId);
    }

    if (selectedRows.length > 0) {
      isCreateGoodsIssueDisabled = false;
    } else {
      isCreateGoodsIssueDisabled = true;
    }

    this.props.onRowSelect(_.orderBy(selectedRows, 'key', 'desc'));

    this.setState({
      isCreateGoodsIssueDisabled: isCreateGoodsIssueDisabled,
    });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <Api url="/Crops" onSuccess={this.handleSuccess}>
          <ControlPanel title="Crops">
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
            <Link to="/agriculture/crops/import-excel">
              <FlatButton size="tiny">Import</FlatButton>
            </Link>
          </ControlPanel>
          <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.handleDataChange}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell field="key" type="text">
                  Key
                </Table.HeaderCell>
                <Table.HeaderCell field="Name" type="text">
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell field="TargetWareHouse" type="text">
                  TargetWareHouse
                </Table.HeaderCell>
                <Table.HeaderCell field="createdByUserName" type="text">
                  Created By
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ id, key, name, period, cropSpacing, rowSpacing, type, targetWareHouse, tasks, createdByUserName }) => (
                <Table.Row key={id}>
                  <Table.Cell selectable>
                    <Link to={'/agriculture/crops/crop/' + id}>{key}</Link>
                  </Table.Cell>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{targetWareHouse}</Table.Cell>
                  <Table.Cell>{createdByUserName}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </TableWithSorting>
        </Api>
      </div>
    );
  }
}
export default withRouter(List);
