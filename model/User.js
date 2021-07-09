const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    nama: {
        type: String
    },
    emailuserName: {
        type: String
    },
    noTelp: {
        type: String
    },
    role: {
        type: Number
    },
    password: {
        type: String
    }

})

module.exports = mongoose.model('users', userSchema)