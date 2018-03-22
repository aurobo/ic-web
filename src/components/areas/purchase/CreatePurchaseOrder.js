import _ from 'lodash';
import React from 'react';
import { Message, Table, Checkbox, Form, Dropdown, Input, Label } from 'semantic-ui-react';
import ControlPanel from '../../common/ControlPanel';
import { Link } from 'react-router-dom';
import { FlatButton } from '../../common';
import Redirect from 'react-router-dom/Redirect';
import styled from 'styled-components';
import { DateTime } from 'luxon';

const StyledInput = styled(Input)`
  &&& {
    width: 100%;
  }
`;

const HeaderData = styled(Message)`
  &&& {
    background: #fff;
  }
`;

class CreatePurchaseOrder extends React.Component {
  state = {
    purchaseOrder: null,
  };

  componentWillMount() {
    const { purchaseRequests } = this.props;
    this.setState({
      purchaseOrder: {
        date: DateTime.local().toFormat('yyyy-MM-dd'),
        purchaseRequests: _.map(purchaseRequests, 'id'),
        purchaseOrderItems: _.flatMap(purchaseRequests, pr =>
          _.map(pr.purchaseRequestItems, pri => {
            return {
              id: pri.id,
              purchaseRequestItems: [pri.id],
              materialId: pri.materialId,
              materialNumber: pri.materialNumber,
              quantity: pri.quantity,
              unitPrice: 0,
              expectedDate: DateTime.fromObject(pri.expectedDate).toFormat('yyyy-MM-dd'),
            };
          })
        ),
      },
    });
  }

  handlePurchaseOrderItemChange(event, poiId) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { purchaseOrder } = this.state;

    _.find(purchaseOrder.purchaseOrderItems, poi => poi.id === poiId)[name] = value;

    this.setState({
      purchaseOrder: purchaseOrder,
    });
  }

  handleHeaderDataChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let { purchaseOrder } = this.state;

    purchaseOrder[name] = value;

    this.setState({
      purchaseOrder: purchaseOrder,
    });
  };

  render() {
    const { purchaseOrder } = this.state;
    const { purchaseRequests } = this.props;
    return (
      <div>
        <ControlPanel title="Purchase Requests / New Purchase Order">
          <Link to="/purchase/purchase-requests">
            <FlatButton size="tiny">Back</FlatButton>
          </Link>
        </ControlPanel>
        {purchaseOrder.purchaseRequests.length === 0 ? (
          <Redirect to="/purchase/purchase-requests" />
        ) : (
          <div style={{ padding: '20px' }}>
            <HeaderData>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    value={purchaseOrder.date}
                    onChange={this.handleHeaderDataChange}
                    name="date"
                    type="date"
                    fluid
                    label="Date"
                    placeholder="Date"
                  />
                </Form.Group>
              </Form>
            </HeaderData>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Material Number</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Expected Date</Table.HeaderCell>
                  <Table.HeaderCell>Unit Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {_.map(purchaseRequests, pr => (
                  <React.Fragment key={pr.id}>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>{pr.key}</Label>
                      </Table.Cell>
                    </Table.Row>
                    {_.map(purchaseOrder.purchaseOrderItems, poi => (
                      <Table.Row key={poi.id}>
                        <Table.Cell textAlign="center">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell>{poi.materialNumber}</Table.Cell>
                        <Table.Cell>
                          <StyledInput
                            name="quantity"
                            value={poi.quantity}
                            size="mini"
                            onChange={e => this.handlePurchaseOrderItemChange(e, poi.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <StyledInput
                            type="date"
                            name="expectedDate"
                            value={poi.expectedDate}
                            size="mini"
                            onChange={e => this.handlePurchaseOrderItemChange(e, poi.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <StyledInput
                            name="unitPrice"
                            value={poi.unitPrice}
                            size="mini"
                            onChange={e => this.handlePurchaseOrderItemChange(e, poi.id)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </React.Fragment>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default CreatePurchaseOrder;
