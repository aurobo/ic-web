import React from 'react';
import { TopNav, ImportExcel } from '@innovic/components/shared';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import SalesOrders from './SalesOrders';
import { Switch, Route, Redirect } from 'react-router-dom';

import Invoice from './Invoice';
import { DropdownLink } from '@innovic/components/shared';
import Invoices from './Invoices';

class Sales extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Sales" url={this.props.url} className="no-print" onLogout={this.props.onLogout}>
          <Dropdown item text="Menu" simple>
            <Dropdown.Menu>
              <DropdownLink to="/sales/sales-orders">Sales Orders</DropdownLink>
              <DropdownLink to="/sales/invoices">Invoices</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
        </TopNav>
        <Switch>
          <Route path="/sales/sales-orders/:id+" component={SalesOrders} />
          <Route path="/sales/sales-orders" component={SalesOrders} />
          <Route
            path="/sales/import-excel"
            render={() => <ImportExcel uri="/salesorders/upload" redirectUri="/sales/salesorders" />}
          />
          <Route
            path="/master/materials/import-excel"
            render={() => <ImportExcel uri="/materials/upload" redirectUri="/sales/materials" />}
          />
          <Route path="/sales/invoices/:id" component={Invoice} />
          <Route path="/sales/invoices" component={Invoices} />
          <Redirect to="/sales/sales-orders" />
        </Switch>
      </div>
    );
  }
}

export default Sales;
