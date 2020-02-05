
function getLatLngByCity(city) {
    if (city === 'Budapest') return {lat: 47.4925, lng: 19.051389};
    if (city === 'London') return {lat: 51.507222, lng: -0.1275}; // London
    return {};
}

module.exports = getLatLngByCity;
