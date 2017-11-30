const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes/userRoutes');

// Mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Userdb', { useMongoClient: true });

//Set CORS header and intercept "OPTIONS" preflight call from AngularJS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === "OPTIONS")
        res.sendStatus(200);
    else
        next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain)
routes(app);
app.use((req, res) => res.status(404).send({ url: req.originalUrl + ' not found'}));


app.listen(port);

console.log('User RESTful API server started on: ' + port);