const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=5509666722633c8137c4894eb8a0d926&query=' + encodeURIComponent(longitude) + ',' + + encodeURIComponent(latitude) + '&units=f';

    request({url: weatherURL, json: true}, function (error, {body}) {
    if (error) {
        callback('Unable to connect to weather services.', undefined);
    } else if (body.error) {
        callback('Unable to find location, please try again.', undefined);
    } 
    else {
        callback(undefined, {
            wdesc: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike: body.current.feelslike
        })
    }
    });
}
 
module.exports = forecast