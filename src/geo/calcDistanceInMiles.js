
function calcDistanceInMiles(lat1, lng1, lat2, lng2) {
    const PI = Math.PI;
    return (Math.acos(
        Math.sin(PI * lat1 / 180.0) *
        Math.sin(PI * lat2 / 180.0) +
        Math.cos(PI * lat1 / 180.0) *
        Math.cos(PI * lat2 / 180.0) *
        Math.cos((PI * lng2 / 180.0) - (PI * lng1 / 180.0))
    )) * (6371 / 1.60934);
}

module.exports = calcDistanceInMiles;
