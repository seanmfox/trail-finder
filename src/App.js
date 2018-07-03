import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Map from './Map';
import Menu from './Menu';
import Footer from './Footer'

class App extends Component {

  state = {
    map: {},
    infoWindow: new window.google.maps.InfoWindow(),
    query: '',
    trailAndMarkerData: []
  }

  componentDidMount() {
    // Call to API for trail data.
    fetch('https://www.trailrunproject.com/data/get-trails?sort=quality&maxResults=25&lat=40.588971&lon=-79.818435&key=200295258-38f67454a620a172929c18996586ba43')
    .then(response => 
      response.json()
    ).then(data => 
      this.combineData(data.trails)
    ).then(newData => this.setState({ trailAndMarkerData: newData })
    ).catch(error => {console.log('Unable to load Trail Run Project API')})    
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
      return {trailAndMarkerData: this.updateMapMarkers(prevState, query)}
    })
  }

  //Creates an array by applying the query against the trail list to only show trails meeting the search criteria.
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

  //Edits the info window so that only one is every in use and created.
  infoWindowUpdate = (marker, trail, map, e) => {
    this.setState((prevState) => ({
      infoWindow: this.populateInfoWindow(marker, trail, map, prevState.infoWindow, e)
    }))
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    window.setTimeout(()=> {marker.setAnimation(null)}, 3000)
  }

  //Adds specific details to the info window relating to its respective trail
  populateInfoWindow = (marker, trail, map, infoWindow, e) => {
    infoWindow.marker = marker
    infoWindow.setContent(`<div class="info-window" tabIndex=0 aria-label="Info window">
                        <h2 class="trail-name" tabIndex=0>${trail.name.substring(0, 30)}</h2>
                        <img src=${trail.imgSqSmall} alt="Image of ${trail.name}" tabIndex=0>
                        <ol>
                          <li tabIndex=0>Trail Difficulty: ${trail.difficulty}</li>
                          <li tabIndex=0>Distance: ${trail.length} miles</li>
                          <li tabIndex=0>Rating: ${trail.stars} star${trail.stars > 1 ? 's' : ''}</li>
                          <li><a href=${trail.url} target="_blank" tabIndex=0 class="more-info">More information</a></li>
                        </ol>
                      </div>`)
    infoWindow.open(map, marker)
    infoWindow.addListener('closeclick', () => {
      infoWindow.close()
    })
    const infoWindowEl = document.querySelector(".info-window")
    const moreInfo = document.querySelector(".more-info")
    const trailName = document.querySelector(".trail-name")
    const gmStyle = document.querySelector(".gm-style")
    const windowEl = document.querySelector(".gm-style-iw")
    const mapEl = document.querySelector("#map")

    //Enables features for keyboard navigation
    if(e && e.keyCode === 32) {
      infoWindowEl.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          infoWindow.close()
          document.querySelector(".trail-listing li[name='" + trail.name + "']").focus()
        }
      })
      moreInfo.addEventListener('keydown', (e) => {
        if(e.code === 'Tab' && !e.shiftKey) {
          e.preventDefault()
          trailName.focus()
        }
      })
      trailName.addEventListener('keydown', (e) => {
        if(e.code === 'Tab' && e.shiftKey) {
          e.preventDefault()
          moreInfo.focus()
        }
      })
      gmStyle.firstChild.tabIndex=-1
      windowEl.tabIndex = -1
      mapEl.focus()
      window.setTimeout(() => {
        infoWindowEl.focus()
      }, 1000)
    }

    return infoWindow
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
