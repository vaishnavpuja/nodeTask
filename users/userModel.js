const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        requied: true,
    },
    username: {
        type: String,
        requied: true,
    },
    password: {
        type: String,
        requied: true,
    },
}, {
    timestamps: true
})

User = mongoose.model('User', userSchema);

module.exports = User;