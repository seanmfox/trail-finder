import React, { Component } from 'react';
import { getLocation } from './helpers'
const google = window.google

class Map extends Component {

  async componentDidMount() {
    let map = await new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7128, lng: -74.0060},
      zoom: 10,
      mapTypeControl: false
    });
    const userLocation = await getLocation()
    map.setCenter({lat: userLocation.coords.latitude, lng: userLocation.coords.longitude})
    this.props.createMap(map, userLocation.coords)
  }

  render() {
    return (
      <div className="map-container">
         <div id="map" role="application" aria-label="Trail locations" tabIndex="0"></div>
      </div>
    );
  }
}

export default Map;