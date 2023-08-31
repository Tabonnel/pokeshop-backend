const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;