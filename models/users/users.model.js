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

function findAllUsers() {
    return new Promise((res, rej) => {
        userModel.find({}, (err, user) => {
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

function removeById(id) {
    const promise = new Promise((res, rej) => {
        userModel.findOneAndRemove({_id: id}, (err, post) => {
            if (err) {
                rej(err);
            } else {
                res(post)
            }
        });
    });

    return promise;
}

function updateById(id, data) {
    const promise = new Promise((res, rej) => {
        userModel.updateOne({_id: id}, data, (err, post) => {
            if (err) {
                rej(err);
            } else {
                res(post);
            }
        });
    });

    return promise;
}


module.exports = {
    findByField,
    findAllUsers,
    createNewUser,
    removeById,
    updateById
};
