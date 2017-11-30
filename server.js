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

routes(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res) => res.status(404).send({ url: req.originalUrl + ' not found'}));


app.listen(port);

console.log('User RESTful API server started on: ' + port);