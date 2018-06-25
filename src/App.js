import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './Map';
import Menu from './Menu';


class App extends Component {

  state = {
    map: {},
    trailsMarkers: [],
    infoWindow: new window.google.maps.InfoWindow(),
    query: ''
  }

  createMap = (map) => {
    this.setState({ map })
  }

  trailsMarkersUpdate = (trailsMarkers) => {
    this.setState({ trailsMarkers })
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  infoWindowUpdate = (marker, trail, map) => {
    this.setState((prevState) => ({
      infoWindow: this.populateInfoWindow(marker, trail, map, prevState.infoWindow)
      })
    )}
  populateInfoWindow = (marker, trail, map, window) => {
    window.marker = marker
    window.setContent(`<div>${trail.name}</div>`)
    window.open(map, marker)
    window.addListener('closeclick', () => {
      window.marker = null
    })
    return window
  }

  render() {

    const { map, trailsMarkers, query } = this.state

    return (
      <div className="App">
        <Menu
          trailsMarkers = { trailsMarkers }
          map = { map }
          onInfoWindowUpdate = {(marker, trail, map) => {this.infoWindowUpdate(marker, trail, map)}}
          onUpdateSearchQuery = {(query) => {this.updateQuery(query)}}
          query = {query}
        />
        <Map 
        map = { map }
        trailsMarkers = { trailsMarkers }
        query = {query}
        createMap = {(map) => {this.createMap(map)}}
        onTrailsMarkersUpdate = {(trailsMarkers) => {this.trailsMarkersUpdate(trailsMarkers)}}
        onInfoWindowUpdate = {(marker, trail, map) => {this.infoWindowUpdate(marker, trail, map)}}
        />
      </div>
    );
  }
}

export default App;
