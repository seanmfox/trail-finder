import React, { Component } from 'react';
import InfoWindow from './InfoWindow';

class Marker extends Component {

  state = {
    trails: []
  }


  componentDidMount() {
    fetch('https://www.trailrunproject.com/data/get-trails?sort=quality&maxResults=5&lat=40.588971&lon=-79.818435&key=200295258-38f67454a620a172929c18996586ba43')
    .then(response => 
      response.json()
    ).then(data => 
      this.setState({ trails: data.trails })
    )
  }

  createMarker = (trail) => {
      const { map } = this.props
      let marker = new window.google.maps.Marker({
        position: { lat: trail.latitude, lng: trail.longitude },
        map: map,
        title: trail.name
      })
      
      return marker

    }

  render() {

    const { trails } = this.state
    let marker;

    return (
      <div>
        {trails.map(trail => (
          marker = this.createMarker(trail),
          <InfoWindow
          key = { trail.id }
          map = { this.props }
          trail = { trail }
          marker = {marker}
          />
        ))}
      </div>
    );
  }
}

export default Marker;