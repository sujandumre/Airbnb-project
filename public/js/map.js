// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//   container: "map",
//   style: "mapbox://styles/mapbox/streets-v12",
//   center: listingGeom.coordinates,
//   zoom: 1,
//   cooperativeGestures: true,
// });
// const marker1 = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(listingGeom.coordinates)
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 }).setHTML(
//       `<h6>${listing.title}</h6><p><b>${listing.location}, ${listing.country}</b></p><p>Exact location will be provided after booking!</p>`
//     )
//   )
//   .addTo(map);



// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//   container: "map",
//   // style: "mapbox://styles/mapbox/streets-v12",
//   center: listingGeom.coordinates,
//   zoom: 10,
  
// });

// const marker1 = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(listingGeom.coordinates)
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 }).setHTML(
//       `<h6>${listingData.title}</h6>
//        <p><b>${listingData.location}, ${listingData.country}</b></p>
//        <p>Exact location will be provided after booking!</p>`
//     )
//   )
//   .addTo(map);


// mapboxgl.accessToken = mapToken;

// const coords = listingGeom.coordinates;

// const map = new mapboxgl.Map({
//   container: "map",
//   // style: "mapbox://styles/mapbox/streets-v12",
//   center: coords,
//   zoom: 10
// });

// new mapboxgl.Marker({ color: "red" })
//   .setLngLat(coords)
//   .addTo(map);



const coords = listingGeom.coordinates;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: coords[1], lng: coords[0] },
    zoom: 12,
    gestureHandling: 'greedy', // Allows zoom without Ctrl
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true
  });

  const marker = new google.maps.Marker({
    position: { lat: coords[1], lng: coords[0] },
    map: map,
    title: "Location"
  });
}

// Call initMap when page loads
window.onload = initMap;