import _ from 'lodash';
import React from 'react';
import Message, { Table, Checkbox } from 'semantic-ui-react';
import ControlPanel from '../../common/ControlPanel';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { Link } from 'react-router-dom';
import { FlatButton } from '../../common';
import TableWithSorting from '../../common/TableWithSorting';
import Api from '../../common/Api';
import { Route, Switch } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import { Input, Menu, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';

const PaddedTable = styled(Table)`
  &&& {
    margin-left: 20px;
  }
`;

class CreatePurchaseOrder extends React.Component {
  state = {
    purchaseRequests: this.props.purchaseRequests,
  };

  render() {
    const { purchaseRequests } = this.state;
    return (
      <div>
        <ControlPanel title="Purchase Requests / New Purchase Order">
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
          <Link to="/purchase/import-excel">
            <FlatButton size="tiny">Import</FlatButton>
          </Link>
        </ControlPanel>
        {purchaseRequests.length === 0 ? (
          <Redirect to="/purchase/purchase-requests" />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <PaddedTable celled>
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
                    {_.map(pr.purchaseRequestItems, pri => (
                      <Table.Row key={pri.id}>
                        <Table.Cell textAlign="center">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell>{pri.materialNumber}</Table.Cell>
                        <Table.Cell>
                          <Input
                            value={pri.quantity}
                            // onChange={e => this.handleQuantityChange(e, id)}
                            size="mini"
                            // error={!valid}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Input value={new Date(pri.expectedDate).toLocaleDateString()} size="mini" />
                        </Table.Cell>
                        <Table.Cell>
                          <Input value={pri.unitPrice} size="mini" />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </React.Fragment>
                ))}
              </Table.Body>
            </PaddedTable>
          </div>
        )}
      </div>
    );
  }
}

export default CreatePurchaseOrder;
