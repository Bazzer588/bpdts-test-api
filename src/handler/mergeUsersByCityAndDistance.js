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
 */

async function mergeUsersByCityAndDistance({cityUsers, allUsers, city, distance, lat, lng}) {
    const userSet = {};

    // only add users within the distance limit
    await asyncForEach(allUsers, user => {
        //allUsers.forEach(user => {
        const miles = calcDistanceInMiles(lat, lng, user.latitude, user.longitude);
        if (miles <= distance) {
            user.distanceMiles = Math.floor(miles);
            userSet[user.id] = user;
        }
    });

    // add all users found by the city search
    await asyncForEach(cityUsers, user => {
        // cityUsers.forEach(user => {
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
