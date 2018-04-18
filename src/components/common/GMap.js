import React from 'react';
import Link from 'react-router-dom/Link';
import _ from 'lodash';
import Api from './Api';
import { api } from './Utilities';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { MapButton } from '.';
import { withRouter } from 'react-router-dom';

var latitude = 23.130024774310773;
var longitude = 72.54235429191613;
function onMarkerPositionChanged(e) {
  latitude = e.latLng.lat();
  longitude = e.latLng.lng();
  console.log('Lat=' + latitude);
  console.log('Long=' + longitude);
}

const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require('react-google-maps');
const { compose } = require('recompose');
const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: latitude, lng: longitude }}>
    <Marker defaultDraggable={true} onDragEnd={onMarkerPositionChanged} position={{ lat: latitude, lng: longitude }} />
  </GoogleMap>
));

class GMap extends React.Component {
  updateLatLng = data => {
    let coordinates = { latitude: latitude, longitude: longitude };

    api
      .put('landunits/' + this.props.id, coordinates)
      .then(response => {
        console.log('Executed');
      })
      .catch(error => {
        if (error.response && _.isArray(error.response.data)) {
          console.log('error');
        } else {
          console.log('something went wrong');
        }
      });
  };
  deleteLandUnit = data => {
    api
      .delete('landunits/' + this.props.id)
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

  render() {
    console.log(this.props.id);
    return (
      <div>
        <h1>Maps</h1>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoJoTSgRNGnh6itXoqzMl6gU0QIeNz27U&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <MapButton onClick={this.updateLatLng}>Submit</MapButton>
        <MapButton onClick={this.deleteLandUnit}>Delete</MapButton>
        <MapButton onClick={this.changePage}>Change</MapButton>
      </div>
    );
  }
}
export default withRouter(GMap);
