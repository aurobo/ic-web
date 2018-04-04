import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopNav from '../../common/TopNav';
import { Dropdown } from 'semantic-ui-react';
import { DropdownLink } from '../../common';
import LandUnitsList from './land-units/List';
import CropsList from './crops/List';
import DiseasesList from './diseases/List';
import FertilizersList from './fertilizers/List';

class Agriculture extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Agriculture" url={this.props.url} className="no-print" onLogout={this.props.onLogout}>
          <Dropdown item text="Menu" simple>
            <Dropdown.Menu>
              <DropdownLink to="/agriculture/land-units">LandUnits</DropdownLink>
              <DropdownLink to="/agriculture/crops">Crops</DropdownLink>
              <DropdownLink to="/agriculture/diseases">Diseases</DropdownLink>
              <DropdownLink to="/agriculture/fertilizers">Fertilizers</DropdownLink>
              <DropdownLink to="/agriculture">Analysis</DropdownLink>
            </Dropdown.Menu>
          </Dropdown>
        </TopNav>
        <Switch>
          <Route path="/agriculture/land-units" component={LandUnitsList} />
          <Route path="/agriculture/crops" component={CropsList} />
          <Route path="/agriculture/diseases" component={DiseasesList} />
          <Route path="/agriculture/fertilizers" component={FertilizersList} />
          <Redirect to="/agriculture/land-units" />
        </Switch>
      </div>
    );
  }
}
export default Agriculture;