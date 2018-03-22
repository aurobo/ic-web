import _ from 'lodash';
import React from 'react';
import { Message, Table, Checkbox, Form, Input, Label } from 'semantic-ui-react';
import ControlPanel from '../../../common/ControlPanel';
import { Link } from 'react-router-dom';
import { FlatButton } from '../../../common';
import Redirect from 'react-router-dom/Redirect';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { api } from '../../../common/Utilities';

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

  handleSubmit = () => {
    const { purchaseOrder } = this.state;
    _.remove(purchaseOrder.purchaseOrderItems, item => item.checked === false);
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false }),
    };

    api
      .post('/purchaseorders', purchaseOrder, config)
      .then(response => {
        this.props.history.push('/purchase/purchase-orders/' + response.data.id);
      })
      .catch(error => {});
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
              checked: false,
              metaData: pri.metaData,
              valid:
                pri.quantity < pri.metaData.remainingQuantity || pri.metaData.remainingQuantity <= 0
                  ? (pri.valid = false)
                  : (pri.valid = true),
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

    if (name === 'quantity') {
      _.find(purchaseOrder.purchaseOrderItems, poi => {
        poi.quantity < poi.metaData.remainingQuantity || poi.metaData.remainingQuantity <= 0
          ? (poi.valid = false)
          : (poi.valid = true);
      });
    }

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

  handleItemCheck = (e, checkboxProps, id) => {
    const { purchaseOrder } = this.state;

    _.map(purchaseOrder.purchaseOrderItems, item => {
      if (item.id === id) {
        item.checked = checkboxProps.checked;
      }
    });

    this.setState({ purchaseOrder: purchaseOrder });
  };

  render() {
    const { purchaseOrder } = this.state;
    const { purchaseRequests } = this.props;
    return (
      <div>
        <ControlPanel title="Purchase Requests / New Purchase Order">
          <FlatButton size="tiny" primary onClick={this.handleSubmit}>
            Submit
          </FlatButton>
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
                <Form.Group>
                  <Form.Input
                    value={purchaseOrder.date}
                    onChange={this.handleHeaderDataChange}
                    name="date"
                    type="date"
                    width={3}
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
                          <Checkbox
                            disabled={!poi.valid}
                            checked={poi.checked && poi.valid}
                            onChange={(e, data) => this.handleItemCheck(e, data, poi.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>{poi.materialNumber}</Table.Cell>
                        <Table.Cell>
                          <StyledInput
                            name="quantity"
                            label={{
                              basic: true,
                              content: poi.metaData.remainingQuantity - poi.quantity,
                            }}
                            labelPosition="right"
                            value={poi.quantity}
                            onChange={e => this.handlePurchaseOrderItemChange(e, poi.id)}
                            size="mini"
                            error={!poi.valid}
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
