import React, { Component } from 'react';

class Marker extends Component {

  createMarkers = () => {
    let getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    }

    getPosition().then(position => {
      console.log(position)
    const { map } = this.props
    let marker = new window.google.maps.Marker({
      position: { lat: position.coords.latitude, lng: position.coords.longitude },
      map: map,
      title: 'Welcome home!'
  
  }
)
}
    )
}

  render() {
    return (
      <div>
        {this.createMarkers()}
      </div>
    );
  }
}

export default Marker;