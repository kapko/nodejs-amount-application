const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// user
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connection
mongoose.connect('mongodb://localhost:27017/amount');
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected');
});

app.use('/api', require('./auth/authorization.router'));
app.use('/api/posts', require('./routers/post.router'));

// app.get('/api/posts', auth.verifyToken, (req, res) => {
//     auth.verify(req.token)
//         .then(token => {
//             res.send('ok');
//         })
//         .catch(err => res.sendStatus(err));
// });

// app.post('/api/login', (req, res) => {
//     const name = req.body.name;
//     const password = req.body.password;

//     .findOne({name, password}, (err , user) => {
//         if (!user) return res.sendStatus(401);

//         auth.getToken(user)
//             .then(token => res.send(token))
//             .catch(err => res.send(err));

//     });
// });

app.listen(4000, function () {
    console.log('Example app listening on port 3000!');
});
