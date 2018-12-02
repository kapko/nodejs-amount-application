const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    role: Number,
    phone: Number,
    email: String
});

module.exports = mongoose.model('users', userSchema);
