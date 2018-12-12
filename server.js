const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// user
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connection
mongoose.connect(
    'mongodb://kapar:123123Kk@ds151060.mlab.com:51060/amount',
);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected');
});

app.use('/api', require('./auth/authorization.router'));
app.use('/api/posts', require('./routers/post.router'));

app.listen(4000, function () {
    console.log('Example app listening on port 3000!');
});
