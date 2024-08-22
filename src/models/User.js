const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    isAdmin: boolean,
    token: String
})

module.exports = User