import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopNav from '../../common/TopNav';
import { Dropdown } from 'semantic-ui-react';
import { DropdownLink } from '../../common';
import LandUnitsList from './land-units/List';

class Agriculture extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Agriculture" url={this.props.url} className="no-print" onLogout={this.props.onLogout}>
          <Dropdown item text="Menu" simple>
            <Dropdown.Menu>
              <DropdownLink to="/agriculture/land-units">LandUnits</DropdownLink>
              <DropdownLink to="/agriculture/">Crops</DropdownLink>
              <DropdownLink to="/agriculture">Diseases</DropdownLink>
              <DropdownLink to="/agriculture">Fertilizers</DropdownLink>
              <DropdownLink to="/agriculture">Analysis</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
        </TopNav>
        <Switch>
          <Route path="/agriculture/land-units" component={LandUnitsList} />

          <Redirect to="/agriculture/land-units" />
        </Switch>
      </div>
    );
  }
}
export default Agriculture;
