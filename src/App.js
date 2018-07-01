import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Map from './Map';
import Menu from './Menu';

class App extends Component {

  state = {
    map: {},
    infoWindow: new window.google.maps.InfoWindow(),
    query: '',
    trailAndMarkerData: []
  }

  componentDidMount() {
    fetch('https://www.trailrunproject.com/data/get-trails?sort=quality&maxResults=25&lat=40.588971&lon=-79.818435&key=200295258-38f67454a620a172929c18996586ba43')
    .then(response => 
      response.json()
    ).then(data => 
      this.combineData(data.trails)
    ).then(newData => this.setState({ trailAndMarkerData: newData })
    ).catch(error => {console.log('Unable to load Trail Run Project API')})    
  }

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

  createMarker = (trail) => {
    const { map } = this.state
     let marker = new window.google.maps.Marker({
       position: { lat: trail.latitude, lng: trail.longitude },
       map: map,
       animation: window.google.maps.Animation.DROP,
       title: trail.name
    })
    marker.addListener('click', (e) => {
      e.preventDefault()
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
      return {trailAndMarkerData: this.updateMapMarkers(prevState, query)}
    })
  }

  updateMapMarkers = (prevState, query) => {
    let updatedArray = []
    const match = new RegExp(query, 'i')
    prevState.trailAndMarkerData.forEach(trail => {
      if(!match.test(trail.trail.name)) {
        trail.marker.setMap(null)
        updatedArray.push(trail)
      } else if(trail.marker.map !== null){
        updatedArray.push(trail)
      } else {
        trail.marker.setMap(prevState.map)
        updatedArray.push(trail)
      }
    });
    return updatedArray
  }

  infoWindowUpdate = (marker, trail, map) => {
    this.setState((prevState) => ({
      infoWindow: this.populateInfoWindow(marker, trail, map, prevState.infoWindow)
    }))
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    window.setTimeout(()=> {marker.setAnimation(null)}, 3000)
  }

  populateInfoWindow = (marker, trail, map, window) => {
    window.marker = marker
    window.setContent(`<div class="info-window" tabIndex=-1>
                      <h2 class="trail-name" tabIndex=0>${trail.name.substring(0, 30)}</h2>
                      <img src=${trail.imgSqSmall} alt="Image of ${trail.name}">
                      <ol>
                        <li>Trail Difficulty: ${trail.difficulty}</li>
                        <li>Distance: ${trail.length} miles</li>
                        <li>Rating: ${trail.stars} star${trail.stars > 1 ? 's' : ''}</li>
                        <li><a href=${trail.url} target="_blank">More information</a></li>
                      </ol>
                      </div>`)
    window.open(map, marker)
    const windowEl = document.querySelector('.info-window')
    windowEl.focus()
    console.log(document.activeElement)
    window.addListener('closeclick', () => {
      window.marker = null
    })
    return window
  }

  render() {

    const { map, query, trailAndMarkerData } = this.state

    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <Map 
            map = { map }
            createMap = {(map) => {this.createMap(map)}}
          />
          <Menu
            map = { map }
            trailAndMarkerData = { trailAndMarkerData }
            onUpdateSearchQuery = {(query) => {this.updateQuery(query)}}
            onInfoWindowUpdate = {(marker, trail, map) => {this.infoWindowUpdate(marker, trail, map)}}
            query = {query}
          />
        </main>
      </div>
    );
  }
}

export default App;
