import React from 'react';
import Customer from './customer';
import Material from './material';
import Vendor from './vendor';
import { DropdownLink, ImportExcel } from '@innovic/components/shared';
import { Organ } from '@innovic/components/shared/anatomy';
import { Dropdown } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

class Master extends React.Component {
  render() {
    return (
      <Organ
        name="Master"
        onLogout={this.props.onLogout}
        renderMenu={() => (
          <Dropdown item text="Menu" simple>
            <Dropdown.Menu>
              <DropdownLink to="/master/material/list">Materials</DropdownLink>
              <DropdownLink to="/master/customer/list">Customers</DropdownLink>
              <DropdownLink to="/master/vendor/list">Vendors</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
        )}
        renderSwitch={() => (
          <Switch>
            {/* Move import routes in Tissue, the routes should be conditional based on what prop is passed in tissue */}
            <Route
              path="/master/material/import-excel"
              render={() => <ImportExcel uri="/materials/upload" redirectUri="/master/material/list" />}
            />
            <Route
              path="/master/vendor/import-excel"
              render={() => <ImportExcel uri="/vendors/upload" redirectUri="/master/vendor/list" />}
            />
            <Route path="/master/customer" component={Customer} />
            <Route path="/master/material" component={Material} />
            <Route path="/master/vendor" component={Vendor} />
            <Redirect to="/master/material" />
          </Switch>
        )}
      />
    );
  }
}

export default Master;
export { Customer, Material, Vendor };
