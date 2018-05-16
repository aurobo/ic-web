import _ from 'lodash';
import React from 'react';
import { Dimmer, Loader, Table, Button, Input, Segment, List, Grid, Message } from 'semantic-ui-react';
import { Page } from '../../../common';
import Api from '../../../common/Api';
import ControlPanel from '../../../common/ControlPanel';
import GMap from '../../../common/GMap';
import TableWithSorting from '../../../common/TableWithSorting';
import { api } from '../../../common/Utilities';

class ViewLandUnit extends React.Component {
  state = {
    data: {
      latitude: null,
      longitude: null,
    },
    loading: false,
    inEditMode: false,
    minimumWageError: false,
  };
  handleSuccess = data => {
    this.setState({ data: data });
  };
  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleEdit = e => {
    this.setState({ inEditMode: true });
  };

  handleUpdate = e => {
    this.update(this.state.data);
    this.setState({ inEditMode: false });
  };
  handleDelete = e => {
    this.delete(this.state.data);
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let data = { ...this.state.data };
    let minimumWageError = null;

    if (name === 'minimumWage' && value < 200) {
      minimumWageError = true;
    } else {
      minimumWageError = false;
    }

    data[name] = value;

    if (minimumWageError !== null) {
      this.setState({
        data,
        minimumWageError,
      });
    } else {
      this.setState({
        data,
      });
    }
  };
  delete = data => {
    api
      .delete('landunits/' + data.id)
      .then(response => {
        console.log('Delete Executed');
        this.props.history.push('/agriculture/land-units');
      })
      .catch(error => {
        if (error.response && _.isArray(error.response.data)) {
          console.log('error');
        } else {
          console.log('something went wrong');
        }
      });
  };
  update = data => {
    api
      .put('landunits/' + data.id, data)
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

  handleMarkerPositionChanged = e => {
    let latitude = e.latLng.lat();
    let longitude = e.latLng.lng();
    let data = { ...this.state.data };

    this.setState({ loading: true });

    data.latitude = latitude;
    data.longitude = longitude;

    this.update(data);
  };

  render() {
    const { data, inEditMode, minimumWageError } = this.state;
    const { latitude, longitude } = data;
    return (
      <Api url={'/LandUnits/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
        {data !== null ? (
          <React.Fragment>
            <ControlPanel title={'Land-Unit / ' + data.key} className="no-print">
              {inEditMode ? (
                <Button disabled={minimumWageError} size="small" onClick={this.handleUpdate} positive>
                  Update
                </Button>
              ) : (
                <Button size="small" onClick={this.handleEdit}>
                  Edit
                </Button>
              )}
              <Button size="small" onClick={this.handleDelete} negative>
                Delete{console.log('clicked')}
              </Button>
            </ControlPanel>
            <Page>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Segment color={inEditMode ? 'green' : 'grey'}>
                      <List divided relaxed>
                        <List.Item>
                          <List.Content>
                            <List.Header>State</List.Header>
                            {inEditMode ? <Input name="state" value={data.state} onChange={this.handleInputChange} /> : data.state}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>District</List.Header>
                            {inEditMode ? <Input name="district" value={data.district} onChange={this.handleInputChange} /> : data.district}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Work Occupation</List.Header>
                            {inEditMode ? <Input name="workOccupation" value={data.workOccupation} onChange={this.handleInputChange} /> : data.workOccupation}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>LabourCategory</List.Header>
                            {inEditMode ? <Input name="labourCategory" value={data.labourCategory} onChange={this.handleInputChange} /> : data.labourCategory}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Fertilizers</List.Header>
                            {inEditMode ? <Input name="fertilizers" value={data.fertilizers} onChange={this.handleInputChange} /> : data.fertilizers}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Name</List.Header>
                            {inEditMode ? <Input name="name" value={data.name} onChange={this.handleInputChange} /> : data.name}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Area</List.Header>
                            {inEditMode ? <Input name="area" value={data.area} onChange={this.handleInputChange} /> : data.area}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Parent Land Unit</List.Header>
                            {inEditMode ? <Input name="parentLandUnit" value={data.parentLandUnit} onChange={this.handleInputChange} /> : data.parentLandUnit}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Soil Type</List.Header>
                            {inEditMode ? <Input name="soilType" value={data.soilType} onChange={this.handleInputChange} /> : data.soilType}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Minimum Wage</List.Header>
                            {inEditMode ? <Input error={minimumWageError} name="minimumWage" value={data.minimumWage} onChange={this.handleInputChange} /> : data.minimumWage}
                            {minimumWageError ? <Message error header="Out of bounds" content="The value cannot be less than 200." /> : ''}
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment>
                      <List divided relaxed>
                        <List.Item>
                          <List.Content>
                            <List.Header>Key</List.Header>
                            {data.key}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>CreatedBy</List.Header>
                            {data.createdByUserName}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Latitude</List.Header>
                            {this.state.loading ? (
                              <Dimmer active>
                                <Loader />
                              </Dimmer>
                            ) : (
                              data.latitude
                            )}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Longitude</List.Header>
                            {this.state.loading ? (
                              <Dimmer active>
                                <Loader />
                              </Dimmer>
                            ) : (
                              data.longitude
                            )}
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <GMap lati={latitude} long={longitude} id={data.id} onMarkerPositionChanged={this.handleMarkerPositionChanged} />
            </Page>
          </React.Fragment>
        ) : (
          ''
        )}
      </Api>
    );
  }
}
export default ViewLandUnit;
