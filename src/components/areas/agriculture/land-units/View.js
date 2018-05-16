import React from 'react';
import ControlPanel from '../../../common/ControlPanel';
import TableRow, { Table, Popup, Dimmer, Loader } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import TableWithSorting from '../../../common/TableWithSorting';
import styled from 'styled-components';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import Api from '../../../common/Api';
import TableCell from 'semantic-ui-react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Page, MapButton, StatesMenu, UnionTerritoriesMenu } from '../../../common';
import { api } from '../../../common/Utilities';
import GMap from '../../../common/GMap';

class ViewLandUnit extends React.Component {
  state = {
    data: {
      latitude: null,
      longitude: null,
    },
    loading: false,
  };
  handleSuccess = data => {
    this.setState({ data: data });
  };
  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleMarkerPositionChanged = e => {
    let latitude = e.latLng.lat();
    let longitude = e.latLng.lng();
    let data = { ...this.state.data };

    this.setState({ loading: true });

    data.latitude = latitude;
    data.longitude = longitude;

    api
      .put('landunits/' + data.id, { latitude: latitude, longitude: longitude })
      .then(response => {
        this.setState({ data: data, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        if (error.response && _.isArray(error.response.data)) {
          console.log('error');
        } else {
          console.log('something went wrong');
        }
      });
  };

  render() {
    const { data } = this.state;
    const { latitude, longitude } = data;

    return (
      <Api url={'/LandUnits/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
        {data !== null ? (
          <React.Fragment>
            <ControlPanel title={'Land-Unit / ' + data.key} className="no-print">
              <Page>
                {' '}
                <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.props.handleDataChange}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell field="key" type="text">
                        Key
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Name" type="text">
                        Name
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Area" type="text">
                        Area
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Longitude" type="text">
                        Longitude
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Latitude" type="text">
                        Latitude
                      </Table.HeaderCell>
                      <Table.HeaderCell field="ParentLandUnit" type="date">
                        ParentLandUnit
                      </Table.HeaderCell>
                      <Table.HeaderCell field="SoilType" type="text">
                        SoilType
                      </Table.HeaderCell>
                      <Table.HeaderCell field="MinimumWage" type="text">
                        MiniMumWage
                      </Table.HeaderCell>
                      <Table.HeaderCell field="State" type="text">
                        State
                      </Table.HeaderCell>
                      <Table.HeaderCell field="District" type="text">
                        District
                      </Table.HeaderCell>
                      <Table.HeaderCell field="WorkOccupation" type="text">
                        WorkOccupation
                      </Table.HeaderCell>
                      <Table.HeaderCell field="LabourCategory" type="date">
                        LabourCategory
                      </Table.HeaderCell>
                      <Table.HeaderCell field="NoOfPersons" type="text">
                        NoOfPersons
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Fertilizers" type="text">
                        Fertilizers
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Gender" type="text">
                        Gender
                      </Table.HeaderCell>
                      <Table.HeaderCell field="createdByUserName" type="text">
                        Created By
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row key={data.id}>
                      <Table.Cell>{data.key}</Table.Cell>
                      <Table.Cell>{data.name}</Table.Cell>
                      <Table.Cell>{data.area}</Table.Cell>
                      <Table.Cell>
                        {this.state.loading ? (
                          <Dimmer active>
                            <Loader />
                          </Dimmer>
                        ) : (
                          data.longitude
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {this.state.loading ? (
                          <Dimmer active>
                            <Loader />
                          </Dimmer>
                        ) : (
                          data.latitude
                        )}
                      </Table.Cell>
                      <Table.Cell>{data.parentLandUnit}</Table.Cell>
                      <Table.Cell>{data.soilType}</Table.Cell>
                      <Table.Cell>{data.minimumWage}</Table.Cell>
                      <Table.Cell>{data.state}</Table.Cell>
                      <Table.Cell>{data.district}</Table.Cell>
                      <Table.Cell>{data.workOccupation}</Table.Cell>
                      <Table.Cell>{data.labourCategory}</Table.Cell>
                      <Table.Cell>{data.noOfPersons}</Table.Cell>
                      <Table.Cell>{data.fertilizers}</Table.Cell>
                      <Table.Cell>{data.gender}</Table.Cell>
                      <Table.Cell>{data.createdByUserName}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </TableWithSorting>
                <GMap lati={latitude} long={longitude} id={data.id} onMarkerPositionChanged={this.handleMarkerPositionChanged} />
              </Page>
            </ControlPanel>
          </React.Fragment>
        ) : (
          ''
        )}
      </Api>
    );
  }
}
export default ViewLandUnit;
