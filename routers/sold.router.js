const express = require('express');
const router = express.Router();
const { verifification, verifyToken } = require('../auth/token');
const {createNewPost, findAll, findByField, removeById, updateById} = require('../models/sold/sold.model');
const url = require('url');

router.get('/', verifyToken, async(req, res) => {
    const {title, sellerId, page} = url.parse(req.url, true).query;
    const pagination = { skip: page * 20 | 0, limit: 20}
    const query = {
        title: new RegExp(title, 'ig'),
    };

    // if (sellerId) {
    //     query.sellerId = new RegExp(sellerId, 'ig');
    // }

    try {
        await verifification(req.token);

        findAll(query, pagination)
            .then(posts => {
                res.json(posts);
            })
            .catch(err => res.sendStatus(500));

    } catch(e) {
        res.sendStatus(401);
    }

});

router.get('/post/:id', verifyToken, async(req, res) => {

    try {
        await verifification(req.token);

        findByField({_id: req.params.id})
            .then(post => {
                res.json(post);
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
                res.json(post);
            })
            .catch(postErr => res.send(postErr));

    } catch(e) {
        res.sendStatus(401);
    }

    
});

router.delete('/delete/:id', verifyToken, async(req, res) => {

    try {
        await verifification(req.token);

        removeById(req.params.id)
            .then(post => {
                res.json(post);
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
                res.json(post);
            })
            .catch(postErr => res.send(postErr));

    } catch(e) {
        res.sendStatus(401);
    }
});

module.exports = router;
