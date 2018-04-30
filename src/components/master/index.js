import React from 'react';
import { TopNav, DropdownLink, ImportExcel } from '@innovic/components/shared';
import { Dropdown } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Customers from './Customers';
import Materials from './Materials';

class Master extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Master" url={this.props.url} className="no-print" onLogout={this.props.onLogout}>
          <Dropdown item text="Menu" simple>
            <Dropdown.Menu>
              <DropdownLink to="/master/customers">Customers</DropdownLink>
              <DropdownLink to="/master/materials">Materials</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
        </TopNav>
        <Switch>
          <Route path="/master/customers" component={Customers} />
          <Route
            path="/master/materials/import-excel"
            render={() => <ImportExcel uri="/materials/upload" redirectUri="/sales/materials" />}
          />
          <Route path="/master/materials" component={Materials} />
          <Redirect to="/master/materials" />
        </Switch>
      </div>
    );
  }
}

export default Master;
export { Customers, Materials };
