const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a subject title']
    },
    code: {
        type: String,
        required: [true, 'Please add a subject code']
    },
    iconName: {
        type: String,
        default: 'BookOpen'
    },
    color: {
        type: String,
        default: 'bg-blue-500'
    },
    textColor: {
        type: String,
        default: 'text-blue-500'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);
