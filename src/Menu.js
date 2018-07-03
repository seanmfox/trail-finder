import React, { Component } from 'react';

class Menu extends Component {

updateSearchQuery = (query) => {
  this.props.onUpdateSearchQuery(query)
}

createInfoWindow = (marker, trail, map, e) => {
  e.persist()
  this.props.onInfoWindowUpdate(marker, trail, map, e)
}

  render() {
    const { map, query, trailAndMarkerData } = this.props
    let displayTrails = trailAndMarkerData.filter(trail => (trail.marker.map !== null))

    return (
      <div className="menu">
        <div className="filter-list">
          <input className="trail-search" type="text" aria-label="Trail search box" placeholder="Search for a trail" value={query} onChange={(e) => this.updateSearchQuery(e.target.value)} tabIndex="0"/>
          <ol className="trail-listing">
            {displayTrails.map(trail => (
              <li key={trail.trail.id} name={trail.trail.name} onClick={(e) => this.createInfoWindow(trail.marker, trail.trail, map, e)} onKeyDown={(e) => (e.keyCode === 32 && this.createInfoWindow(trail.marker, trail.trail, map, e))} tabIndex="0">
                { trail.trail.name }
              </li>
            ))}
          </ol>
          {displayTrails.length === 0 && <div className="no-results">No results could be found for your search.</div>}
        </div>
      </div>
    );
  }
}

export default Menu;