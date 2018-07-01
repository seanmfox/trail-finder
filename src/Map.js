import React, { Component } from 'react';
const google = window.google

class Map extends Component {

  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.588971, lng: -79.818435},
      zoom: 10,
      mapTypeControl: false
    });
    this.onMapCreate(map)
  }

  onMapCreate = (map) => {
    this.props.createMap(map)
  }

  render() {
    return (
      <div className="map-container">
         <div id="map" role="application" aria-label="Trail locations"></div>
      </div>
    );
  }
}

export default Map;