import React from 'react';
import ControlPanel from '@aurobo/components/ControlPanel';
import { Table, Popup, Checkbox } from 'semantic-ui-react';
import { FlatButton } from '@aurobo/components';
import Link from 'react-router-dom/Link';
import TableWithSorting from '@aurobo/components/TableWithSorting';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledFlatButton = styled(FlatButton)`
  &&& {
    padding: 0;
  }
`;

const StyledLink = styled(Link)`
  &&& {
    padding: 10px;
  }
`;

class List extends React.Component {
  state = {
    isCreatePurchaseOrderDisabled: true,
  };

  handleItemCheck = (e, checkboxProps, itemId) => {
    const { data, selectedRows } = this.props;
    let isCreatePurchaseOrderDisabled = false;

    if (checkboxProps.checked) {
      selectedRows.push(_.find(data, item => item.id === itemId));
    } else {
      _.remove(selectedRows, item => item.id === itemId);
    }

    if (selectedRows.length > 0) {
      isCreatePurchaseOrderDisabled = false;
    } else {
      isCreatePurchaseOrderDisabled = true;
    }

    this.props.onRowSelect(_.orderBy(selectedRows, 'key', 'desc'));

    this.setState({
      isCreatePurchaseOrderDisabled: isCreatePurchaseOrderDisabled,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
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
          <Link to="/purchase/purchase-requests/import-excel">
            <FlatButton size="tiny">Import</FlatButton>
          </Link>
        </ControlPanel>
        <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.props.onDataChange}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell field="key" type="text">
                Key
              </Table.HeaderCell>
              <Table.HeaderCell field="date" type="date">
                Date
              </Table.HeaderCell>
              <Table.HeaderCell field="totalRemainingQuantity" type="number">
                Total Remaining Quantity
              </Table.HeaderCell>
              <Table.HeaderCell field="createdByUserName" type="text">
                Created By
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              data,
              ({
                id,
                key,
                date,
                createdByUserName,
                metaData,
                totalRemainingQuantity = metaData.totalRemainingQuantity,
              }) => (
                <Table.Row key={id}>
                  <Table.Cell collapsing>
                    <Checkbox
                      disabled={!metaData.canCreatePurchaseOrder}
                      slider
                      onChange={(e, props) => this.handleItemCheck(e, props, id)}
                    />
                  </Table.Cell>
                  <Table.Cell selectable>
                    <Link to={'/purchase/purchase-requests/' + id}>{key}</Link>
                  </Table.Cell>
                  <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{totalRemainingQuantity}</Table.Cell>
                  <Table.Cell>{createdByUserName}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="4">
                <StyledFlatButton size="tiny" primary disabled={this.state.isCreatePurchaseOrderDisabled}>
                  <StyledLink
                    style={{ display: 'block', height: '100%', color: 'white' }}
                    to={this.props.location.pathname + '/create-purchase-order'}
                  >
                    Create Purchase Order
                  </StyledLink>
                </StyledFlatButton>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </TableWithSorting>
      </div>
    );
  }
}

export default withRouter(List);
