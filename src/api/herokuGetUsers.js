const request = require('request');

// get all users

function herokuGetUsers() {

    const options = {
        url: 'https://bpdts-test-app.herokuapp.com/users',
        headers: {
            'accept': 'application/json'
        }
    };

    return new Promise((resolve,reject) => {

        request(options, (error, response, body) => {
            if (error) {
                console.log('USERS ERROR', error);
                reject({error, body});
            } else {
                resolve(JSON.parse(body));
            }
        });

    });
}

module.exports = herokuGetUsers;
