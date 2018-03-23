import React from 'react';
import Api from '../../../common/Api';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import ViewPurchaseOrder from './View';

class PurchaseOrder extends React.Component {
  state = {
    data: null,
    selectedRows: [],
  };

  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleSuccess = data => {
    this.setState({ data: data });
  };

  handleRowSelect = selectedRows => {
    this.setState({ selectedRows: selectedRows });
  };

  render() {
    const { data, selectedRows } = this.state;
    return (
      <Api url="/purchaseorders" onSuccess={this.handleSuccess}>
        <Switch>
          <Route
            path="/purchase/purchase-orders"
            exact
            render={() => (
              <List
                data={data}
                selectedRows={selectedRows}
                onDataChange={this.handleDataChange}
                onRowSelect={this.handleRowSelect}
              />
            )}
          />
          <Route exact path="/purchase/purchase-orders/:id" component={ViewPurchaseOrder} />
        </Switch>
      </Api>
    );
  }
}

export default PurchaseOrder;
