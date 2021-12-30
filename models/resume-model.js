const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    
    data: {
        type: Object,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;