const request = require('request');

// get all users in a city

function herokuGetUsersInCity(city) {

    if (!city) {
        return Promise.resolve([]);
    }

    const options = {
        url: `https://bpdts-test-app.herokuapp.com/city/${city}/users`,
        headers: {
            'accept': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {

        request(options, (error, response, body) => {
            if (error) {
                console.log('CITY ERROR', error);
                reject({error, body});
            } else {
                resolve(JSON.parse(body));
            }
        });

    });
}

module.exports = herokuGetUsersInCity;
