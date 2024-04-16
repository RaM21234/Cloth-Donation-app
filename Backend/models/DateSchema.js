const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    preferredDates: [Date],
});

module.exports = mongoose.model('User', userSchema);

