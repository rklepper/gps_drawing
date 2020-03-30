'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoicmtsZXBwZXIiLCJhIjoiY2s3Z2ZsYmdhMGQ2ZTNmb2RjbDBuanB4diJ9.sSYh3Y87xtJWWc4xSzyBZA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rklepper/ck8ej0ibk1v0y1ininl8a6e2q',
    center: [-73.96216, 40.80779],
    zoom: 16
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})
map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})
map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event) {

  // create a variable to keep track of the user's current location
  // we're going to initialize it to the default center of the map
  let current_location = [-73.96216, 40.80779]

  // update the variable whenever a geolocation event fires
  geolocate.on('geolocate', function(event) {
      current_location = [event.coords.longitude, event.coords.latitude]
      console.log('geolocated', current_location)
  })

  // for testing purposes, also update the variable whenever you click on the map
  map.on('click', function(event) {
      current_location = [event.lngLat.lng, event.lngLat.lat]
      console.log('clicked', current_location)
  })

})
