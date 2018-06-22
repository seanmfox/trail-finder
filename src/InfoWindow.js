import React, { Component } from 'react';

class InfoWindow extends Component {

  createInfoWindow = (marker, trail, map) => {
    let infoWindow = new window.google.maps.InfoWindow()

    marker.addListener('click', () => {
      populateInfoWindow(marker, infoWindow)
    })

    let populateInfoWindow = (marker, window) => {
      window.marker = marker
      window.setContent(`<div>${trail.name}</div>`)
      window.open(map, marker)
      window.addListener('closeclick', () => {
        window.marker = null
      })
    }
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