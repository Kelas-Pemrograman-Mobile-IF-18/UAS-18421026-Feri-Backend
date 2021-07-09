const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    kodeKopi: {
        type: String
    },
    jenisKopi: {
        type: String
    },
    hargaKopi: {
        type: String
    },
    gambar: {
        type: String
    }
})

module.exports = mongoose.model('kopi', userSchema)