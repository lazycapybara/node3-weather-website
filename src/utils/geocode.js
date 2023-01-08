const request = require('request');


const geocode = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=2ed6c1dcd52a4165b8952419223112&q=' + encodeURIComponent(address) + '&aqi=no&';
    
    request({url: url, json: true}, function (error, {body}) {
      if (error) {
        callback('Unable to connect to geolocation service.', undefined)  
      } else if (body.error) {
        callback('Unable to find coordinates, please try again.', undefined)  
      } else {
        callback(undefined, {
          latitude: body.location.lat,
          longitude: body.location.lon,
          country: body.location.country
        })
      } 
    });
}

module.exports = geocode