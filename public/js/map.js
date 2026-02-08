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



// from cloude

function initMap() {
  console.log("initMap called");
  console.log("Full listingGeom:", listingGeom);
  
  // Check if geometry exists
  if (!listingGeom) {
    console.error("listingGeom is undefined!");
    document.getElementById("map").innerHTML = 
      '<div style="padding: 20px; text-align: center;">No location data available</div>';
    return;
  }

  // Get coordinates
  let coords;
  
  // Handle different geometry formats
  if (listingGeom.coordinates) {
    coords = listingGeom.coordinates;
  } else if (Array.isArray(listingGeom)) {
    coords = listingGeom;
  } else {
    console.error("Invalid geometry format:", listingGeom);
    return;
  }

  console.log("Raw coordinates:", coords);
  console.log("Type of coords:", typeof coords);
  console.log("coords[0]:", coords[0], "coords[1]:", coords[1]);

  // Ensure coordinates are numbers
  const lng = Number(coords[0]);
  const lat = Number(coords[1]);

  console.log("Parsed - Lat:", lat, "Lng:", lng);

  // Validate coordinates
  if (isNaN(lat) || isNaN(lng)) {
    console.error("Invalid coordinates - lat:", lat, "lng:", lng);
    document.getElementById("map").innerHTML = 
      '<div style="padding: 20px; text-align: center;">Invalid location coordinates</div>';
    return;
  }

  // Create map center object
  const center = { lat: lat, lng: lng };
  console.log("Map center:", center);

  // Create map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 12,
    gestureHandling: 'greedy',
    mapTypeId: 'roadmap'
  });

  // Create marker using new advanced markers (fixes deprecation warning)
  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: map,
    position: center,
    title: "Listing Location"
  });

  console.log("Map loaded successfully!");
}

// Error handler
window.gm_authFailure = function() {
  console.error("Google Maps authentication failed!");
};