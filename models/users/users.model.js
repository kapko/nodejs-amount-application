const mongoose = require('mongoose');
const { userModelField } = require('./users.fields');
const userModel = mongoose.model('users', mongoose.Schema(userModelField));

// QUERIES
function findByField(field) {

    return new Promise((res, rej) => {
        userModel.findOne(field, (err, user) => {
            if (err) return rej(err);

            // if not found send 404
            if (!user) {
                rej(404);
            } else {
                res(user);
            }
        });
    });

}

// data = userSchema
function createNewUser(data) {
    const newUser = new userModel(data);

    const promise = new Promise((res, rej) => {
        newUser.save((err, user) => {
            if (err) {
                rej(err);
            } else {
                res(user);
            }
        });
    });

    return promise;
}

module.exports = {
    findByField,
    createNewUser
};
