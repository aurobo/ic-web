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
        <Api url="/LandUnits" onSuccess={this.handleSuccess}>
          <ControlPanel title="LandUnits">
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
          <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.handleDataChange}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell field="key" type="text">
                  Key
                </Table.HeaderCell>
                <Table.HeaderCell field="Name" type="text">
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell field="Area" type="text">
                  Area
                </Table.HeaderCell>
                <Table.HeaderCell field="Longitude" type="text">
                  Longitude
                </Table.HeaderCell>
                <Table.HeaderCell field="Latitude" type="text">
                  Latitude
                </Table.HeaderCell>
                <Table.HeaderCell field="ParentLandUnit" type="date">
                  ParentLandUnit
                </Table.HeaderCell>
                <Table.HeaderCell field="createdByUserName" type="text">
                  Created By
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ key, name, area, longitude, latitude, parentLandUnit, createdByUserName }) => (
                <Table.Row key={key}>
                  <Table.Cell>{key}</Table.Cell>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{area}</Table.Cell>
                  <Table.Cell>{longitude}</Table.Cell>
                  <Table.Cell>{latitude}</Table.Cell>
                  <Table.Cell>{parentLandUnit}</Table.Cell>
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
