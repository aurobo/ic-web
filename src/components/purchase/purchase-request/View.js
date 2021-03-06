import _ from 'lodash';
import React from 'react';
import ControlPanel from '@innovic/components/shared/ControlPanel';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import { Dropdown, Table } from 'semantic-ui-react';
import { Page } from '@innovic/components/shared';
import TableWithSorting from '@innovic/components/shared/TableWithSorting';
import Api from '@innovic/components/shared/Api';

const StyledDropdown = styled(Dropdown)`
  &&& {
    border-radius: 0;
    padding: 8.5px;
  }
`;

class ViewPurchaseRequest extends React.Component {
  state = {
    purchaseRequest: null,
    purchaseRequestItems: null,
  };

  handleSuccess = data => {
    this.setState({ purchaseRequest: data });
    this.setState({ purchaseRequestItems: data.purchaseRequestItems });
  };

  handleDataChange = purchaseRequestItems => {
    this.setState({ purchaseRequestItems: purchaseRequestItems });
  };

  render() {
    const { purchaseRequest, purchaseRequestItems } = this.state;
    return (
      <Api url={'/PurchaseRequests/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
        {purchaseRequest !== null ? (
          <React.Fragment>
            <ControlPanel title={'Purchase Requests / ' + purchaseRequest.key} className="no-print">
              <StyledDropdown text="Purchase Orders" floating labeled className="icon">
                <Dropdown.Menu>
                  {_.map(purchaseRequest.purchaseOrders, po => (
                    <Dropdown.Item key={po.id}>
                      <Link to={'/purchase/purchase-orders/' + po.id}>{po.key}</Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </StyledDropdown>
              <StyledDropdown text="Sales Orders" floating labeled className="icon">
                <Dropdown.Menu>
                  {_.map(purchaseRequest.links, link => (
                    <Dropdown.Item key={link.id}>
                      <Link to={'/sales/sales-orders/' + link.referenceId}>{link.referenceName}</Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </StyledDropdown>
            </ControlPanel>
            <Page>
              <h1>{purchaseRequest.key}</h1>
              <TableWithSorting
                sortBy="key"
                sortIn="desc"
                data={purchaseRequest.purchaseRequestItems}
                onDataChange={this.props.handleDataChange}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell field="number" type="number">
                      Item Number
                    </Table.HeaderCell>
                    <Table.HeaderCell field="materialNumber" type="text">
                      Material Number
                    </Table.HeaderCell>
                    <Table.HeaderCell field="materialDescription" type="text">
                      Material Description
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
                    purchaseRequestItems,
                    ({
                      id,
                      number,
                      materialNumber,
                      materialDescription,
                      quantity,
                      date,
                      metaData,
                      metaData: { remainingQuantity },
                    }) => (
                      <Table.Row key={id}>
                        <Table.Cell>{number}</Table.Cell>
                        <Table.Cell>{materialNumber}</Table.Cell>
                        <Table.Cell>{materialDescription}</Table.Cell>
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

export default ViewPurchaseRequest;
