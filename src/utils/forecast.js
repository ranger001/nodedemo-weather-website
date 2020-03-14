const request = require('request')


//get the weather for a particular latitude and longitude
const forecast = (latitude, longitude, callback) => {
    const coordString = latitude + ',' + longitude
    const urlValue = 'https://api.darksky.net/forecast/3a9fe2e57fa97228a53228fdadb9cedd/' + coordString + '?units=si'
    //console.log(urlValue)
    //request({ url: urlValue, json: true }, (error, response) => {
    request({ url: urlValue, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service using ' + urlValue + ' error: ' + error, undefined)
        } else if (body.error) {
            callback('unable to find weather for that location' + ' Error:' + body.error, undefined)
        } else {
            //const currentTemp = response.body.currently.temperature
            //const rain = response.body.currently.precipProbability
            const { temperature: currentTemp, precipProbability: rain, summary } = body.currently
            const responseStr = summary + '. It is currently ' + currentTemp + ' degrees out.' + ' There is a ' + rain + ' percent chance of rain'
            callback(undefined, responseStr)
        }
    })

}
module.exports = forecast
