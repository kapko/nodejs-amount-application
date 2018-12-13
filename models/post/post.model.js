const mongoose = require('mongoose');
const { postModelFields } = require('./post.fields');
const postModel = mongoose.model('posts', mongoose.Schema(postModelFields));

// QUERIES
function createNewPost(data) {
    const newPost = new postModel(data);

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

function findAll() {
    const posts = new Promise((res, rej) => {
        postModel.find({}, (err, posts) => {
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
        postModel.findOneAndRemove({_id: id}, (err, post) => {
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
        postModel.updateOne({_id: id}, data, (err, post) => {
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
        postModel.findOne(field, (err, user) => {
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
