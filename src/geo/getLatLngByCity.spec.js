const getLatLngByCity = require('./getLatLngByCity');

describe('geo/getLatLngByCity', () => {

    it('returns lat & lng for a known city', () => {
        const lon = getLatLngByCity('London');
        expect(lon).toEqual({lat: 51.507222, lng: -0.1275});
    });

    it('returns empty object for an unknown city', () => {
        const unk = getLatLngByCity('No such city');
        expect(unk).toEqual({});
    });

});
