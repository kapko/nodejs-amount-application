const jwt = require('jsonwebtoken');
const KEY = 'secretKey';

function verifification(token) {
    return new Promise((res, rej) => {
        jwt.verify(token, KEY, (err, authData) => {
            if (err) {
                rej(err);
            } else {
                res('ok');
            }
        });
    });
}

function getToken(user) {
    return new Promise((res, rej) => {
        jwt.sign({user}, KEY, (err, token) => {
            if (err) {
                rej(err)
            } else {
                res(token);
            }
        });
    });
}

// Verify Token
function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;
        next();
    } else {

        res.sendStatus(403);
    }

}

module.exports = {verifification, verifyToken, getToken};
