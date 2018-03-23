import _ from 'lodash';
import React from 'react';
import ControlPanel from '../../../common/ControlPanel';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import { Dropdown, Table } from 'semantic-ui-react';
import { Page } from '../../../common';
import TableWithSorting from '../../../common/TableWithSorting';
import Api from '../../../common/Api';

const StyledDropdown = styled(Dropdown)`
  &&& {
    border-radius: 0;
    padding: 8.5px;
  }
`;

class ViewPurchaseOrder extends React.Component {
  state = {
    purchaseOrder: null,
    purchaseOrderItems: null,
  };

  handleSuccess = data => {
    this.setState({ purchaseOrder: data });
    this.setState({ purchaseOrderItems: data.purchaseOrderItems });
  };

  handleDataChange = purchaseOrderItems => {
    this.setState({ purchaseOrderItems: purchaseOrderItems });
  };

  render() {
    const { purchaseOrder, purchaseOrderItems } = this.state;
    return (
      <Api url={'/PurchaseOrders/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
        {purchaseOrder !== null ? (
          <React.Fragment>
            <ControlPanel title={'Purchase Orders / ' + purchaseOrder.key} className="no-print">
              <StyledDropdown text="Purchase Requests" floating labeled className="icon">
                <Dropdown.Menu>
                  {_.map(purchaseOrder.purchaseRequests, pr => (
                    <Dropdown.Item key={pr.id}>
                      <Link to={'/purchase/purchase-requests/' + pr.id}>{pr.key}</Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </StyledDropdown>
            </ControlPanel>
            <Page>
              <h1>{purchaseOrder.key}</h1>
              <TableWithSorting
                sortBy="key"
                sortIn="desc"
                data={purchaseOrder.purchaseOrderItems}
                onDataChange={this.props.handleDataChange}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell field="materialNumber" type="text">
                      Material Number
                    </Table.HeaderCell>
                    <Table.HeaderCell field="quantity" type="number">
                      Quantity
                    </Table.HeaderCell>
                    <Table.HeaderCell field="date" type="date">
                      Date
                    </Table.HeaderCell>
                    <Table.HeaderCell field="remainingQuantity" type="number">
                      Remaining Quantity
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(
                    purchaseOrderItems,
                    ({ id, number, materialNumber, quantity, date, metaData, metaData: { remainingQuantity } }) => (
                      <Table.Row key={id}>
                        <Table.Cell>{materialNumber}</Table.Cell>
                        <Table.Cell>{quantity}</Table.Cell>
                        <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>{remainingQuantity}</Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </TableWithSorting>
            </Page>
          </React.Fragment>
        ) : (
          ''
        )}
      </Api>
    );
  }
}

export default ViewPurchaseOrder;
