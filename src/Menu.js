import React, { Component } from 'react';

class Menu extends Component {

  // createInfoWindow = (trailMarker, map) => {
  //   let infoWindow = new window.google.maps.InfoWindow()
  //   this.populateInfoWindow(trailMarker.marker, infoWindow, trailMarker.trail, map)
  // }

  // populateInfoWindow = (marker, window, trail, map) => {
  //   window.marker = marker
  //   window.setContent(`<div>${trail.name}</div>`)
  //   window.open(map, marker)
  //   window.addListener('closeclick', () => {
  //     window.marker = null
  //   })
  // }
updateSearchQuery = (query) => {
  this.props.onUpdateSearchQuery(query)
}


createInfoWindow = (marker, trail, map) => {
  this.props.onInfoWindowUpdate(marker, trail, map)
}

  render() {
    const { trailsMarkers, map, query } = this.props

    console.log('Checking what renders menu')

    return (
      <div className="menu">
        <input type="text" placeholder="Search for a trail" value={query} onChange={(e) => this.updateSearchQuery(e.target.value)}/>
        <ol>
          {trailsMarkers.map(trailMarker => (
            <li key={trailMarker.trail.id} onClick={() => this.createInfoWindow(trailMarker.marker, trailMarker.trail, map)}>
              {/* <InfoWindow             
                map = { map }
                trail = { trailMarker.trail }
                marker = {trailMarker.marker}
              /> */}
              { trailMarker.trail.name }
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Menu;