const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    type: {
        type: String,
        enum: ['pdf', 'video', 'link', 'image'],
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    link: {
        type: String,
        required: [true, 'Please add a link or file path']
    },
    date: {
        type: String, // Storing as formatted string for now to match frontend, or Date object
        required: true
    },
    size: String,
    duration: String,
    domain: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Material', materialSchema);
