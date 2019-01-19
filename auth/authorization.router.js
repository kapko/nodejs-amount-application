const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const {findByField, createNewUser, findAllUsers } = require('../models/users/users.model');
const { getToken, verifification, verifyToken } = require('./token');

// validation
const fields = ['name', 'role', 'phone'];

router.post('/signup', setValidation(fields), async(req, res) => {
    const errors = validationResult(req);
    const {name, phone} = req.body;

    // validation
    if (!errors.isEmpty()) {
        return res.send({error: errors.array()});
    }

    // check on DB
    try {
        await findByField({name, phone});
        return res.send('User already registered');

    } catch(err) {
        if (err !== 404) {
            return res.send(err);
        }
    }

    // create new user
    createNewUser(req.body)
        .then(user => {
            res.send(user);
        })
        .catch(err => res.send(err));

});

function setValidation(fields) {
    const validation = [];

    fields.forEach(f => validation.push(check(f).not().isEmpty()));

    return validation;
}

// login
router.post('/login', async(req, res) => {
    const {name, phone} = req.body;

    // check user on DB
    findByField({name, phone})
        .then(async user => {
            // SEND TOKEN
            try {
                const token = await getToken(user);
                res.json({token, user});

            } catch(e) {
                res.send(500);
            }
        })
        .catch(err => {
            res.sendStatus(401);
        });
});

module.exports = router;
