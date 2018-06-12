import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PurchaseRequest from './purchase-request';
import TopNav from '@aurobo/components/TopNav';
import { Dropdown } from 'semantic-ui-react';
import { DropdownLink } from '@aurobo/components';
import ImportExcel from '@aurobo/components/ImportExcel';
import PurchaseOrder from './purchase-order';
import GoodsIssue from './goods-issue';
import GoodsReceipt from './goods-receipt';

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
        </TopNav>
        <Switch>
          <Route
            exact
            path="/purchase/purchase-requests/import-excel"
            render={() => <ImportExcel uri="/purchaserequests/upload" redirectUri="/purchase/purchase-requests" />}
          />
          <Route
            exact
            path="/purchase/goods-issues/import-excel"
            render={() => <ImportExcel uri="/goodsissues/upload" redirectUri="/purchase/goods-issues" />}
          />
          <Route path="/purchase/purchase-requests" component={PurchaseRequest} />
          <Route path="/purchase/purchase-orders" component={PurchaseOrder} />
          <Route path="/purchase/goods-issues" component={GoodsIssue} />
          <Route path="/purchase/goods-receipts" component={GoodsReceipt} />
          <Redirect to="/purchase/purchase-requests" />
        </Switch>
      </div>
    );
  }
}

export default Purchase;
