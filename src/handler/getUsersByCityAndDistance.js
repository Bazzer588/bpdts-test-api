const getLatLngByCity = require('../geo/getLatLngByCity');
const calcDistanceInMiles = require('../geo/calcDistanceInMiles');
const herokuGetUsers = require('../api/herokuGetUsers');
const herokuGetUsersInCity = require('../api/herokuGetUsersInCity');

// middle layer between request and the remote api calls

function getUsersByCityAndDistance({city, distance = 50, lat, lng}) {

    if (lat === undefined || lng === undefined) {
        const coords = getLatLngByCity(city);
        lat = coords.lat;
        lng = coords.lng;
    }

    const requireAllUsers = lat !== undefined && lng !== undefined;

    return Promise.all([
        herokuGetUsersInCity(city),
        requireAllUsers ? herokuGetUsers() : []
    ])
        .then((values) => {
            return mergeUsers({
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

// merge and filter results
// CAUTION: may block on large result sets

function mergeUsers({cityUsers, allUsers, city, distance, lat, lng}) {
    const userSet = {};

    // only add users within the distance limit
    allUsers.forEach(user => {
        const miles = calcDistanceInMiles(lat, lng, user.latitude, user.longitude);
        if (miles <= distance) {
            user.distanceMiles = Math.floor(miles);
            userSet[user.id] = user;
        }
    });

    // add all users found by the city search
    cityUsers.forEach(user => {
        const miles = calcDistanceInMiles(lat, lng, user.latitude, user.longitude);
        user.distanceCheck = Math.floor(miles);
        user.city = city;
        userSet[user.id] = user;
    });

    // convert userSet to an array
    const users = Object.values(userSet);

    // return a response package
    return {
        info: {
            city,
            distance,
            lat,
            lng,
            matched: users.length
        },
        users
    };
}
