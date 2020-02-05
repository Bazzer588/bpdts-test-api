const getLatLngByCity = require('../geo/getLatLngByCity');
const herokuGetUsers = require('../api/herokuGetUsers');
const herokuGetUsersInCity = require('../api/herokuGetUsersInCity');
const mergeUsersByCityAndDistance = require('./mergeUsersByCityAndDistance');

// middle layer between request and the remote api calls

function getUsersByCityAndDistance({city, distance = 50, lat, lng}) {

    if (lat === undefined || lng === undefined) {
        const coords = getLatLngByCity(city);
        lat = coords.lat;
        lng = coords.lng;
    }

    const requireAllUsers = (lat !== undefined && lng !== undefined);

    return Promise.all([
        city ? herokuGetUsersInCity(city) : [],
        requireAllUsers ? herokuGetUsers() : []
    ])
        .then((values) => {
            return mergeUsersByCityAndDistance({
                cityUsers: values[0],
                allUsers: values[1],
                city,
                distance,
                lat,
                lng
            });
        })
        .catch((error) => {
            console.log('ERROR CATCH', error);
            return {error: true};
        });

}

module.exports = getUsersByCityAndDistance;
