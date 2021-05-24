const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    code: {
        type: String,
    },
    create_at: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;