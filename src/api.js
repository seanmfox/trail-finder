export async function getTrails(latCoords, lonCoords) {
  return fetch(
    `https://www.trailrunproject.com/data/get-trails?sort=quality&maxResults=25&lat=${latCoords}&lon=${lonCoords}&key=${
      process.env.REACT_APP_DATA_API_KEY
    }`
  )
    .then(response => response.json())
    .catch(error => {
      console.log("Unable to load Trail Run Project API");
    });
}
