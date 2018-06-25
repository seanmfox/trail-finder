import React, { Component } from 'react';
// import InfoWindow from './InfoWindow';

class Marker extends Component {
  
  componentDidMount() {
    fetch('https://www.trailrunproject.com/data/get-trails?sort=quality&maxResults=25&lat=40.588971&lon=-79.818435&key=200295258-38f67454a620a172929c18996586ba43')
    .then(response => 
      response.json()
    ).then(data => 
      this.combineData(data.trails)
    )
  }

  combineData = (trailData) => {
    let trailMarkerArray = trailData.map((trail) => {
      let trailMarkerObject = {}
      let marker = this.createMarker(trail)
      trailMarkerObject.trail = trail
      trailMarkerObject.marker = marker
      return trailMarkerObject
    })
    this.newTrailsMarkers(trailMarkerArray)
    console.log('Component Did Mount Marker')

  }

  createMarker = (trail) => {
    const { map } = this.props
     let marker = new window.google.maps.Marker({
       position: { lat: trail.latitude, lng: trail.longitude },
       map: map,
       title: trail.name
    })
    marker.addListener('click', (e) => {
      this.props.onMarkerInfoWindowUpdate(marker, trail, map)
    })
    return marker
  }

  newTrailsMarkers = (trailMarkerArray) => {
    this.props.onCombinedTrailsMarkersUpdate(trailMarkerArray)
  }

  render() {
    const { trailsMarkers, query, map } = this.props

    console.log(trailsMarkers)
    console.log('Checking what renders marker')

    if(query) {
      const match = new RegExp(query, 'i')
      const searchMarkers = trailsMarkers.filter(trailsMarker => (match.test(trailsMarker.trail.name))).map(trailMarker => (trailMarker.marker.setMap(map)))
      console.log(searchMarkers)
      console.log(match)
    }
    
    return (
      <div>
        {/* {trailsMarkers.map(trailMarker => (
          <InfoWindow
            key = { trailMarker.trail.id }
            map = { this.props }
            trail = { trailMarker.trail }
            marker = {trailMarker.marker}
          />
        ))} */}
      </div>
    );
  }
}

export default Marker;