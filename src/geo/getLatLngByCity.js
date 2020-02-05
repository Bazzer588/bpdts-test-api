// lookup lat & lng for a city

function getLatLngByCity(city) {
    return cities[city] || {};
}

const cities = {
    'Budapest': {lat: 47.4925, lng: 19.051389},
    'London': {lat: 51.507222, lng: -0.1275},
    'Doāba': {lat: 33.5068235, lng: 70.6960868}
};

module.exports = getLatLngByCity;
