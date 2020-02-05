const calcDistanceInMiles = require('../geo/calcDistanceInMiles');
const mergeUsersByCityAndDistance = require('./mergeUsersByCityAndDistance');

jest.mock('../geo/calcDistanceInMiles');

describe('handler/mergeUsersByCityAndDistance', () => {

    // mock this to return a simple longitude difference
    calcDistanceInMiles.mockImplementation((lat1, lng1, lat2, lng2) => {
        return Math.abs(lng1 - lng2);
    });

    const allUsers = [
        {id: 48, longitude: 1},
        {id: 97, longitude: 155},
        {id: 34673, longitude: 3}
    ];

    const cityUsers = [
        {id: 97, longitude: 155}
    ];

    it('merges users within distance of lat/lng', () => {
        return mergeUsersByCityAndDistance({
            cityUsers: [],
            allUsers,
            city: 'Gzod',
            distance: 100,
            lat: 0,
            lng: 5
        })
            .then((result) => {
                console.log(result);
                expect(result).toEqual({
                    info: {city: 'Gzod', distance: 100, lat: 0, lng: 5, matched: 2},
                    users: [
                        {id: 48, longitude: 1, distanceMiles: 4},
                        {id: 34673, longitude: 3, distanceMiles: 2}
                    ]
                });
            });
    });

    it('merges users within distance of lat/lng and city users', () => {
        return mergeUsersByCityAndDistance({
            cityUsers,
            allUsers,
            city: 'Gzod',
            distance: 100,
            lat: 0,
            lng: 5
        })
            .then((result) => {
                console.log(result);
                expect(result).toEqual({
                    info: {city: 'Gzod', distance: 100, lat: 0, lng: 5, matched: 3},
                    users: [
                        {id: 48, longitude: 1, distanceMiles: 4},
                        {id: 97, longitude: 155, distanceCheck: 150, city: 'Gzod'}, // cityUser
                        {id: 34673, longitude: 3, distanceMiles: 2}
                    ]
                });
            });
    });

    it('returns no matching users', () => {
        return mergeUsersByCityAndDistance({
            cityUsers: [],
            allUsers,
            city: 'Narn',
            distance: 10,
            lat: 0,
            lng: 599
        })
            .then((result) => {
                console.log(result);
                expect(result).toEqual({
                    info: {city: 'Narn', distance: 10, lat: 0, lng: 599, matched: 0},
                    users: []
                });
            });
    });

});
