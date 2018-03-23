import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PurchaseRequest from './purchase-request';
import TopNav from '../../common/TopNav';
import { Dropdown } from 'semantic-ui-react';
import { DropdownLink } from '../../common';
import ImportExcel from '../master/ImportExcel';
import ViewPurchaseRequest from './purchase-request/View';
import PurchaseOrder from './purchase-order';
class Purchase extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Purchase" url={this.props.url} className="no-print" onLogout={this.props.onLogout}>
          <Dropdown item text="Menu" simple>
            <Dropdown.Menu>
              <DropdownLink to="/purchase/purchase-requests">Purchase Requests</DropdownLink>
              <DropdownLink to="/purchase/purchase-orders">Purchase Orders</DropdownLink>
              <DropdownLink to="/purchase/goods-issues">Goods Issues</DropdownLink>
              <DropdownLink to="/purchase/goods-receipts">Goods Receipts</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Dropdown item text="Master" simple>
            <Dropdown.Menu>
              <DropdownLink to="/sales/customers">Customers</DropdownLink>
              <DropdownLink to="/sales/materials">Materials</DropdownLink>
            </Dropdown.Menu>
          </Dropdown> */}
        </TopNav>
        <Switch>
          <Route path="/purchase/purchase-requests" component={PurchaseRequest} />
          <Route path="/purchase/purchase-orders" component={PurchaseOrder} />
          <Route
            path="/purchase/import-excel"
            render={() => <ImportExcel uri="/purchaserequests/upload" redirectUri="/purchase/purchaserequests" />}
          />
          <Redirect to="/purchase/purchase-requests" />
        </Switch>
      </div>
    );
  }
}

export default Purchase;
