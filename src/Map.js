import React, { Component } from 'react';
import Marker from './Marker';
const google = window.google

class Map extends Component {

  onMapCreate = (map) => {
    this.props.createMap(map)
  }

  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      
      center: {lat: 40.588971, lng: -79.818435},
      zoom: 13,
      mapTypeControl: false
    });

    // navigator.geolocation.getCurrentPosition((position) => {

    //   let pos = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   }

    //   map.setCenter(pos)

    // })

    this.onMapCreate(map)

  }

  render() {
    const { map } = this.props

    return (
      <div id="map-content">
        <div id="map"></div>
          <Marker 
            map={ map }
          />
      </div>
    );
  }
}

export default Map;