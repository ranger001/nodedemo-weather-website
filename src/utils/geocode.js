const request = require('request')
//get the latitude and longitude for a particular location
const geocode = (address, callback) => {
    const geocodeURL = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFuZ2VyZyIsImEiOiJjazdtYnYwOW8wMTU4M2lxY2g5bnJ1bXlqIn0.BGedJXvR1nUSpCPZIzq8cg&limit=1'
    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find requested location', undefined)
        } else {
            const { center, place_name: locationFound } = body.features[0]
            const latitude = center[1]
            const longitude = center[0]

            //const locationFound = response.body.features[0].place_name
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                locationFound: locationFound
            })
        }
    })
}

module.exports = geocode