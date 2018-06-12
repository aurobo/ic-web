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

class CreatePurchaseOrder extends React.Component {
  state = {
    purchaseOrder: null,
    purchaseRequests: this.props.purchaseRequests,
  };

  handleSubmit = () => {
    const { purchaseOrder, purchaseRequests } = this.state;
    purchaseOrder.purchaseOrderItems = [];
    _.each(purchaseRequests, pr =>
      _.each(pr.purchaseRequestItems, pri => {
        let poi = _.clone(pri);
        poi.purchaseRequestItems = [pri.id];
        poi.materialId = pri.materialId;
        if (pri.checked === true) purchaseOrder.purchaseOrderItems.push(poi);
      })
    );

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
    const { purchaseRequests } = this.state;
    _.map(purchaseRequests, pr =>
      _.map(pr.purchaseRequestItems, pri => {
        pri.unitPrice = 0;
        pri.date = DateTime.fromObject(pri.date).toFormat('yyyy-MM-dd');
        pri.checked = false;
        pri.valid =
          pri.quantity > pri.metaData.remainingQuantity || pri.quantity <= 0 ? (pri.valid = false) : (pri.valid = true);
      })
    );

    this.setState({
      purchaseOrder: {
        date: DateTime.local().toFormat('yyyy-MM-dd'),
        purchaseRequests: _.map(purchaseRequests, 'id'),
      },
      purchaseRequests: purchaseRequests,
    });
  }

  handlePurchaseOrderItemChange(event, priId) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { purchaseRequests } = this.state;

    _.each(purchaseRequests, pr => (_.find(pr.purchaseRequestItems, pri => pri.id === priId)[name] = value));

    if (name === 'quantity') {
      _.each(purchaseRequests, pr =>
        _.find(pr.purchaseRequestItems, pri => {
          pri.quantity > pri.metaData.remainingQuantity || pri.quantity <= 0 ? (pri.valid = false) : (pri.valid = true);
        })
      );
    }

    this.setState({
      purchaseRequests: purchaseRequests,
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
    const { purchaseRequests } = this.state;
    _.each(purchaseRequests, pr =>
      _.map(pr.purchaseRequestItems, item => {
        if (item.id === id) {
          item.checked = checkboxProps.checked;
        }
      })
    );

    this.setState({ purchaseRequests: purchaseRequests });
  };

  render() {
    const { purchaseOrder, purchaseRequests } = this.state;
    return (
      <div>
        <ControlPanel title="Purchase Requests / New Purchase Order">
          <FlatButton size="tiny" primary onClick={this.handleSubmit}>
            Submit
          </FlatButton>
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
                  <Form.Input
                    value={purchaseOrder.remarks}
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
                    {_.map(pr.purchaseRequestItems, pri => (
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
                            onChange={e => this.handlePurchaseOrderItemChange(e, pri.id)}
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
                            onChange={e => this.handlePurchaseOrderItemChange(e, pri.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <StyledInput
                            name="unitPrice"
                            value={pri.unitPrice}
                            size="mini"
                            onChange={e => this.handlePurchaseOrderItemChange(e, pri.id)}
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

export default withRouter(CreatePurchaseOrder);
