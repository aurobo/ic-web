import _ from 'lodash';
import React from 'react';
import { Message, Table, Checkbox, Form, Input, Label } from 'semantic-ui-react';
import ControlPanel from '@aurobo/components/ControlPanel';
import { FlatButton } from '@aurobo/components';
import Redirect from 'react-router-dom/Redirect';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { api } from '@aurobo/components/Utilities';
import { withRouter } from 'react-router-dom';

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

class CreateFromPurchaseOrders extends React.Component {
  state = {
    goodsReceipt: null,
    purchaseOrders: this.props.purchaseOrders,
  };

  handleSubmit = () => {
    const { goodsReceipt, purchaseOrders } = this.state;
    goodsReceipt.goodsReceiptItems = [];
    _.each(purchaseOrders, pr =>
      _.each(pr.purchaseOrderItems, pri => {
        let poi = _.clone(pri);
        poi.purchaseOrderItems = [pri.id];
        poi.materialId = pri.materialId;
        if (pri.checked === true) goodsReceipt.goodsReceiptItems.push(poi);
      })
    );

    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false }),
    };

    api
      .post('/goodsreceipts', goodsReceipt, config)
      .then(response => {
        this.props.history.push('/purchase/goods-receipts/' + response.data.id);
      })
      .catch(error => {});
  };

  componentWillMount() {
    const { purchaseOrders } = this.state;

    _.map(purchaseOrders, pr =>
      _.map(pr.purchaseOrderItems, pri => {
        pri.unitPrice = 0;
        pri.date = DateTime.fromObject(pri.date).toFormat('yyyy-MM-dd');
        pri.checked = false;
        pri.valid =
          pri.quantity > pri.metaData.remainingQuantity || pri.quantity <= 0 ? (pri.valid = false) : (pri.valid = true);
      })
    );

    this.setState({
      goodsReceipt: {
        date: DateTime.local().toFormat('yyyy-MM-dd'),
        purchaseOrders: _.map(purchaseOrders, 'id'),
      },
      purchaseOrders: purchaseOrders,
    });
  }

  handleGoodsReceiptItemChange(event, priId) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { purchaseOrders } = this.state;

    _.each(purchaseOrders, pr => (_.find(pr.purchaseOrderItems, pri => pri.id === priId)[name] = value));

    if (name === 'quantity') {
      _.each(purchaseOrders, pr =>
        _.find(pr.purchaseOrderItems, pri => {
          pri.quantity > pri.metaData.remainingQuantity || pri.quantity <= 0 ? (pri.valid = false) : (pri.valid = true);
        })
      );
    }

    this.setState({
      purchaseOrders: purchaseOrders,
    });
  }

  handleHeaderDataChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let { goodsReceipt } = this.state;

    goodsReceipt[name] = value;

    this.setState({
      goodsReceipt: goodsReceipt,
    });
  };

  handleItemCheck = (e, checkboxProps, id) => {
    const { purchaseOrders } = this.state;
    _.each(purchaseOrders, pr =>
      _.map(pr.purchaseOrderItems, item => {
        if (item.id === id) {
          item.checked = checkboxProps.checked;
        }
      })
    );

    this.setState({ purchaseOrders: purchaseOrders });
  };

  render() {
    const { goodsReceipt, purchaseOrders } = this.state;
    return (
      <div>
        <ControlPanel title="Purchase Orders / New Goods Receipt">
          <FlatButton size="tiny" primary onClick={this.handleSubmit}>
            Submit
          </FlatButton>
        </ControlPanel>
        {goodsReceipt.purchaseOrders.length === 0 ? (
          <Redirect to="/purchase/purchase-orders" />
        ) : (
          <div style={{ padding: '20px' }}>
            <HeaderData>
              <Form>
                <Form.Group>
                  <Form.Input
                    value={goodsReceipt.date}
                    onChange={this.handleHeaderDataChange}
                    name="date"
                    type="date"
                    width={3}
                    label="Date"
                    placeholder="Date"
                  />
                  <Form.Input
                    value={goodsReceipt.remarks}
                    onChange={this.handleHeaderDataChange}
                    name="remarks"
                    type="text"
                    width={3}
                    label="Remarks"
                    placeholder="Remarks"
                  />
                </Form.Group>
              </Form>
            </HeaderData>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Material Number</Table.HeaderCell>
                  <Table.HeaderCell>Material Description</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {_.map(purchaseOrders, pr => (
                  <React.Fragment key={pr.id}>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>{pr.key}</Label>
                      </Table.Cell>
                    </Table.Row>
                    {_.map(pr.purchaseOrderItems, pri => (
                      <Table.Row key={pri.id}>
                        <Table.Cell textAlign="center">
                          <Checkbox
                            disabled={!pri.valid}
                            checked={pri.checked && pri.valid}
                            onChange={(e, data) => this.handleItemCheck(e, data, pri.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>{pri.materialNumber}</Table.Cell>
                        <Table.Cell>{pri.materialDescription}</Table.Cell>
                        <Table.Cell>
                          <StyledInput
                            name="quantity"
                            label={{
                              basic: true,
                              content: pri.metaData.remainingQuantity - pri.quantity,
                            }}
                            labelPosition="right"
                            value={pri.quantity}
                            onChange={e => this.handleGoodsReceiptItemChange(e, pri.id)}
                            size="mini"
                            error={!pri.valid}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <StyledInput
                            type="date"
                            name="date"
                            value={pri.date}
                            size="mini"
                            onChange={e => this.handleGoodsReceiptItemChange(e, pri.id)}
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

export default withRouter(CreateFromPurchaseOrders);
