import _ from 'lodash';
import React from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import ControlPanel from '../../common/ControlPanel';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { Link } from 'react-router-dom';
import { FlatButton } from '../../common';
import TableWithSorting from '../../common/TableWithSorting';
import Api from '../../common/Api';
import { Route, Switch } from 'react-router-dom';
import CreatePurchaseOrder from './CreatePurchaseOrder';

class PurchaseRequests extends React.Component {
  state = {
    data: null,
    selectedPurchaseRequests: [],
    isCreatePurchaseOrderDisabled: true,
  };

  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleSuccess = data => {
    this.setState({ data: data });
  };

  handleItemCheck = (e, checkboxProps, itemId) => {
    const { data, selectedPurchaseRequests } = this.state;
    let isCreatePurchaseOrderDisabled = false;

    if (checkboxProps.checked) {
      selectedPurchaseRequests.push(_.find(data, item => item.id === itemId));
    } else {
      _.remove(selectedPurchaseRequests, item => item.id === itemId);
    }

    if (selectedPurchaseRequests.length > 0) {
      isCreatePurchaseOrderDisabled = false;
    } else {
      isCreatePurchaseOrderDisabled = true;
    }

    this.setState({
      selectedPurchaseRequests: selectedPurchaseRequests,
      isCreatePurchaseOrderDisabled: isCreatePurchaseOrderDisabled,
    });
  };

  render() {
    const { data } = this.state;
    return (
      <Api url="/purchaserequests" onSuccess={this.handleSuccess}>
        <Switch>
          <Route
            path="/purchase/purchase-requests"
            exact
            render={() => (
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
                  <Link to="/purchase/import-excel">
                    <FlatButton size="tiny">Import</FlatButton>
                  </Link>
                </ControlPanel>
                <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.handleDataChange}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell field="key" type="text">
                        Key
                      </Table.HeaderCell>
                      <Table.HeaderCell field="date" type="date">
                        Date
                      </Table.HeaderCell>
                      <Table.HeaderCell field="createdByUserName" type="text">
                        Created By
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {_.map(data, ({ id, key, date, createdByUserName }) => (
                      <Table.Row key={id}>
                        <Table.Cell collapsing>
                          <Checkbox slider onChange={(e, props) => this.handleItemCheck(e, props, id)} />
                        </Table.Cell>
                        <Table.Cell selectable>
                          <Link to={'/purchase/purchase-requests/' + id}>{key}</Link>
                        </Table.Cell>
                        <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>{createdByUserName}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan="4">
                        <FlatButton size="tiny" primary disabled={this.state.isCreatePurchaseOrderDisabled}>
                          <Link
                            style={{ display: 'block', height: '100%', color: 'white' }}
                            to={this.props.location.pathname + '/create-purchase-order'}
                          >
                            Create Purchase Order
                          </Link>
                        </FlatButton>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </TableWithSorting>
              </div>
            )}
          />
          <Route
            path="/purchase/purchase-requests/create-purchase-order"
            render={() => <CreatePurchaseOrder purchaseRequests={this.state.selectedPurchaseRequests} />}
          />
        </Switch>
      </Api>
    );
  }
}

export default PurchaseRequests;
