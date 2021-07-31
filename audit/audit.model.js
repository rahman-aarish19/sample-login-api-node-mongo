const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    ipAddress: { type: String, required: true },
    loggedInAt: { type: String, required: true },
    loggedOutAt: { type: String, required: true },
    profile: { type: String, required: true, default: 'User' }
});

// schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Audit', schema);