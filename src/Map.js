import React, { Component } from 'react';
import Marker from './Marker';
const google = window.google

class Map extends Component {

  onMapCreate = (map) => {
    this.props.createMap(map)
  }

  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      
      center: {lat: 41.0082, lng: 28.9784},
      zoom: 13,
      mapTypeControl: false
    });

    console.log(map)

    navigator.geolocation.getCurrentPosition((position) => {

      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      map.setCenter(pos)

    })

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