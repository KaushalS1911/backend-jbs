const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message:{ type: String, required: false },
    created_at: {
        default: new Date(),
        type: Date
    },
    deleted_at: {
        default: null,
        type: Date
    }
 });

module.exports = mongoose.model('User', userSchema);
