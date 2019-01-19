const mongoose = require('mongoose');
const { soldFields } = require('./sold.fields');
const soldModel = mongoose.model('sold', mongoose.Schema(soldFields));

// QUERIES
function createNewPost(data) {
    const newPost = new soldModel(data);

    const promise = new Promise((res, rej) => {
        newPost.save((err, post) => {
            if (err) {
                rej(err);
            } else {
                res(post);
            }
        });
    });

    return promise;
}

function findAll(fields, pagination) {
    const posts = new Promise((res, rej) => {
        soldModel.find(fields, null, pagination, (err, posts) => {
            if (err) {
                rej(err)
            } else {
                res(posts)
            }
        });
    });

    return posts;
}

function removeById(id) {
    const promise = new Promise((res, rej) => {
        soldModel.findOneAndRemove({_id: id}, (err, post) => {
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
        soldModel.updateOne({_id: id}, data, (err, post) => {
            if (err) {
                rej(err);
            } else {
                res(post);
            }
        });
    });

    return promise;
}

function findByField(field) {

    const promise = new Promise((res, rej) => {
        soldModel.findOne(field, (err, user) => {
            if (err) return rej(err);
    
            // if not found send 404
            if (!user) {
                rej(404);
            } else {
                res(user);
            }
        });
    });

    return promise;
}

module.exports = {
    createNewPost,
    findAll,
    removeById,
    updateById,
    findByField
};
