import React, { Component } from 'react';

class Menu extends Component {

updateSearchQuery = (query) => {
  this.props.onUpdateSearchQuery(query)
}

createInfoWindow = (marker, trail, map) => {
  this.props.onInfoWindowUpdate(marker, trail, map)
}

  render() {
    const { map, query, trailAndMarkerData } = this.props

    let displayTrails = trailAndMarkerData.filter(trail => (trail.marker.map !== null))

    return (
      <div className="menu">
        <input type="text" placeholder="Search for a trail" value={query} onChange={(e) => this.updateSearchQuery(e.target.value)}/>
        <ol>
          {displayTrails.map(trail => (
            <li key={trail.trail.id} onClick={() => this.createInfoWindow(trail.marker, trail.trail, map)}>
              { trail.trail.name }
            </li>
          ))}
        </ol>
        {displayTrails.length === 0 && <div className="no-results">No results could be found for your search.</div>}
      </div>
    );
  }
}

export default Menu;