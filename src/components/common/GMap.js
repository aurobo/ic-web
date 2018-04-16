import React from 'react';
import Link from 'react-router-dom/Link';
import _ from 'lodash';
import Api from './Api';
import { api } from './Utilities';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { MapButton } from '.';
var latitude = -34.397;
var longitude = 150.644;
function onMarkerPositionChanged(e) {
  latitude = e.latLng.lat();
  longitude = e.latLng.lng();
  console.log('Lat=' + latitude);
  console.log('Long=' + longitude);
}

const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require('react-google-maps');
const { compose } = require('recompose');
const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker defaultDraggable={true} onDragEnd={onMarkerPositionChanged} position={{ lat: -34.397, lng: 150.644 }} />
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
      </div>
    );
  }
}
export default GMap;
