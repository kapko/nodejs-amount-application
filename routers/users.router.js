const express = require('express');
const router = express.Router();
const { verifification, verifyToken } = require('../auth/token');
const {findAllUsers, createNewUser, removeById, updateById} = require('../models/users/users.model');

router.get('/', verifyToken, async(req, res) => {
    try {
        await verifification(req.token);

        findAllUsers()
            .then(users => {
                res.json(users);
            })
            .catch(err => res.send(err));

    } catch(e) {
        res.sendStatus(401);
    }

});

router.post('/add', verifyToken, async(req, res) => {

    try {
        await verifification(req.token);

        createNewUser(req.body)
            .then(user => res.json(user))
            .catch(err => res.send(err));

    } catch(e) {
        res.sendStatus(401);
    }
    
});

router.delete('/delete/:id', verifyToken, async(req, res) => {

    try {
        await verifification(req.token);

        removeById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.send(err));

    } catch(e) {
        res.sendStatus(401);
    }

});

router.patch('/update/:id', verifyToken, async(req, res) => {
    try {
        await verifification(req.token);

        updateById(req.params.id, req.body)
            .then(user => res.json(user))
            .catch(err => res.send(err));

    } catch(e) {
        res.sendStatus(401);
    }

});

module.exports = router;
