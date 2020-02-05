const calcDistanceInMiles = require('./calcDistanceInMiles');
const getLatLngByCity = require('./getLatLngByCity');

describe('geo/calcDistanceInMiles', () => {

    it('calculates distance from London to Budapest', () => {
        const lon = getLatLngByCity('London');
        const bud = getLatLngByCity('Budapest');

        const distance = calcDistanceInMiles(lon.lat, lon.lng, bud.lat, bud.lng);
        expect(Math.floor(distance)).toEqual(901);

        const inverse = calcDistanceInMiles(bud.lat, bud.lng, lon.lat, lon.lng);
        expect(Math.floor(inverse)).toEqual(901);
    });

    it('returns NaN if invalid', () => {
        const distance = calcDistanceInMiles(51.507222, -0.1275, undefined, 2);
        expect(Math.floor(distance)).toEqual(NaN);
    });

    // TODO, more and better tests

});
