const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'dark'
    },
    notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        updates: { type: Boolean, default: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
