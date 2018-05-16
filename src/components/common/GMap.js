import React from 'react';
import Link from 'react-router-dom/Link';
import _ from 'lodash';
import Api from './Api';
import { api } from './Utilities';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { MapButton } from '.';
import { withRouter } from 'react-router-dom';
/* eslint-disable no-undef */

const { compose, withProps, lifecycle } = require('recompose');
const { DrawingManager } = require('react-google-maps/lib/components/drawing/DrawingManager');
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require('react-google-maps');

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{
      lat: parseFloat(props.coordinates.lati),
      lng: parseFloat(props.coordinates.long),
    }}
  >
    <DrawingManager
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        circleOptions: {
          fillOpacity: 0,
          strokeWeight: 2,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
        polygonOptions: {
          editable: true,
          draggable: true,
        },
        polylineOptions: {
          editable: true,
          draggable: true,
        },
        rectangleOptions: {
          editable: true,
          draggable: true,
        },
        markerOptions: {
          draggable: true,
        },
      }}
    />{' '}
    <Marker
      defaultDraggable={true}
      onDragEnd={props.onMarkerPositionChanged}
      position={{
        lat: parseFloat(props.coordinates.lati),
        lng: parseFloat(props.coordinates.long),
      }}
    />{' '}
  </GoogleMap>
));

class GMap extends React.Component {
  state = {
    latitude: null,
    longitude: null,
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
    return (
      <div>
        <h1> Maps </h1>{' '}
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoJoTSgRNGnh6itXoqzMl6gU0QIeNz27U&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={
            <div
              style={{
                height: `100%`,
              }}
            />
          }
          containerElement={
            <div
              style={{
                height: `400px`,
              }}
            />
          }
          mapElement={
            <div
              style={{
                height: `100%`,
              }}
            />
          }
          onMarkerPositionChanged={this.props.onMarkerPositionChanged}
          coordinates={{
            lati: this.props.lati,
            long: this.props.long,
          }}
        />{' '}
        <MapButton onClick={this.updateLatLng}> Submit </MapButton> <MapButton onClick={this.deleteLandUnit}> Delete </MapButton> <MapButton onClick={this.changePage}> Change </MapButton>{' '}
      </div>
    );
  }
}
export default withRouter(GMap);
