import React, { Component } from 'react';
import Marker from './Marker';
const google = window.google

class Map extends Component {

  onMapCreate = (map) => {
    this.props.createMap(map)
  }

  onNewTrailsMarkersUpdate = (trailsMarkers) => {
    this.props.onTrailsMarkersUpdate(trailsMarkers)
  }

  onSingleInfoWindowUpdate = (marker, trail, map) => {
    this.props.onInfoWindowUpdate(marker, trail, map)
  }

  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      
      center: {lat: 40.588971, lng: -79.818435},
      zoom: 10,
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
    const { map, trailsMarkers, query } = this.props
    console.log('Checking what renders map')

    return (
         <div id="map">          
          <Marker 
            map={ map }
            trailsMarkers = { trailsMarkers }
            query = {query}
            onCombinedTrailsMarkersUpdate = {(trailsMarkers) => { this.onNewTrailsMarkersUpdate(trailsMarkers) }}
            onMarkerInfoWindowUpdate = {(marker, trail, map) => { this.onSingleInfoWindowUpdate(marker, trail, map)}}
          />
        </div>
    );
  }
}

export default Map;