import React, { Component } from 'react';
import { getLocation } from './helpers'
const google = window.google

class Map extends Component {

  async componentDidMount() {
    const userLocation = await getLocation()

    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: userLocation.coords.latitude, lng: userLocation.coords.longitude},
      zoom: 10,
      mapTypeControl: false
    });
    this.props.createMap(map)
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