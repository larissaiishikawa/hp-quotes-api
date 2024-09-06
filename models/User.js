const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    token: String,
    access: {type: Number, default: 0}
})

module.exports = User