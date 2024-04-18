const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    courses: { type: String, required: true },
    created_at: {
        default: new Date(),
        type: Date
    },
    deleted_at: {
        default: null,
        type: Date
    }
 });

module.exports = mongoose.model('Inquiry', inquirySchema);