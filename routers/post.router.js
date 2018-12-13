const express = require('express');
const router = express.Router();
const { verifification, verifyToken } = require('../auth/token');
const {createNewPost, findAll, removeById, updateById} = require('../models/post/post.model');

router.get('/', verifyToken, async(req, res) => {

    try {
        await verifification(req.token);

        findAll()
            .then(posts => {
                res.json(posts);
            })
            .catch(err => res.sendStatus(500));

    } catch(e) {
        res.sendStatus(401);
    }

});

router.post('/add', verifyToken, async(req, res) => {

    try {
        await verifification(req.token);

        createNewPost(req.body)
            .then(post => {
                res.send(post);
            })
            .catch(postErr => res.send(postErr));

    } catch(e) {
        res.sendStatus(401);
    }

    
});

router.delete('/delete', verifyToken, async(req, res) => {

    try {
        await verifification(req.token);

        removeById(req.body.id)
            .then(post => {
                res.send(post);
            })
            .catch(postErr => res.send(postErr));

    } catch(e) {
        res.sendStatus(401);
    }

});

router.patch('/update/:id', verifyToken, async(req, res) => {
    try {
        await verifification(req.token);

        updateById(req.params.id, req.body)
            .then(post => {
                res.send(post);
            })
            .catch(postErr => res.send(postErr));

    } catch(e) {
        res.sendStatus(401);
    }
});

module.exports = router;
