import React from 'react';
import TopNav from '../../common/TopNav';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import SalesOrders from './SalesOrders';
import { Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import ImportExcel from './ImportExcel';
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
          <Dropdown item text="Orders" simple>
            <Dropdown.Menu>
              {/* <Dropdown.Item>Open Orders</Dropdown.Item> */}
              <DropdownLink to="/sales/sales-orders">All Orders</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Dropdown item text="Invoicing" simple>
            <Dropdown.Menu>
              <Dropdown.Item>Orders to Invoice</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <Dropdown item text="Master" simple>
            <Dropdown.Menu>
              <DropdownLink to="/sales/customers">Customers</DropdownLink>
              <DropdownLink to="/sales/materials">Materials</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
        </TopNav>
        <Switch>
          <Route path="/sales/sales-orders/:id" component={SalesOrder} />
          <Route path="/sales/sales-orders" component={SalesOrders} />
          <Route path="/sales/import-excel" component={ImportExcel} />
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
