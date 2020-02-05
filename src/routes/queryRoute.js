const getUsersByCityAndDistance = require('../handler/getUsersByCityAndDistance');

//  examples
// /query?city=Budapest
// /query?latitude=-26.94087&longitude=29.24905

function queryRoute(req, res) {
    console.log(req.query);

    getUsersByCityAndDistance(req.query)
        .then((result) => {
            console.log('RESULTS', result.info);

            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Expires', '0');
            res.setHeader('Pragma', 'no-cache');

            res.send({
                datetime: new Date(),
                ...result
            });
        });
}

module.exports = queryRoute;
