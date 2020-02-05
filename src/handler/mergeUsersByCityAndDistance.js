const calcDistanceInMiles = require('../geo/calcDistanceInMiles');
const asyncForEach = require('../util/asyncForEach');

/** merge together the cityUsers and allUsers that meet the search criteria
 *
 * @param cityUsers - list of users linked to requested city
 * @param allUsers - all users - only users in the requested distance will be added
 * @param city
 * @param distance
 * @param lat
 * @param lng
 * @return {Promise<{users: any[], info: {distance: *, lng: *, city: *, matched: number, lat: *}}>}
 *
 * TODO: if allUsers = [] then we could just return the cityUsers array
 * TODO: if cityUsers = [] then we might as well just construct an array from the users found by distance
 */

async function mergeUsersByCityAndDistance({cityUsers, allUsers, city, distance, lat, lng}) {
    const userSet = {};

    // only add users within the distance limit
    await asyncForEach(allUsers, user => {
        const miles = calcDistanceInMiles(lat, lng, user.latitude, user.longitude);
        if (miles <= distance) {
            // add distance to the user for debug purposes
            user.distanceMiles = Math.floor(miles);
            userSet[user.id] = user;
        }
    });

    // add all users found by the city search - each user will overwrite any existing user in the set
    await asyncForEach(cityUsers, user => {
        // adding the city and distanceCheck to the user for debug purposes - not needed for actual use?
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

module.exports = mergeUsersByCityAndDistance;
