const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
app.use(cors())

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

app.listen(process.env.PORT || 4000, function(){
    console.log('PORT  4000');
});
