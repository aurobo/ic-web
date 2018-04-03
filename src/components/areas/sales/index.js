import React from 'react';
import TopNav from '../../common/TopNav';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import SalesOrders from './SalesOrders';
import { Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import ImportExcel from '../master/ImportExcel';
import Redirect from 'react-router-dom/Redirect';
import Customers from './Customers';
import Materials from '../master/Materials';
import SalesOrder from './SalesOrder';
import Invoice from './Invoice';
import { DropdownLink } from '../../common';

class Sales extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Sales" url={this.props.url} className="no-print" onLogout={this.props.onLogout}>
          <Dropdown item text="Menu" simple>
            <Dropdown.Menu>
              <DropdownLink to="/sales/sales-orders">Sales Orders</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text="Master Data" simple>
            <Dropdown.Menu>
              <DropdownLink to="/sales/customers">Customers</DropdownLink>
              <DropdownLink to="/sales/materials">Materials</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
        </TopNav>
        <Switch>
          <Route path="/sales/sales-orders/:id" component={SalesOrder} />
          <Route path="/sales/sales-orders" component={SalesOrders} />
          <Route
            path="/sales/import-excel"
            render={() => <ImportExcel uri="/salesorders/upload" redirectUri="/sales/salesorders" />}
          />
          <Route path="/sales/customers" component={Customers} />
          <Route path="/sales/materials" component={Materials} />
          <Route path="/sales/invoices/:id" component={Invoice} />
          <Redirect to="/sales/sales-orders" />
        </Switch>
      </div>
    );
  }
}

export default Sales;
