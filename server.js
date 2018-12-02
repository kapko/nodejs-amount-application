const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// models
const Users = require('./models/users');

mongoose.connect('mongodb://localhost:27017/amount');
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected');
});

db.on('error', err => {
    console.log('DB Error', err);
});

app.get('/users', (req, res) => {

    Users.find({}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.send(users);
        }
    });

});

app.post('/users/add', (req, res) => {
    const newUser = new Users(req.body);

    newUser.save((err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.send(user._id);
        }
    });

});

app.delete('/users/delete/:id', (req, res) => {
    Users.findOneAndRemove({_id: req.params.id}, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user)
        }
    });
});

app.patch('/users/update/:id', (req, res) => {
    Users.updateOne({_id: req.params.id}, req.body, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    });
});

app.get('/list', (req, res) => {
   res.send('this is list');
});

app.listen(4000, function () {
  console.log('Example app listening on port 3000!');
});
