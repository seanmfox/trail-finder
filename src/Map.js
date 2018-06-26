import React, { Component } from 'react';
const google = window.google

class Map extends Component {

  onMapCreate = (map) => {
    this.props.createMap(map)
  }

  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      
      center: {lat: 40.588971, lng: -79.818435},
      zoom: 10,
      mapTypeControl: false
    });

    this.onMapCreate(map)

  }

  render() {
    return (
         <div id="map"></div>
    );
  }
}

export default Map;