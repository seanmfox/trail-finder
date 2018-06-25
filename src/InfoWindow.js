import React, { Component } from 'react';

class InfoWindow extends Component {

  createInfoWindow = (marker, trail, map) => {
    let infoWindow = new window.google.maps.InfoWindow()

    marker.addListener('click', (e) => {
      this.populateInfoWindow(marker, infoWindow, trail, map)
    })

  }

  populateInfoWindow = (marker, window, trail, map) => {
    window.marker = marker
    window.setContent(`<div>${trail.name}</div>`)
    window.open(map, marker)
    window.addListener('closeclick', () => {
      window.marker = null
    })
  }

  render() {

    const { marker, trail, map } = this.props
    this.createInfoWindow(marker, trail, map)

    return (
      <div>
        
      </div>
    );
  }
}

export default InfoWindow;