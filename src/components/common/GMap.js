import React from 'react';

function onMarkerPositionChanged(e) {
  var latitude = e.latLng.lat();
  var longitude = e.latLng.lng();
  console.log('Lat=' + latitude);
  console.log('Long=' + longitude);
}
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require('react-google-maps');
const { compose } = require('recompose');
const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker defaultDraggable={true} onDrag={onMarkerPositionChanged} position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));

class GMap extends React.Component {
  render() {
    return (
      <div>
        <h1>Maps</h1>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoJoTSgRNGnh6itXoqzMl6gU0QIeNz27U&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default GMap;
