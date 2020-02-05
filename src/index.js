const express = require('express');
const compression = require('compression');
const queryRoute = require('./routes/queryRoute');

const PORT = 8990;

const app = express();
app.use(compression());
app.disable('etag');

// define route paths

app.get('/query', queryRoute);

// start listening

app.listen(PORT, () => {
    console.log('Service started on port',PORT,new Date());
});
