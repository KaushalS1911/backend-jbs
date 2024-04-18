const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    technology: { type: String, required: true },
    experience: { type: String, required: true },
    current_sal: { type: String, required: true },
    expected_sal: { type: String, required: true },
    availability: { type: String, required: true },
    resume_file: String,
    created_at: {
        default: new Date(),
        type: Date
    },
    deleted_at: {
        default: null,
        type: Date
    }
});

module.exports = mongoose.model('Resume', resumeSchema);
