'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoicmtsZXBwZXIiLCJhIjoiY2s3Z2ZsYmdhMGQ2ZTNmb2RjbDBuanB4diJ9.sSYh3Y87xtJWWc4xSzyBZA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rklepper/ck7um1oue57821itje0cwzd1v',
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

    // get the rat-sightings from the layer data
    let features = map.queryRenderedFeatures({ layers: ['rat-sightings'] })
    console.log(features)

    // get the location of the click
    let current_location = [event.coords.longitude, event.coords.latitude]
    console.log("Click location:", current_location)

    // if there aren't any features, don't continue
    if (features.length == 0) return

    // create variables to hold the closest feature found so far
    let closest_distance = Infinity
    let closest_feature = null

    // we're going to check each feature
    for (let feature of features) {

        // calculate the distance using turf
        let distance = turf.distance(turf.point(feature.geometry.coordinates), turf.point(current_location))

        // if the distance is less than the closest distance we've seen so far, update the variables
        if (distance < closest_distance) {
            closest_distance = distance
            closest_feature = feature
        }

    }

    // closest_distance should now be set to the minimum value
    // closest_feature should be set to the feature itself
    console.log("Closest feature:", closest_feature.geometry.coordinates, "(", closest_distance, "m)")

    // additional handler code goes here

    // calculate bearing
    let bearing = turf.bearing(turf.point(current_location), turf.point(closest_feature.geometry.coordinates))
    console.log("Bearing:", bearing)

    // turn the pointer in that direction
    var pointer = document.getElementById('pointer')
    pointer.style.transform = 'rotate(' + bearing + 'deg)'

    map.flyTo({ center: current_location })
})
