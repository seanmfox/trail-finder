import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Map from './Map';
import Menu from './Menu';
import Footer from './Footer'
import { getLocation, populateInfoWindow, updateMapMarkers } from './helpers'
import { getTrails } from './api'

class App extends Component {

  state = {
    map: {},
    infoWindow: new window.google.maps.InfoWindow(),
    query: '',
    trailAndMarkerData: [],
  }

  async componentDidMount() {
    
    //Determine user location
    const userLocation = await getLocation()
    // Call to API for trail data.
    this.getData(userLocation.coords.latitude, userLocation.coords.longitude)
  }

  getData = async (latCoords, lonCoords) => {
    const res = await getTrails(latCoords, lonCoords)
    const combinedData = this.combineData(res.trails)
    this.setState({ trailAndMarkerData: combinedData})
  }

  //Creates one object containing both the trail data and the corresponding marker.
  combineData = (trailData) => {
    let trailMarkerArray = trailData.map((trail) => {
      let trailMarkerObject = {}
      let marker = this.createMarker(trail)
      trailMarkerObject.trail = trail
      trailMarkerObject.marker = marker
      return trailMarkerObject
    })
    return trailMarkerArray
  }

  //Creates a marker for each trail and adds it to the array so that the marker can be tracked and edited, per the Google Maps API.
  createMarker = (trail) => {
    const { map } = this.state
     let marker = new window.google.maps.Marker({
       position: { lat: trail.latitude, lng: trail.longitude },
       map: map,
       animation: window.google.maps.Animation.DROP,
       title: trail.name
    })
    marker.addListener('click', (e) => {
      this.infoWindowUpdate(marker, trail, map)
    })
    return marker
  }

  createMap = (map) => {
    this.setState({ map })
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.refinedTrails(query)
  }

  refinedTrails = (query) => {
    this.setState((prevState) => {
      return {trailAndMarkerData: updateMapMarkers(prevState, query)}
    })
  }

  //Edits the info window so that only one is every in use and created.
  infoWindowUpdate = (marker, trail, map, e) => {
    this.setState((prevState) => ({
      infoWindow: populateInfoWindow(marker, trail, map, prevState.infoWindow, e)
    }))
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    window.setTimeout(()=> {marker.setAnimation(null)}, 3000)
  }

  render() {
    const { map, query, trailAndMarkerData, long, lat } = this.state

    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <Map 
            map = { map }
            createMap = {(map) => {this.createMap(map)}}
            long = { long }
            lat = { lat }
          />
          <Menu
            map = { map }
            trailAndMarkerData = { trailAndMarkerData }
            query = {query}
            onUpdateSearchQuery = {(query) => {this.updateQuery(query)}}
            onInfoWindowUpdate = {(marker, trail, map, e) => {this.infoWindowUpdate(marker, trail, map, e)}}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
