export const getLocation = () => {
  if ('geolocation' in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  } else {
    return {lat: 40.7128, lon: -74.0060}
  }
}

//Adds specific details to the info window relating to its respective trail
export const populateInfoWindow = (marker, trail, map, infoWindow, e) => {
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

  //Creates an array by applying the query against the trail list to only show trails meeting the search criteria.
  export const updateMapMarkers = (prevState, query) => {
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